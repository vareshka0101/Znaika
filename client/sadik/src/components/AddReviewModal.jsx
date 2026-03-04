import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import styles from "./AddReviewModal.module.css";

const AddReviewModal = ({ show, onHide, onAddReview }) => {
  const [reviewData, setReviewData] = useState({
    author: "",
    childName: "",
    yearsInGarden: "",
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
    if (!reviewData.text.trim()) {
      newErrors.text = "Напишите отзыв";
    }
    if (!reviewData.yearsInGarden.trim()) {
      newErrors.yearsInGarden = "Укажите сколько лет в саду";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onAddReview({
        ...reviewData,
        id: Date.now(),
        date: new Date().toISOString(),
      });
      onHide();

      setReviewData({
        author: "",
        childName: "",
        yearsInGarden: "",
        text: "",
        rating: 5,
      });
    } else {
      setErrors(newErrors);
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
                <Form.Label>Сколько лет в саду? *</Form.Label>
                <Form.Control
                  type="text"
                  name="yearsInGarden"
                  value={reviewData.yearsInGarden}
                  onChange={handleChange}
                  placeholder="1 год, 2 года и т.д."
                  isInvalid={!!errors.yearsInGarden}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.yearsInGarden}
                </Form.Control.Feedback>
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
                  label="Я согласен на публикацию отзыва на сайте"
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
