import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSun, FaUtensils, FaBirthdayCake } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import ContactForm from "../components/ContactForm";
import styles from "./MenuPage.module.css";

const MenuPage = () => {
  const [activeDay, setActiveDay] = useState("monday");
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getMockData = useCallback(() => {
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
  }, []);

  const fetchMenuData = useCallback(
    async (day = "monday") => {
      setLoading(true);
      try {
        const response = await fetch(`/api/menu/${day}`);
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setMenuData(getMockData());
      } finally {
        setLoading(false);
      }
    },
    [getMockData],
  );

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    fetchMenuData();
  }, [fetchMenuData]);

  useEffect(() => {
    fetchMenuData(activeDay);
  }, [activeDay, fetchMenuData]);

  const handleDayClick = (dayId) => {
    setActiveDay(dayId);
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
              <ContactForm />
            </Col>
          </Row>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default MenuPage;
