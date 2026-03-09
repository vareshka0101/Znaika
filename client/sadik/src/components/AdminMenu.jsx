import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSun,
  FaUtensils,
  FaBirthdayCake,
} from "react-icons/fa";
import styles from "./AdminMenu.module.css";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "breakfast",
    day: "monday",
    image: null,
    image_preview: "",
  });

  const categories = [
    { value: "breakfast", label: "Завтрак", icon: FaSun },
    { value: "lunch", label: "Обед", icon: FaUtensils },
    { value: "dessert", label: "Десерт", icon: FaBirthdayCake },
  ];

  const days = [
    { value: "monday", label: "Понедельник" },
    { value: "tuesday", label: "Вторник" },
    { value: "wednesday", label: "Среда" },
    { value: "thursday", label: "Четверг" },
    { value: "friday", label: "Пятница" },
  ];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = () => {
    try {
      setLoading(true);
      const savedItems = localStorage.getItem("znaika_menu_items");
      if (savedItems) {
        setMenuItems(JSON.parse(savedItems));
      } else {
        const initialItems = getInitialMenuItems();
        setMenuItems(initialItems);
        localStorage.setItem("znaika_menu_items", JSON.stringify(initialItems));
      }
    } catch (error) {
      setError("Ошибка при загрузке меню");
    } finally {
      setLoading(false);
    }
  };

  const saveMenuItems = (items) => {
    try {
      localStorage.setItem("znaika_menu_items", JSON.stringify(items));
      setMenuItems(items);
    } catch (error) {
      setError("Ошибка при сохранении меню");
    }
  };

  const handleShowModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        day: item.day,
        image: null,
        image_preview: item.image_url || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        description: "",
        category: "breakfast",
        day: "monday",
        image: null,
        image_preview: "",
      });
    }
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setError("");
    setFormData({
      name: "",
      description: "",
      category: "breakfast",
      day: "monday",
      image: null,
      image_preview: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          image_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const newItem = {
        id: editingItem ? editingItem.id : Date.now(),
        name: formData.name,
        description: formData.description,
        category: formData.category,
        day: formData.day,
        image_url: formData.image_preview || "/public/images/меню-картинка.png",
        created_at: new Date().toISOString(),
      };

      let updatedItems;
      if (editingItem) {
        updatedItems = menuItems.map((item) =>
          item.id === editingItem.id ? newItem : item,
        );
        setSuccess("Блюдо успешно обновлено");
      } else {
        updatedItems = [...menuItems, newItem];
        setSuccess("Блюдо успешно добавлено");
      }

      saveMenuItems(updatedItems);

      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        handleCloseModal();
        setSuccess("");
      }, 1500);
    } catch (error) {
      console.error("Error saving menu item:", error);
      setError("Ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить это блюдо?")) {
      try {
        const updatedItems = menuItems.filter((item) => item.id !== id);
        saveMenuItems(updatedItems);

        window.dispatchEvent(new Event("storage"));
        setSuccess("Блюдо успешно удалено");
        setTimeout(() => setSuccess(""), 3000);
      } catch (error) {
        setError("Ошибка при удалении");
      }
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.icon : FaUtensils;
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  const getDayLabel = (day) => {
    const d = days.find((d) => d.value === day);
    return d ? d.label : day;
  };

  const getItemsByDayAndCategory = (day, category) => {
    return menuItems.filter(
      (item) => item.day === day && item.category === category,
    );
  };

  return (
    <Container fluid className={styles.container}>
      <Row className="mb-4">
        <Col>
          <h2 className={styles.title}>
            <FaUtensils className="me-2" /> Управление меню
          </h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => handleShowModal()}
            className={styles.addButton}
          >
            <FaPlus /> Добавить блюдо
          </Button>
        </Col>
      </Row>

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

      {loading && !menuItems.length ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : (
        <Row>
          {days.map((day) => (
            <Col lg={12} className="mb-4" key={day.value}>
              <Card className={styles.dayCard}>
                <Card.Header className={styles.dayHeader}>
                  {day.label}
                </Card.Header>
                <Card.Body>
                  <Row>
                    {categories.map((category) => {
                      const categoryItems = getItemsByDayAndCategory(
                        day.value,
                        category.value,
                      );
                      const CategoryIcon = category.icon;

                      return (
                        <Col md={4} key={category.value}>
                          <div className={styles.categorySection}>
                            <h5 className={styles.categoryTitle}>
                              <CategoryIcon className="me-2" />
                              {category.label}
                              <Badge bg="secondary" className="ms-2">
                                {categoryItems.length}
                              </Badge>
                            </h5>
                            {categoryItems.length === 0 ? (
                              <p className="text-muted small">Нет блюд</p>
                            ) : (
                              <ul className={styles.menuList}>
                                {categoryItems.map((item) => (
                                  <li
                                    key={item.id}
                                    className={styles.menuListItem}
                                  >
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div className="flex-grow-1 me-2">
                                        <strong>{item.name}</strong>
                                        <br />
                                        <small className="text-muted">
                                          {item.description &&
                                          item.description.length > 50
                                            ? `${item.description.substring(0, 50)}...`
                                            : item.description}
                                        </small>
                                      </div>
                                      <div className="d-flex flex-nowrap">
                                        <Button
                                          variant="outline-primary"
                                          size="sm"
                                          className="me-1"
                                          onClick={() => handleShowModal(item)}
                                        >
                                          <FaEdit />
                                        </Button>
                                        <Button
                                          variant="outline-danger"
                                          size="sm"
                                          onClick={() => handleDelete(item.id)}
                                        >
                                          <FaTrash />
                                        </Button>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>
            {editingItem ? "Редактировать блюдо" : "Добавить новое блюдо"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Название блюда *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Например: Овсяная каша"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>День недели *</Form.Label>
                  <Form.Select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    required
                  >
                    {days.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Категория *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Описание *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Опишите состав и особенности блюда"
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Изображение</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.image_preview && (
                    <div className="mt-2">
                      <img
                        src={formData.image_preview}
                        alt="Preview"
                        className={styles.imagePreview}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Отмена
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading
                ? "Сохранение..."
                : editingItem
                  ? "Сохранить"
                  : "Добавить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

function getInitialMenuItems() {
  return [
    {
      id: 1,
      name: "Миска хлопьев на завтрак",
      description:
        "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
      category: "breakfast",
      day: "monday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 2,
      name: "Овсяная каша с ягодами",
      description: "Нежная овсяная каша на молоке с сезонными ягодами и медом.",
      category: "breakfast",
      day: "monday",
      image_url: "/public/images/wwwwww.png",
    },
    {
      id: 3,
      name: "Вегетарианская паста",
      description:
        "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
      category: "lunch",
      day: "monday",
      image_url: "/public/images/wwwwww.png",
    },
    {
      id: 4,
      name: "Тыквенный суп-пюре",
      description: "Ароматный суп из тыквы с кокосовым молоком и семечками.",
      category: "lunch",
      day: "monday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 5,
      name: "Яблочный пирог с карамелью",
      description:
        "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
      category: "dessert",
      day: "monday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 6,
      name: "Фруктовое мороженое",
      description: "Натуральное мороженое из свежих фруктов без сахара.",
      category: "dessert",
      day: "monday",
      image_url: "/public/images/wwwwww.png",
    },

    {
      id: 7,
      name: "Сырники со сметаной",
      description:
        "Нежные сырники из творога с ванилью, подаются со сметаной и ягодным соусом.",
      category: "breakfast",
      day: "tuesday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 8,
      name: "Гречневая каша с молоком",
      description: "РассЫпчатая гречневая каша на молоке с сливочным маслом.",
      category: "breakfast",
      day: "tuesday",
      image_url: "/public/images/wwwwww.png",
    },
    {
      id: 9,
      name: "Борщ со сметаной",
      description:
        "Традиционный борщ с мясом, свеклой и капустой, подается со сметаной.",
      category: "lunch",
      day: "tuesday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 10,
      name: "Куриные котлеты с пюре",
      description: "Нежные куриные котлеты с картофельным пюре и подливкой.",
      category: "lunch",
      day: "tuesday",
      image_url: "/public/images/wwwwww.png",
    },
    {
      id: 11,
      name: "Фруктовый салат",
      description: "Свежие фрукты с йогуртовой заправкой.",
      category: "dessert",
      day: "tuesday",
      image_url: "/public/images/меню-картинка.png",
    },

    {
      id: 12,
      name: "Омлет с сыром",
      description: "Пышный омлет с тертым сыром и зеленью.",
      category: "breakfast",
      day: "wednesday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 13,
      name: "Рисовая каша с тыквой",
      description: "Сладкая рисовая каша с тыквой и сливочным маслом.",
      category: "breakfast",
      day: "wednesday",
      image_url: "/public/images/wwwwww.png",
    },
    {
      id: 14,
      name: "Рыбный суп",
      description: "Легкий суп из свежей рыбы с овощами.",
      category: "lunch",
      day: "wednesday",
      image_url: "/public/images/меню-картинка.png",
    },
    {
      id: 15,
      name: "Макароны по-флотски",
      description: "Макароны с тушеным мясом и луком.",
      category: "lunch",
      day: "wednesday",
      image_url: "/public/images/wwwwww.png",
    },
    {
      id: 16,
      name: "Йогурт с ягодами",
      description: "Натуральный йогурт с сезонными ягодами.",
      category: "dessert",
      day: "wednesday",
      image_url: "/public/images/меню-картинка.png",
    },
  ];
}

export default AdminMenu;
