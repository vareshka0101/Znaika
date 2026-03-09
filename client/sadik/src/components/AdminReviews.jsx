import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaStar,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import styles from "./AdminReviews.module.css";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    author: "",
    child_name: "",
    text: "",
    rating: 5,
    is_approved: false,
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Ошибка загрузки отзывов");

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
      setError("Ошибка при загрузке отзывов");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      author: review.author,
      child_name: review.child_name || "",
      text: review.text,
      rating: review.rating,
      is_approved: review.is_approved,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
        setSuccess("Отзыв успешно удален");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Ошибка при удалении");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Ошибка при удалении отзыва");
    }
  };

  const handleApprove = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/reviews/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_approved: !currentStatus }),
        },
      );

      if (response.ok) {
        setReviews(
          reviews.map((r) =>
            r.id === id ? { ...r, is_approved: !currentStatus } : r,
          ),
        );
        setSuccess(
          !currentStatus ? "Отзыв опубликован" : "Отзыв снят с публикации",
        );
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Ошибка при изменении статуса");
      }
    } catch (error) {
      console.error("Error approving review:", error);
      setError("Ошибка при изменении статуса");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/reviews/${editingReview.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(
          reviews.map((r) => (r.id === updatedReview.id ? updatedReview : r)),
        );
        setSuccess("Отзыв успешно обновлен");
        setShowModal(false);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Ошибка при обновлении");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      setError("Ошибка при обновлении отзыва");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "pending") return !review.is_approved;
    if (filter === "approved") return review.is_approved;
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Неизвестно";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  return (
    <Container fluid className={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.title}>Управление отзывами</h2>
        <div className={styles.filters}>
          <Button
            variant={filter === "all" ? "primary" : "outline-primary"}
            onClick={() => setFilter("all")}
            className="me-2"
          >
            Все ({reviews.length})
          </Button>
          <Button
            variant={filter === "pending" ? "warning" : "outline-warning"}
            onClick={() => setFilter("pending")}
            className="me-2"
          >
            На модерации ({reviews.filter((r) => !r.is_approved).length})
          </Button>
          <Button
            variant={filter === "approved" ? "success" : "outline-success"}
            onClick={() => setFilter("approved")}
          >
            Опубликованные ({reviews.filter((r) => r.is_approved).length})
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Автор</th>
              <th>Ребенок</th>
              <th>Отзыв</th>
              <th>Рейтинг</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Нет отзывов для отображения
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td className={styles.authorCell}>
                    <strong>{review.author}</strong>
                  </td>
                  <td>{review.child_name || "—"}</td>
                  <td className={styles.reviewText}>
                    {review.text.length > 100
                      ? `${review.text.substring(0, 100)}...`
                      : review.text}
                  </td>
                  <td>
                    <div className={styles.ratingCell}>
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td className={styles.dateCell}>
                    {formatDate(review.created_at || review.date)}
                  </td>
                  <td>
                    {review.is_approved ? (
                      <Badge bg="success" className={styles.badge}>
                        <FaCheck className="me-1" /> Опубликован
                      </Badge>
                    ) : (
                      <Badge bg="warning" text="dark" className={styles.badge}>
                        <FaEyeSlash className="me-1" /> На модерации
                      </Badge>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(review)}
                        title="Редактировать"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant={
                          review.is_approved
                            ? "outline-warning"
                            : "outline-success"
                        }
                        size="sm"
                        onClick={() =>
                          handleApprove(review.id, review.is_approved)
                        }
                        title={
                          review.is_approved
                            ? "Снять с публикации"
                            : "Опубликовать"
                        }
                      >
                        {review.is_approved ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(review.id)}
                        title="Удалить"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Редактировать отзыв</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Автор *</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Имя ребенка</Form.Label>
              <Form.Control
                type="text"
                name="child_name"
                value={formData.child_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Текст отзыва *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Рейтинг</Form.Label>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`${styles.star} ${
                      star <= formData.rating ? styles.starFilled : ""
                    }`}
                    onClick={() => handleRatingChange(star)}
                    size={24}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Опубликовать отзыв"
                name="is_approved"
                checked={formData.is_approved}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Отмена
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminReviews;
