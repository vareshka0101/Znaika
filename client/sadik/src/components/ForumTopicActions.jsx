import React, { useState } from "react";
import { Dropdown, Modal, Button, Alert, Form } from "react-bootstrap";
import {
  FaTrash,
  FaLock,
  FaLockOpen,
  FaThumbtack,
  FaEllipsisV,
  FaEdit,
} from "react-icons/fa";
import { api } from "../services/api";
import styles from "./ForumTopicActions.module.css";

const ForumTopicActions = ({ topic, onTopicDeleted, onTopicUpdated }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(topic.title);
  const [editContent, setEditContent] = useState(topic.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";
  const isAuthor = user.id === topic.user_id;

  console.log("ForumTopicActions - тема:", {
    topicId: topic.id,
    topicUserId: topic.user_id,
    currentUserId: user.id,
    isAuthor,
    isAdmin,
  });

  // Только администратор или автор могут видеть действия
  if (!isAdmin && !isAuthor) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await api.deleteForumTopic(topic.id);
      setShowDeleteModal(false);
      onTopicDeleted(topic.id);
    } catch (err) {
      console.error("Error deleting topic:", err);
      setError(err.message || "Ошибка при удалении темы");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.toggleTopicLock(topic.id);
      setShowLockModal(false);
      onTopicUpdated(response.data || response);
    } catch (err) {
      console.error("Error toggling lock:", err);
      setError(err.message || "Ошибка при изменении статуса");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.toggleTopicPin(topic.id);
      onTopicUpdated(response.data || response);
    } catch (err) {
      console.error("Error toggling pin:", err);
      setError(err.message || "Ошибка при закреплении темы");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    console.log("Редактирование темы:", topic.id);
    console.log("Новый заголовок:", editTitle);
    console.log("Новое содержание:", editContent);

    if (!editTitle.trim()) {
      setError("Заголовок не может быть пустым");
      return;
    }

    if (!editContent.trim()) {
      setError("Содержание не может быть пустым");
      return;
    }

    if (editTitle === topic.title && editContent === topic.content) {
      setShowEditModal(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.updateForumTopic(topic.id, {
        title: editTitle,
        content: editContent,
      });
      console.log("Ответ от сервера:", response);

      const updatedTopic = response.data || response;
      setShowEditModal(false);

      if (onTopicUpdated) {
        onTopicUpdated(updatedTopic);
      }
    } catch (err) {
      console.error("Error updating topic:", err);
      setError(err.message || "Ошибка при редактировании темы");
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
          {/* Редактирование - доступно автору ИЛИ администратору */}
          {(isAdmin || isAuthor) && (
            <Dropdown.Item onClick={() => setShowEditModal(true)}>
              <FaEdit className="me-2" />
              Редактировать
            </Dropdown.Item>
          )}

          {/* Администратор может закреплять и блокировать */}
          {isAdmin && (
            <>
              <Dropdown.Item onClick={handleTogglePin}>
                <FaThumbtack className="me-2" />
                {topic.is_pinned ? "Открепить" : "Закрепить"}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setShowLockModal(true)}>
                {topic.is_locked ? (
                  <>
                    <FaLockOpen className="me-2" />
                    Разблокировать
                  </>
                ) : (
                  <>
                    <FaLock className="me-2" />
                    Заблокировать
                  </>
                )}
              </Dropdown.Item>
            </>
          )}

          {/* Разделитель только если есть и редактирование, и удаление */}
          {(isAdmin || isAuthor) && isAdmin && <Dropdown.Divider />}

          {/* Удаление темы - доступно автору ИЛИ администратору */}
          {(isAdmin || isAuthor) && (
            <Dropdown.Item
              onClick={() => setShowDeleteModal(true)}
              className={styles.deleteItem}
            >
              <FaTrash className="me-2" />
              Удалить тему
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* Модалка редактирования */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактирование темы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                disabled={loading}
                placeholder="Введите заголовок темы"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Содержание</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                disabled={loading}
                placeholder="Введите содержание темы"
              />
            </Form.Group>
          </Form>
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
            disabled={loading || !editTitle.trim() || !editContent.trim()}
          >
            {loading ? "Сохранение..." : "Сохранить изменения"}
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
          <Modal.Title>Удаление темы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            Вы уверены, что хотите удалить тему <strong>"{topic.title}"</strong>
            ?
          </p>
          <p className="text-muted small">Это действие нельзя отменить.</p>
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

      {/* Модалка подтверждения блокировки */}
      <Modal
        show={showLockModal}
        onHide={() => setShowLockModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {topic.is_locked ? "Разблокировка темы" : "Блокировка темы"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            {topic.is_locked
              ? "Вы уверены, что хотите разблокировать эту тему? Пользователи снова смогут отвечать."
              : "Вы уверены, что хотите заблокировать эту тему? Пользователи не смогут добавлять новые ответы."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLockModal(false)}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            variant={topic.is_locked ? "success" : "warning"}
            onClick={handleToggleLock}
            disabled={loading}
          >
            {loading
              ? "Обработка..."
              : topic.is_locked
                ? "Разблокировать"
                : "Заблокировать"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForumTopicActions;
