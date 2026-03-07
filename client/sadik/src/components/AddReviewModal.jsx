import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import styles from "./AddReviewModal.module.css";

const AddReviewModal = ({ show, onHide, onAddReview }) => {
  const [reviewData, setReviewData] = useState({
    author: "",
    parentType: "",
    childName: "",
    text: "",
    rating: 5,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRatingChange = (rating) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!reviewData.author.trim()) {
      newErrors.author = "Введите ваше имя";
    }
    if (!reviewData.parentType) {
      newErrors.parentType = "Выберите, кем вы приходитесь ребенку";
    }
    if (!reviewData.text.trim()) {
      newErrors.text = "Напишите отзыв";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Пожалуйста, войдите в систему, чтобы оставить отзыв");
      return;
    }

    try {
      const fullAuthor = reviewData.parentType
        ? `${reviewData.author}, ${reviewData.parentType}`
        : reviewData.author;

      const reviewToSend = {
        author: fullAuthor,
        child_name: reviewData.childName,
        text: reviewData.text,
        rating: reviewData.rating,
        date: new Date().toISOString().split("T")[0],
      };

      console.log("Отправка отзыва:", reviewToSend);

      const response = await fetch("http://localhost:8000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewToSend),
      });

      const data = await response.json();
      console.log("Ответ сервера:", data);

      if (response.ok) {
        onAddReview({
          id: Date.now(),
          text: reviewData.text,
          author: fullAuthor,
          rating: reviewData.rating,
          childName: reviewData.childName,
          parentType: reviewData.parentType,
          date: new Date().toISOString(),
        });

        setReviewData({
          author: "",
          parentType: "",
          childName: "",
          text: "",
          rating: 5,
        });
        setErrors({});

        onHide();
      } else {
        const errorMessage = data.errors
          ? Object.values(data.errors).flat().join("\n")
          : data.message || "Не удалось отправить отзыв";
        alert("Ошибка:\n" + errorMessage);
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert(
        "Ошибка соединения с сервером. Проверьте, запущен ли Laravel (php artisan serve)",
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title as="h4">
          <FaStar className="text-warning me-2" />
          Оставить отзыв
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Ваше имя *</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={reviewData.author}
                  onChange={handleChange}
                  placeholder="Иванова Анна"
                  isInvalid={!!errors.author}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Вы *</Form.Label>
                <Form.Select
                  name="parentType"
                  value={reviewData.parentType}
                  onChange={handleChange}
                  isInvalid={!!errors.parentType}
                >
                  <option value="">Выберите</option>
                  <option value="мама">Мама</option>
                  <option value="папа">Папа</option>
                  <option value="бабушка">Бабушка</option>
                  <option value="дедушка">Дедушка</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.parentType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Имя ребенка</Form.Label>
                <Form.Control
                  type="text"
                  name="childName"
                  value={reviewData.childName}
                  onChange={handleChange}
                  placeholder="Петров Миша"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Оценка</Form.Label>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`${styles.star} ${
                        star <= reviewData.rating ? styles.starFilled : ""
                      }`}
                      onClick={() => handleRatingChange(star)}
                      size={24}
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Ваш отзыв *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="text"
                  rows={4}
                  value={reviewData.text}
                  onChange={handleChange}
                  placeholder="Расскажите о вашем опыте..."
                  isInvalid={!!errors.text}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.text}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Я согласен на обработку персональных данных"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} className="rounded-pill">
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className="rounded-pill px-4"
        >
          Опубликовать отзыв
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReviewModal;
