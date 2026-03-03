import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaSun, FaUtensils, FaPhoneAlt, FaBirthdayCake } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./MenuPage.module.css";

const MenuPage = () => {
  const [activeDay, setActiveDay] = useState("monday");
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    message: "",
  });

  const days = [
    { id: "monday", label: "Понедельник" },
    { id: "tuesday", label: "Вторник" },
    { id: "wednesday", label: "Среда" },
    { id: "thursday", label: "Четверг" },
    { id: "friday", label: "Пятница" },
  ];

  const categories = [
    { id: "breakfast", label: "Завтрак", icon: FaSun },
    { id: "lunch", label: "Обед", icon: FaUtensils },
    { id: "dessert", label: "Десерт", icon: FaBirthdayCake },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    fetchMenuData();
  }, []);

  useEffect(() => {
    if (activeDay) {
      fetchMenuData(activeDay);
    }
  }, [activeDay]);

  const fetchMenuData = async (day = "monday") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/menu/${day}`);
      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);

      setMenuData(getMockData(day));
    } finally {
      setLoading(false);
    }
  };

  const getMockData = (day) => {
    return {
      breakfast: [
        {
          id: 1,
          title: "Миска хлопьев на завтрак",
          description:
            "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
          image: "/public/images/меню-картинка.png",
        },
        {
          id: 2,
          title: "Овсяная каша с ягодами",
          description:
            "Нежная овсяная каша на молоке с сезонными ягодами и медом.",
          image: "/public/images/wwwwww.png",
        },
      ],
      lunch: [
        {
          id: 3,
          title: "Вегетарианская паста",
          description:
            "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
          image: "/public/images/wwwwww.png",
        },
        {
          id: 4,
          title: "Тыквенный суп-пюре",
          description:
            "Ароматный суп из тыквы с кокосовым молоком и семечками.",
          image: "/public/images/меню-картинка.png",
        },
      ],
      dessert: [
        {
          id: 5,
          title: "Яблочный пирог с карамелью",
          description:
            "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
          image: "/public/images/меню-картинка.png",
        },
        {
          id: 6,
          title: "Фруктовое мороженое",
          description: "Натуральное мороженое из свежих фруктов без сахара.",
          image: "/public/images/wwwwww.png",
        },
      ],
    };
  };

  const handleDayClick = (dayId) => {
    setActiveDay(dayId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Форма отправлена! Мы свяжемся с вами в ближайшее время.");
        setFormData({ phone: "", name: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <NavbarComponent />

      <div className={styles.heroImage}>
        <img src="/public/images/меню.jpg" alt="Декоративная картинка" />
      </div>

      <section className="py-5">
        <Container>
          <h1
            className={`display-4 text-center mb-2 ${styles.pageTitle}`}
            data-aos="fade-down"
          >
            Меню питания
          </h1>
          <p
            className="text-center text-muted mb-5"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Ознакомьтесь с нашим разнообразным меню на неделю
          </p>

          <Row className="g-2 mb-5" data-aos="fade-up">
            {days.map((day) => (
              <Col key={day.id}>
                <div
                  className={`${styles.dayTab} ${activeDay === day.id ? styles.active : ""}`}
                  onClick={() => handleDayClick(day.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleDayClick(day.id);
                    }
                  }}
                >
                  {day.label}
                </div>
              </Col>
            ))}
          </Row>

          {menuData &&
            categories.map((category) => (
              <div
                key={category.id}
                className={styles.menuCategory}
                data-aos="fade-up"
              >
                <div className={styles.categoryBadge}>
                  <category.icon className="me-2" />
                  {category.label}
                </div>
                <Row className="g-4">
                  {menuData[category.id]?.map((item) => (
                    <Col key={item.id} md={6}>
                      <div className={styles.menuItemCard}>
                        <div className={styles.menuItemImg}>
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                          />
                        </div>
                        <div className={styles.menuItemContent}>
                          <h3 className={styles.menuItemTitle}>{item.title}</h3>
                          <p className={styles.menuItemDesc}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

          <Row className="justify-content-center mt-5">
            <Col lg={8}>
              <div className={styles.contactForm} data-aos="zoom-in">
                <h2
                  className={`display-5 text-center mb-4 ${styles.formTitle}`}
                >
                  Как записать ребенка на занятия?
                </h2>
                <p className="text-center fs-5 mb-4">
                  <FaPhoneAlt className="me-2 text-primary" />
                  <strong>+7 (495) 666-33-99</strong> или заполните форму ниже
                </p>
                <p className="text-center text-muted mb-4">
                  Приглашаем вас на занятия для детей в возрасте от 3 до 6 лет.
                  Мы поможем вам с подготовкой к школе и развитием личности.
                </p>

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Контактный телефон"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={3}
                        placeholder="Ваше сообщение"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs={12} className="text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="px-5 py-3"
                      >
                        ОТПРАВИТЬ
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default MenuPage;
