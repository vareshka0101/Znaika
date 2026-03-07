// client/sadik/src/components/ContactForm.jsx
import React, { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { FaPhoneAlt, FaExclamationCircle } from "react-icons/fa";
import styles from "./ContactForm.module.css";

const ContactForm = ({ title = "Как записать ребенка на занятия?" }) => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Функция для валидации имени (только буквы, пробелы и дефисы)
  const validateName = (name) => {
    if (!name.trim()) {
      return "Имя обязательно для заполнения";
    }
    // Разрешаем только русские/английские буквы, пробелы и дефисы
    // Исправлено: убраны лишние экранирования
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

  // Функция для валидации телефона
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return "Телефон обязателен для заполнения";
    }
    // Убираем все пробелы, дефисы и скобки для проверки
    const cleanedPhone = phone.replace(/[\s\-()]/g, "");
    // Проверяем форматы: +79991234567, 89991234567
    // Исправлено: убраны лишние экранирования
    if (!/^(\+7|8)?\d{10}$/.test(cleanedPhone)) {
      return "Введите корректный номер телефона (например: +7 (999) 123-45-67)";
    }
    return "";
  };

  // Функция для валидации сообщения
  const validateMessage = (message) => {
    if (message && message.length > 500) {
      return "Сообщение не может быть длиннее 500 символов";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Для поля имени фильтруем ввод на лету
    let processedValue = value;
    if (name === "name") {
      // Удаляем цифры и спецсимволы, оставляем только буквы, пробелы и дефисы
      // Исправлено: убраны лишние экранирования
      processedValue = value.replace(/[^а-яА-ЯёЁa-zA-Z\s-]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }

    const error = validateField(name, processedValue);
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

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "phone":
        return validatePhone(value);
      case "message":
        return validateMessage(value);
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      message: true,
    });

    if (!validateForm()) {
      const firstError = Object.values(errors).find((error) => error !== "");
      if (firstError) {
        setSubmitStatus({
          type: "danger",
          message: `Пожалуйста, исправьте ошибку: ${firstError}`,
        });
      }
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
          message: "Форма отправлена! Мы свяжемся с вами в ближайшее время.",
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
          message: data.message || "Не удалось отправить форму",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "danger",
        message: "Ошибка соединения с сервером",
      });
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

      {submitStatus.message && (
        <Alert
          variant={submitStatus.type}
          className="mb-4 text-center"
          onClose={() => setSubmitStatus({ type: "", message: "" })}
          dismissible
        >
          <FaExclamationCircle className="me-2" />
          {submitStatus.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ваше имя *"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
                className="rounded-pill"
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
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
                className="rounded-pill"
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
                placeholder="Ваше сообщение (не обязательно)"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                isInvalid={touched.message && !!errors.message}
                className="rounded-4"
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

          <Col xs={12} className="text-center">
            <Button
              variant="primary"
              type="submit"
              className="px-5 py-3 rounded-pill"
            >
              ОТПРАВИТЬ
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactForm;
