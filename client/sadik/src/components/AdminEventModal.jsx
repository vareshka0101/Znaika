import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const AdminEventModal = ({
  show,
  onHide,
  onEventSaved,
  eventToEdit = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "upcoming",
    event_date: "",
    time: "",
    duration: "",
    description: "",
    icon: "FaCalendarCheck",
    sort_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const modalShow = show === undefined ? false : show;
    console.log("AdminEventModal - show:", modalShow);
    console.log("AdminEventModal - eventToEdit:", eventToEdit);

    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title || "",
        type: eventToEdit.type || "upcoming",
        event_date: eventToEdit.event_date || "",
        time: eventToEdit.time || "",
        duration: eventToEdit.duration || "",
        description: eventToEdit.description || "",
        icon: eventToEdit.icon || "FaCalendarCheck",
        sort_order: eventToEdit.sort_order || 0,
        is_active: eventToEdit.is_active ?? true,
      });
    } else {
      resetForm();
    }
  }, [eventToEdit, show]);

  const resetForm = () => {
    setFormData({
      title: "",
      type: "upcoming",
      event_date: "",
      time: "",
      duration: "",
      description: "",
      icon: "FaCalendarCheck",
      sort_order: 0,
      is_active: true,
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim())
      newErrors.title = "Введите название мероприятия";
    if (!formData.time.trim()) newErrors.time = "Укажите время проведения";
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
      const url = eventToEdit
        ? `http://localhost:8000/api/v1/admin/events/${eventToEdit.id}`
        : "http://localhost:8000/api/v1/admin/events";

      const method = eventToEdit ? "PUT" : "POST";

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
        const savedEvent = data.data || data;
        onEventSaved(savedEvent);
        resetForm();
        onHide();
      } else {
        alert(
          "Ошибка: " + (data.message || "Не удалось сохранить мероприятие"),
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  const modalShow = show === undefined ? false : show;

  return (
    <Modal show={modalShow} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ borderBottom: "2px solid #58b4ae" }}>
        <Modal.Title>
          {eventToEdit ? "Редактировать мероприятие" : "Создать мероприятие"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Название мероприятия *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Введите название мероприятия"
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Тип *</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="upcoming">Предстоящее</option>
                  <option value="archive">Архивное</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Дата</Form.Label>
                <Form.Control
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Время *</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="14:00–15:30"
                  isInvalid={!!errors.time}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.time}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Длительность</Form.Label>
                <Form.Control
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="90 минут"
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Описание мероприятия..."
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Иконка</Form.Label>
                <Form.Select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                >
                  <option value="FaCalendarCheck">Календарь</option>
                  <option value="FaArchive">Архив</option>
                  <option value="FaStar">Звезда</option>
                  <option value="FaMusic">Музыка</option>
                  <option value="FaBook">Книга</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Порядок сортировки</Form.Label>
                <Form.Control
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Активно (показывать на сайте)"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
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
          {loading ? "Сохранение..." : eventToEdit ? "Обновить" : "Создать"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEventModal;
