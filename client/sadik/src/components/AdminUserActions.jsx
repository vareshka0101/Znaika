import React, { useState } from "react";
import { Dropdown, Modal, Button, Alert } from "react-bootstrap";
import { FaUserLock, FaUserCheck, FaEllipsisV } from "react-icons/fa";
import { api } from "../services/api";
import styles from "./AdminUserActions.module.css";

const AdminUserActions = ({ user, onUserUpdated }) => {
  const [showBanModal, setShowBanModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin =
    JSON.parse(localStorage.getItem("user") || "{}").role === "admin";
  if (!isAdmin) return null;

  const handleToggleBan = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.toggleUserBan(user.id);
      setShowBanModal(false);
      onUserUpdated(response.data || response);
    } catch (err) {
      console.error("Error toggling user ban:", err);
      setError(err.message || "Ошибка при изменении статуса");
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
          <Dropdown.Item
            onClick={() => setShowBanModal(true)}
            className={user.is_banned ? styles.unbanItem : styles.banItem}
          >
            {user.is_banned ? (
              <>
                <FaUserCheck className="me-2" />
                Разблокировать пользователя
              </>
            ) : (
              <>
                <FaUserLock className="me-2" />
                Заблокировать пользователя
              </>
            )}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showBanModal} onHide={() => setShowBanModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {user.is_banned
              ? "Разблокировка пользователя"
              : "Блокировка пользователя"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            {user.is_banned
              ? `Вы уверены, что хотите разблокировать пользователя ${user.name}?`
              : `Вы уверены, что хотите заблокировать пользователя ${user.name}?`}
          </p>
          <p className="text-muted small">
            {user.is_banned
              ? "Пользователь сможет снова создавать темы и отвечать."
              : "Заблокированный пользователь не сможет создавать темы и отвечать."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBanModal(false)}>
            Отмена
          </Button>
          <Button
            variant={user.is_banned ? "success" : "danger"}
            onClick={handleToggleBan}
            disabled={loading}
          >
            {loading
              ? "Обработка..."
              : user.is_banned
                ? "Разблокировать"
                : "Заблокировать"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminUserActions;
