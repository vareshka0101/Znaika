import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaArchive,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import AdminEventModal from "../components/AdminEventModal";
import styles from "./AdminEventsPage.module.css";

const AdminEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка загрузки мероприятий");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message || "Ошибка загрузки мероприятий");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить это мероприятие?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(events.filter((item) => item.id !== id));
        setSuccess("Мероприятие успешно удалено");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        alert(data.message || "Ошибка при удалении");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Ошибка при удалении: " + error.message);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/events/${id}/toggle-active`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(
          events.map((e) =>
            e.id === id ? { ...e, is_active: !currentStatus } : e,
          ),
        );
        setSuccess(
          !currentStatus ? "Мероприятие опубликовано" : "Мероприятие скрыто",
        );
        setTimeout(() => setSuccess(""), 3000);
      } else {
        alert(data.message || "Ошибка при изменении статуса");
      }
    } catch (error) {
      console.error("Error toggling event status:", error);
      setError("Ошибка при изменении статуса: " + error.message);
    }
  };

  const handleEventSaved = (savedEvent) => {
    if (editingEvent) {
      setEvents(
        events.map((item) => (item.id === savedEvent.id ? savedEvent : item)),
      );
    } else {
      setEvents([savedEvent, ...events]);
    }
    setShowModal(false);
    setEditingEvent(null);
    setSuccess(editingEvent ? "Мероприятие обновлено" : "Мероприятие создано");
    setTimeout(() => setSuccess(""), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      return new Date(dateString).toLocaleDateString("ru-RU");
    } catch {
      return dateString;
    }
  };

  const getFilteredEvents = () => {
    if (activeTab === "all") return events;
    return events.filter((e) => e.type === activeTab);
  };

  const filteredEvents = getFilteredEvents();

  return (
    <>
      <NavbarComponent />
      <Container fluid className={styles.container}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={styles.title}>
            <FaCalendarAlt className="me-2" /> Управление мероприятиями
          </h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditingEvent(null);
              setShowModal(true);
            }}
            className={styles.addButton}
          >
            <FaPlus className="me-2" /> Создать мероприятие
          </Button>
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

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="all" title={`Все (${events.length})`} />
          <Tab
            eventKey="upcoming"
            title={`Предстоящие (${events.filter((e) => e.type === "upcoming").length})`}
          />
          <Tab
            eventKey="archive"
            title={`Архив (${events.filter((e) => e.type === "archive").length})`}
          />
        </Tabs>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        ) : (
          <Table striped bordered hover responsive className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Тип</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Нет мероприятий для отображения
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td className={styles.titleCell}>
                      <strong>{event.title}</strong>
                      {event.description && (
                        <div className="text-muted small">
                          {event.description.length > 50
                            ? event.description.substring(0, 50) + "..."
                            : event.description}
                        </div>
                      )}
                    </td>
                    <td>
                      {event.type === "upcoming" ? (
                        <Badge bg="success" className={styles.badge}>
                          <FaCalendarAlt className="me-1" /> Предстоящее
                        </Badge>
                      ) : (
                        <Badge bg="secondary" className={styles.badge}>
                          <FaArchive className="me-1" /> Архив
                        </Badge>
                      )}
                    </td>
                    <td>{formatDate(event.event_date)}</td>
                    <td>{event.time}</td>
                    <td>
                      {event.is_active ? (
                        <Badge bg="success" className={styles.badge}>
                          <FaEye className="me-1" /> Активно
                        </Badge>
                      ) : (
                        <Badge
                          bg="warning"
                          text="dark"
                          className={styles.badge}
                        >
                          <FaEyeSlash className="me-1" /> Скрыто
                        </Badge>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(event)}
                          title="Редактировать"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant={
                            event.is_active
                              ? "outline-warning"
                              : "outline-success"
                          }
                          size="sm"
                          onClick={() =>
                            handleToggleActive(event.id, event.is_active)
                          }
                          title={event.is_active ? "Скрыть" : "Опубликовать"}
                        >
                          {event.is_active ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
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
      </Container>

      <AdminEventModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingEvent(null);
        }}
        onEventSaved={handleEventSaved}
        eventToEdit={editingEvent}
      />
      <FooterComponent />
    </>
  );
};

export default AdminEventsPage;
