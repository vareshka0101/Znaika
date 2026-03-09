import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaSearch, FaSmile } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavbarComponent />

      <section className={styles.notFoundSection}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8} xl={6}>
              <div className={styles.errorContent} data-aos="fade-down">
                <h1 className={styles.errorCode}>404</h1>

                <div
                  className={styles.errorImage}
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <img
                    src="/public/images/404-illustration.png"
                    alt="Страница не найдена"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                </div>

                <h2
                  className={styles.errorTitle}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Ой! Страница не найдена
                </h2>

                <p
                  className={styles.errorMessage}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Кажется, мы не можем найти страницу, которую вы ищете.
                  Возможно, она была перемещена или удалена.
                </p>

                <div
                  className={styles.errorSuggestions}
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <p className={styles.suggestionTitle}>Попробуйте:</p>
                  <ul className={styles.suggestionList}>
                    <li>
                      <FaSearch className={styles.suggestionIcon} />
                      Проверить правильность введенного адреса
                    </li>
                    <li>
                      <FaArrowLeft className={styles.suggestionIcon} />
                      Вернуться на предыдущую страницу
                    </li>
                    <li>
                      <FaHome className={styles.suggestionIcon} />
                      Перейти на главную страницу
                    </li>
                  </ul>
                </div>

                <div
                  className={styles.actionButtons}
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <Button
                    variant="outline-primary"
                    onClick={handleGoBack}
                    className={`${styles.actionButton} ${styles.backButton} me-3`}
                  >
                    <FaArrowLeft className="me-2" /> Назад
                  </Button>

                  <Button
                    as={Link}
                    to="/"
                    variant="primary"
                    className={`${styles.actionButton} ${styles.homeButton}`}
                  >
                    <FaHome className="me-2" /> На главную
                  </Button>
                </div>

                <div
                  className={styles.helpSection}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <p className={styles.helpText}>
                    <FaSmile className={styles.helpIcon} />
                    Если вы считаете, что это ошибка, свяжитесь с нами:
                  </p>
                  <div className={styles.helpLinks}>
                    <Link to="/contacts" className={styles.helpLink}>
                      Контакты
                    </Link>
                    <span className={styles.separator}>|</span>
                    <a href="tel:+74956663399" className={styles.helpLink}>
                      +7 (495) 666-33-99
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Рекомендуемые разделы */}
      <section className={styles.recommendedSection}>
        <Container>
          <h3 className={styles.recommendedTitle} data-aos="fade-up">
            Возможно, вас заинтересует:
          </h3>
          <Row className="g-4" data-aos="fade-up" data-aos-delay="200">
            <Col md={3} sm={6}>
              <Link to="/about" className={styles.recommendedCard}>
                <div className={styles.recommendedIcon}>🏫</div>
                <h4>О нас</h4>
                <p>Узнайте больше о нашем детском саде</p>
              </Link>
            </Col>
            <Col md={3} sm={6}>
              <Link to="/classes" className={styles.recommendedCard}>
                <div className={styles.recommendedIcon}>📚</div>
                <h4>Классы</h4>
                <p>Наши образовательные программы</p>
              </Link>
            </Col>
            <Col md={3} sm={6}>
              <Link to="/menu" className={styles.recommendedCard}>
                <div className={styles.recommendedIcon}>🍎</div>
                <h4>Меню</h4>
                <p>Вкусное и полезное питание</p>
              </Link>
            </Col>
            <Col md={3} sm={6}>
              <Link to="/events" className={styles.recommendedCard}>
                <div className={styles.recommendedIcon}>🎉</div>
                <h4>Мероприятия</h4>
                <p>События и праздники</p>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default NotFoundPage;
