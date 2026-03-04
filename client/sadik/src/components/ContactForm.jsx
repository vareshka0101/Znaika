import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import styles from "./ContactForm.module.css";

const ContactForm = ({ title = "Как записать ребенка на занятия?" }) => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Форма отправлена! Мы свяжемся с вами в ближайшее время.");
        setFormData({ phone: "", name: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <div className={styles.contactForm} data-aos="zoom-in">
      <h2 className={`display-5 text-center mb-4 ${styles.formTitle}`}>
        {title}
      </h2>
      <p className="text-center fs-5 mb-4">
        <FaPhoneAlt className="me-2 text-primary" />
        <strong>+7 (495) 666-33-99</strong> или заполните форму ниже
      </p>
      <p className="text-center text-muted mb-4">
        Приглашаем вас на занятия для детей в возрасте от 3 до 6 лет. Мы поможем
        вам с подготовкой к школе и развитием личности.
      </p>

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Контактный телефон"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col xs={12}>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              placeholder="Ваше сообщение"
              value={formData.message}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} className="text-center">
            <Button variant="primary" type="submit" className="px-5 py-3">
              ОТПРАВИТЬ
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactForm;
