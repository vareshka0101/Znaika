import React, { useState } from "react";
import { Dropdown, Modal, Button, Alert, Form } from "react-bootstrap";
import { FaTrash, FaEllipsisV, FaEdit } from "react-icons/fa";
import { api } from "../services/api";
import styles from "./ForumPostActions.module.css";

const ForumPostActions = ({ post, topicId, onPostDeleted, onPostUpdated }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthor = user.id === post.user_id;

  console.log("ForumPostActions - пост:", {
    postId: post.id,
    postUserId: post.user_id,
    currentUserId: user.id,
    isAuthor,
  });

  // Только автор может видеть действия
  if (!isAuthor) {
    return null;
  }

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await api.deleteForumPost(topicId, post.id);
      setShowDeleteModal(false);
      onPostDeleted(post.id);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(err.message || "Ошибка при удалении сообщения");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    console.log("Редактирование сообщения:", post.id);
    console.log("Новый текст:", editContent);

    if (!editContent.trim()) {
      setError("Сообщение не может быть пустым");
      return;
    }

    if (editContent === post.content) {
      setShowEditModal(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.updateForumPost(topicId, post.id, {
        content: editContent,
      });
      console.log("Ответ от сервера:", response);

      const updatedPost = response.data || response;
      setShowEditModal(false);

      if (onPostUpdated) {
        onPostUpdated(updatedPost);
      }
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err.message || "Ошибка при редактировании сообщения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dropdown align="end" className={styles.actionsMenu}>
        <Dropdown.Toggle variant="link" className={styles.actionsToggle}>
          <FaEllipsisV />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowEditModal(true)}>
            <FaEdit className="me-2" />
            Редактировать
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => setShowDeleteModal(true)}
            className={styles.deleteItem}
          >
            <FaTrash className="me-2" />
            Удалить
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Модалка редактирования */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактирование сообщения</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group>
            <Form.Label>Текст сообщения</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              disabled={loading}
              placeholder="Введите текст сообщения..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleEdit}
            disabled={loading || !editContent.trim()}
          >
            {loading ? "Сохранение..." : "Сохранить"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модалка подтверждения удаления */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Удаление сообщения</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>Вы уверены, что хотите удалить это сообщение?</p>
          <div className="p-3 bg-light rounded">
            <p className="mb-0">{post.content.substring(0, 100)}...</p>
          </div>
          <p className="text-muted small mt-2">Это действие нельзя отменить.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Удаление..." : "Удалить"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForumPostActions;
