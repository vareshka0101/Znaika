import React, { useState, useEffect } from "react";
import { Button, Alert, Card } from "react-bootstrap";
import { api } from "../services/api";

const DebugAccess = () => {
  const [status, setStatus] = useState({
    token: null,
    savedCode: null,
    user: null,
    hasAccess: null,
    checking: false,
  });

  const checkAccess = async () => {
    setStatus({ ...status, checking: true });

    const token = localStorage.getItem("token");
    const savedCode = localStorage.getItem("parentClubCode");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    let hasAccess = false;
    try {
      const response = await api.hasParentClubAccess();
      hasAccess = response.has_access;
    } catch (error) {
      console.error("Error checking access:", error);
    }

    setStatus({
      token,
      savedCode,
      user,
      hasAccess,
      checking: false,
    });
  };

  useEffect(() => {
    checkAccess();
  }, []);

  const fixAccess = () => {
    // Принудительно устанавливаем код
    localStorage.setItem("parentClubCode", "SECRET2026");
    checkAccess();
  };

  const clearAccess = () => {
    localStorage.removeItem("parentClubCode");
    checkAccess();
  };

  return (
    <Card className="mb-3">
      <Card.Header>🔧 Отладка доступа к родительскому клубу</Card.Header>
      <Card.Body>
        {status.checking ? (
          <p>Проверка...</p>
        ) : (
          <>
            <Alert variant={status.token ? "success" : "danger"}>
              <strong>Токен:</strong> {status.token ? "✅ Есть" : "❌ Нет"}
            </Alert>

            <Alert variant={status.savedCode ? "success" : "warning"}>
              <strong>Секретный код:</strong> {status.savedCode || "❌ Нет"}
            </Alert>

            <Alert variant={status.user ? "success" : "danger"}>
              <strong>Пользователь:</strong>{" "}
              {status.user ? status.user.name : "❌ Нет"}
              {status.user && <div>Роль: {status.user.role}</div>}
            </Alert>

            <Alert variant={status.hasAccess ? "success" : "warning"}>
              <strong>Доступ к клубу (сервер):</strong>{" "}
              {status.hasAccess ? "✅ Есть" : "❌ Нет"}
            </Alert>

            <div className="d-flex gap-2">
              <Button variant="warning" size="sm" onClick={fixAccess}>
                Установить код SECRET2026
              </Button>
              <Button variant="danger" size="sm" onClick={clearAccess}>
                Очистить код
              </Button>
              <Button variant="info" size="sm" onClick={checkAccess}>
                Обновить
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default DebugAccess;
