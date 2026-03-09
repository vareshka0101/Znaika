import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSun, FaUtensils, FaBirthdayCake } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./MenuPage.module.css";

const MenuPage = () => {
  const [activeDay, setActiveDay] = useState("monday");
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateKey, setUpdateKey] = useState(0);

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

  const loadMenuData = useCallback((day = "monday") => {
    setLoading(true);
    try {
      const savedItems = localStorage.getItem("znaika_menu_items");
      let allItems = [];

      if (savedItems) {
        allItems = JSON.parse(savedItems);
        console.log("Загруженные данные:", allItems);
      } else {
        allItems = getInitialMenuItems();
        localStorage.setItem("znaika_menu_items", JSON.stringify(allItems));
      }

      const dayItems = {
        breakfast: allItems.filter(
          (item) => item.day === day && item.category === "breakfast",
        ),
        lunch: allItems.filter(
          (item) => item.day === day && item.category === "lunch",
        ),
        dessert: allItems.filter(
          (item) => item.day === day && item.category === "dessert",
        ),
      };

      console.log(`Данные для дня ${day}:`, dayItems);
      setMenuData(dayItems);
    } catch (error) {
      console.error("Error loading menu data:", error);

      setMenuData(getMockData());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    loadMenuData(activeDay);
  }, [activeDay, loadMenuData, updateKey]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "znaika_menu_items") {
        console.log("Обнаружено изменение в localStorage, обновляем...");
        setUpdateKey((prev) => prev + 1);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const savedItems = localStorage.getItem("znaika_menu_items");
      if (savedItems) {
        const currentData = JSON.parse(savedItems);

        setUpdateKey((prev) => prev + 1);
      }
    }, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

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

          {menuData ? (
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
                  {menuData[category.id]?.length > 0 ? (
                    menuData[category.id].map((item) => (
                      <Col key={item.id} md={6}>
                        <div className={styles.menuItemCard}>
                          <div className={styles.menuItemImg}>
                            <img
                              src={
                                item.image_url ||
                                "/public/images/меню-картинка.png"
                              }
                              alt={item.name}
                              loading="lazy"
                              onError={(e) => {
                                e.target.src =
                                  "/public/images/меню-картинка.png";
                              }}
                            />
                          </div>
                          <div className={styles.menuItemContent}>
                            <h3 className={styles.menuItemTitle}>
                              {item.name}
                            </h3>
                            <p className={styles.menuItemDesc}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <Col xs={12}>
                      <p className="text-muted text-center py-3">
                        Нет блюд в этой категории
                      </p>
                    </Col>
                  )}
                </Row>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Нет данных для отображения</p>
            </div>
          )}
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

function getMockData() {
  return {
    breakfast: [
      {
        id: 1,
        name: "Миска хлопьев на завтрак",
        description:
          "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
        image_url: "/public/images/меню-картинка.png",
      },
      {
        id: 2,
        name: "Овсяная каша с ягодами",
        description:
          "Нежная овсяная каша на молоке с сезонными ягодами и медом.",
        image_url: "/public/images/wwwwww.png",
      },
    ],
    lunch: [
      {
        id: 3,
        name: "Вегетарианская паста",
        description:
          "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
        image_url: "/public/images/wwwwww.png",
      },
      {
        id: 4,
        name: "Тыквенный суп-пюре",
        description: "Ароматный суп из тыквы с кокосовым молоком и семечками.",
        image_url: "/public/images/меню-картинка.png",
      },
    ],
    dessert: [
      {
        id: 5,
        name: "Яблочный пирог с карамелью",
        description:
          "Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.",
        image_url: "/public/images/меню-картинка.png",
      },
      {
        id: 6,
        name: "Фруктовое мороженое",
        description: "Натуральное мороженое из свежих фруктов без сахара.",
        image_url: "/public/images/wwwwww.png",
      },
    ],
  };
}

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
  ];
}

export default MenuPage;
