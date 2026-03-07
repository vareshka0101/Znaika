import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from "./SimpleContactForm.module.css";

const SimpleContactForm = () => {
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
      const response = await fetch("http://localhost:8000/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
        setFormData({ phone: "", name: "", message: "" });
      } else {
        alert("Ошибка: " + (data.message || "Не удалось отправить заявку"));
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <Form className={styles.contactForm} onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={6}>
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Контактный телефон"
            className="rounded-pill"
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
            className="rounded-pill"
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
            className="rounded-4"
            value={formData.message}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12}>
          <Button
            variant="primary"
            type="submit"
            className="px-5 py-2 rounded-pill"
          >
            ОТПРАВИТЬ
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SimpleContactForm;
