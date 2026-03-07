// client/sadik/src/components/SimpleContactForm.jsx
import React, { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "./SimpleContactForm.module.css";

const SimpleContactForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const validateName = (name) => {
    if (!name.trim()) {
      return "Имя обязательно для заполнения";
    }
    if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name)) {
      return "Имя может содержать только буквы, пробелы и дефисы";
    }
    if (name.trim().length < 2) {
      return "Имя должно содержать минимум 2 символа";
    }
    if (name.trim().length > 50) {
      return "Имя не может быть длиннее 50 символов";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return "Телефон обязателен для заполнения";
    }
    const cleanedPhone = phone.replace(/[\s\-()]/g, "");
    if (!/^(\+7|8)?\d{10}$/.test(cleanedPhone)) {
      return "Введите корректный номер телефона (например: +7 (999) 123-45-67)";
    }
    return "";
  };

  const validateMessage = (message) => {
    if (message && message.length > 500) {
      return "Сообщение не может быть длиннее 500 символов";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === "name") {
      processedValue = value.replace(/[^а-яА-ЯёЁa-zA-Z\s-]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }

    let error = "";
    if (name === "name") error = validateName(processedValue);
    if (name === "phone") error = validatePhone(processedValue);
    if (name === "message") error = validateMessage(processedValue);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "phone") error = validatePhone(value);
    if (name === "message") error = validateMessage(value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    const messageError = validateMessage(formData.message);

    setErrors({
      name: nameError,
      phone: phoneError,
      message: messageError,
    });

    return !nameError && !phoneError && !messageError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

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
        setSubmitStatus({
          type: "success",
          message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
        });
        setFormData({ phone: "", name: "", message: "" });
        setErrors({});
        setTouched({});

        setTimeout(() => {
          setSubmitStatus({ type: "", message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "danger",
          message: data.message || "Ошибка при отправке",
        });
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setSubmitStatus({
        type: "danger",
        message: "Ошибка соединения с сервером",
      });
    }
  };

  return (
    <Form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      {submitStatus.message && (
        <Alert
          variant={submitStatus.type}
          className="mb-4 text-center"
          onClose={() => setSubmitStatus({ type: "", message: "" })}
          dismissible
        >
          {submitStatus.message}
        </Alert>
      )}

      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ваше имя *"
              className="rounded-pill"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              isInvalid={touched.name && !!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Контактный телефон *"
              className="rounded-pill"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              isInvalid={touched.phone && !!errors.phone}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              placeholder="Ваше сообщение"
              className="rounded-4"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              isInvalid={touched.message && !!errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
            {formData.message && (
              <Form.Text className="text-muted float-end">
                {formData.message.length}/500 символов
              </Form.Text>
            )}
          </Form.Group>
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
