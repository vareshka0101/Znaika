import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const AdminNewsModal = ({ show, onHide, onNewsSaved, newsToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
    excerpt: "",
    content: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newsToEdit) {
      setFormData({
        title: newsToEdit.title || "",
        date: newsToEdit.date || new Date().toISOString().split("T")[0],
        image: newsToEdit.image || "",
        excerpt: newsToEdit.excerpt || "",
        content: newsToEdit.content || "",
        tags: newsToEdit.tags || [],
      });
    } else {
      resetForm();
    }
  }, [newsToEdit, show]);

  const resetForm = () => {
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      image: "",
      excerpt: "",
      content: "",
      tags: [],
    });
    setTagInput("");
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Введите заголовок";
    if (!formData.date) newErrors.date = "Укажите дату";
    if (!formData.image.trim())
      newErrors.image = "Укажите ссылку на изображение";
    if (!formData.excerpt.trim())
      newErrors.excerpt = "Введите краткое описание";
    if (!formData.content.trim()) newErrors.content = "Введите текст новости";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url = newsToEdit
        ? `http://localhost:8000/api/v1/news/${newsToEdit.id}`
        : "http://localhost:8000/api/v1/news";

      const method = newsToEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onNewsSaved(data.data || data);
        resetForm();
        onHide();
        alert(newsToEdit ? "Новость обновлена!" : "Новость создана!");
      } else {
        alert("Ошибка: " + (data.message || "Не удалось сохранить новость"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ borderBottom: "2px solid #58b4ae" }}>
        <Modal.Title>
          {newsToEdit ? "Редактировать новость" : "Создать новость"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Заголовок *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Введите заголовок новости"
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Дата *</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Ссылка на изображение *</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/public/images/news.jpg"
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Краткое описание *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="excerpt"
                  rows={2}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Краткое описание новости"
                  isInvalid={!!errors.excerpt}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.excerpt}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Полный текст *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Полный текст новости"
                  isInvalid={!!errors.content}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Теги</Form.Label>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <Form.Control
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите тег и нажмите Enter"
                  />
                  <Button variant="outline-primary" onClick={handleAddTag}>
                    Добавить
                  </Button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#58b4ae",
                        color: "white",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "white",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                          padding: "0 3px",
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
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
          disabled={loading}
        >
          {loading ? "Сохранение..." : newsToEdit ? "Обновить" : "Создать"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminNewsModal;
