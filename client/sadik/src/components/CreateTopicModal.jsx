import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { api } from "../services/api";
import styles from "./CreateTopicModal.module.css";

const CreateTopicModal = ({ show, onHide, onTopicCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.title.trim()) {
      setError("Введите заголовок темы");
      setLoading(false);
      return;
    }
    if (!formData.content.trim()) {
      setError("Введите сообщение");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending topic data:", formData);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Вы не авторизованы. Пожалуйста, войдите в систему.");
        setLoading(false);
        return;
      }

      const response = await api.createForumTopic(formData);
      console.log("Topic created successfully:", response);

      const newTopic = response.data || response;
      onTopicCreated(newTopic);

      onHide();
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error("Full error object:", err);

      if (err.message.includes("Сервер недоступен")) {
        setError(
          "Сервер недоступен. Убедитесь, что сервер Laravel запущен (php artisan serve)",
        );
      } else if (err.status === 401) {
        setError("Сессия истекла. Пожалуйста, войдите в систему снова.");

        localStorage.removeItem("token");
      } else if (err.status === 403) {
        setError(
          "Доступ запрещен. Требуется секретный код родительского клуба.",
        );
      } else if (err.data && err.data.message) {
        setError(err.data.message);
      } else {
        setError(err.message || "Ошибка при создании темы");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Создать новую тему</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введите заголовок темы"
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Сообщение</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              rows={5}
              value={formData.content}
              onChange={handleChange}
              placeholder="Опишите вашу проблему или вопрос..."
              required
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Создание..." : "Создать тему"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTopicModal;
