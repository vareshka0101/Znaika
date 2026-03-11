import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import styles from "./AddReviewModal.module.css";

const AddReviewModal = ({ show, onHide, onAddReview }) => {
  const [formData, setFormData] = useState({
    author: "",
    parentType: "мама", // "мама" или "папа"
    childName: "",
    text: "",
    rating: 5,
  });

  const [errors, setErrors] = useState({
    author: "",
    childName: "",
    text: "",
  });

  const [touched, setTouched] = useState({
    author: false,
    childName: false,
    text: false,
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "author":
        if (!value.trim()) {
          error = "Введите ваше имя";
        } else if (value.trim().length < 2) {
          error = "Имя должно содержать минимум 2 символа";
        } else if (value.trim().length > 50) {
          error = "Имя не должно превышать 50 символов";
        } else if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(value.trim())) {
          error = "Имя может содержать только буквы, пробелы и дефисы";
        }
        break;
      case "childName":
        if (!value.trim()) {
          error = "Введите имя ребенка";
        } else if (value.trim().length < 2) {
          error = "Имя должно содержать минимум 2 символа";
        } else if (value.trim().length > 50) {
          error = "Имя не должно превышать 50 символов";
        } else if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(value.trim())) {
          error = "Имя может содержать только буквы, пробелы и дефисы";
        }
        break;
      case "text":
        if (!value.trim()) {
          error = "Введите текст отзыва";
        } else if (value.trim().length < 10) {
          error = "Отзыв должен содержать минимум 10 символов";
        } else if (value.trim().length > 500) {
          error = "Отзыв не должен превышать 500 символов";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const validateForm = () => {
    const newErrors = {};

    const authorError = validateField("author", formData.author);
    if (authorError) newErrors.author = authorError;

    const childNameError = validateField("childName", formData.childName);
    if (childNameError) newErrors.childName = childNameError;

    const textError = validateField("text", formData.text);
    if (textError) newErrors.text = textError;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Помечаем все поля как touched
    setTouched({
      author: true,
      childName: true,
      text: true,
    });

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitError(Object.values(newErrors)[0]);
      return;
    }

    setLoading(true);
    try {
      // Формируем полное имя автора с указанием родителя
      const fullAuthorName = `${formData.author}, ${formData.parentType} ${formData.childName}`;

      await onAddReview({
        ...formData,
        author: fullAuthorName,
      });

      // Сбрасываем форму
      setFormData({
        author: "",
        parentType: "мама",
        childName: "",
        text: "",
        rating: 5,
      });
      setErrors({ author: "", childName: "", text: "" });
      setTouched({ author: false, childName: false, text: false });
      setSubmitError("");

      // Закрываем модальное окно после успешной отправки
      onHide();
    } catch (error) {
      setSubmitError("Ошибка при отправке отзыва");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      author: "",
      parentType: "мама",
      childName: "",
      text: "",
      rating: 5,
    });
    setErrors({ author: "", childName: "", text: "" });
    setTouched({ author: false, childName: false, text: false });
    setSubmitError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title as="h3" className={styles.modalTitle}>
          <FaStar className="me-2" style={{ color: "#ffd700" }} /> Оставить
          отзыв
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitError && (
          <Alert
            variant="danger"
            onClose={() => setSubmitError("")}
            dismissible
            className="mb-4"
          >
            {submitError}
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Ваше имя *</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.author && !!errors.author}
              disabled={loading}
              placeholder="Введите ваше имя"
            />
            <Form.Control.Feedback type="invalid">
              {errors.author}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Вы *</Form.Label>
            <div className={styles.parentTypeContainer}>
              <Form.Check
                inline
                type="radio"
                label="мама"
                name="parentType"
                value="мама"
                checked={formData.parentType === "мама"}
                onChange={handleChange}
                disabled={loading}
                className={styles.parentTypeRadio}
              />
              <Form.Check
                inline
                type="radio"
                label="папа"
                name="parentType"
                value="папа"
                checked={formData.parentType === "папа"}
                onChange={handleChange}
                disabled={loading}
                className={styles.parentTypeRadio}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Имя ребенка *</Form.Label>
            <Form.Control
              type="text"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.childName && !!errors.childName}
              disabled={loading}
              placeholder="Введите имя ребенка"
            />
            <Form.Control.Feedback type="invalid">
              {errors.childName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Оценка *</Form.Label>
            <div className={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <FaStar
                  key={rating}
                  className={`${styles.star} ${
                    rating <= (hoveredRating || formData.rating)
                      ? styles.starFilled
                      : styles.starEmpty
                  }`}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRatingClick(rating)}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ваш отзыв *</Form.Label>
            <Form.Control
              as="textarea"
              name="text"
              rows={4}
              value={formData.text}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.text && !!errors.text}
              disabled={loading}
              placeholder="Напишите ваш отзыв..."
            />
            <Form.Control.Feedback type="invalid">
              {errors.text}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {formData.text.length}/500 символов
            </Form.Text>
          </Form.Group>

          <div className="text-center mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-5 py-2"
              style={{ borderRadius: "40px" }}
              disabled={loading}
            >
              {loading ? "Отправка..." : "Отправить отзыв"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddReviewModal;
