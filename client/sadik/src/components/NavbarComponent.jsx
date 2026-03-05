import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Modal,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaVk,
  FaOdnoklassniki,
  FaTelegramPlane,
  FaEnvelope,
  FaLock,
  FaUser,
  FaChild,
} from "react-icons/fa";
import styles from "./NavbarComponent.module.css";

const NavbarComponent = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Здесь будет логика входа
    console.log("Вход в систему");
    handleClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Здесь будет логика регистрации
    console.log("Регистрация");
    handleClose();
  };

  return (
    <>
      <div className={styles.topBar}>
        <Container className="d-flex flex-wrap justify-content-between align-items-center">
          <div className={styles.contactInfo}>
            <div>
              <FaMapMarkerAlt /> ул. Весенняя, 15, г.Москва
            </div>
            <div>
              <FaPhoneAlt /> +7 (495) 666-33-99
            </div>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
              <FaVk />
            </a>
            <a href="https://ok.ru/" target="_blank" rel="noopener noreferrer">
              <FaOdnoklassniki />
            </a>
            <a
              href="https://t.me/znaika_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </Container>
      </div>

      <Navbar
        expand="lg"
        className={`sticky-top ${styles.mainNavbar}`}
        bg="white"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.brand}>
            Знайка
            <img
              src="/public/images/Без имени-1.png"
              style={{ width: "45px", marginBottom: "10px" }}
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarMain" />
          <Navbar.Collapse id="navbarMain">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={location.pathname === "/" ? styles.active : ""}
              >
                Главная
              </Nav.Link>

              <NavDropdown
                title="Страницы"
                id="pages-dropdown"
                className={`${styles.dropdown} ${
                  location.pathname.includes("/about") ? styles.active : ""
                }`}
              >
                <NavDropdown.Item as={Link} to="/about">
                  О нас
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/menu">
                  Меню
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/teachers">
                  Преподаватели
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/prices">
                  Тарифы и цены
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/gallery">
                  Галерея
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Классы"
                id="classes-dropdown"
                className={styles.dropdown}
              >
                <NavDropdown.Item as={Link} to="/classes">
                  Классы
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/programs">
                  Программы
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Мероприятия"
                id="events-dropdown"
                className={styles.dropdown}
              >
                <NavDropdown.Item as={Link} to="/events">
                  События
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                as={Link}
                to="/parent-club"
                className={
                  location.pathname === "/parent-club" ? styles.active : ""
                }
              >
                Родительский клуб
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/contacts"
                className={
                  location.pathname === "/contacts" ? styles.active : ""
                }
              >
                Контакты
              </Nav.Link>

              <Nav.Link className="ms-lg-3">
                <Button
                  variant="primary"
                  onClick={handleShow}
                  className={`rounded-pill px-4 py-2 ${styles.loginButton}`}
                >
                  <FaStar className="me-1" /> Войти
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className={styles.authModal}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            {activeTab === "login" ? "Вход в личный кабинет" : "Регистрация"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className={styles.authTabs}
            fill
          >
            <Tab eventKey="login" title="Вход">
              <Form onSubmit={handleLogin} className={styles.authForm}>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.inputIcon} />
                    <Form.Control
                      type="email"
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Пароль</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaLock className={styles.inputIcon} />
                    <Form.Control
                      type="password"
                      placeholder="Введите пароль"
                      required
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" label="Запомнить меня" />
                  <Link to="/forgot-password" className={styles.forgotLink}>
                    Забыли пароль?
                  </Link>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 rounded-pill py-2 ${styles.submitButton}`}
                >
                  Войти
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="register" title="Регистрация">
              <Form onSubmit={handleRegister} className={styles.authForm}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Имя</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaUser className={styles.inputIcon} />
                    <Form.Control
                      type="text"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmailReg">
                  <Form.Label>Email</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.inputIcon} />
                    <Form.Control
                      type="email"
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Телефон</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaPhoneAlt className={styles.inputIcon} />
                    <Form.Control
                      type="tel"
                      placeholder="+7 (999) 999-99-99"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formChildName">
                  <Form.Label>Имя ребенка</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaChild className={styles.inputIcon} />
                    <Form.Control
                      type="text"
                      placeholder="Введите имя ребенка"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formChildAge">
                  <Form.Label>Возраст ребенка</Form.Label>
                  <Form.Select className={styles.selectInput}>
                    <option>Выберите возраст</option>
                    <option>3 года</option>
                    <option>4 года</option>
                    <option>5 лет</option>
                    <option>6 лет</option>
                    <option>7 лет</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordReg">
                  <Form.Label>Пароль</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaLock className={styles.inputIcon} />
                    <Form.Control
                      type="password"
                      placeholder="Создайте пароль"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label>Подтверждение пароля</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaLock className={styles.inputIcon} />
                    <Form.Control
                      type="password"
                      placeholder="Подтвердите пароль"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={
                      <>
                        Я согласен с{" "}
                        <Link to="/terms">условиями использования</Link> и{" "}
                        <Link to="/privacy">политикой конфиденциальности</Link>
                      </>
                    }
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 rounded-pill py-2 ${styles.submitButton}`}
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Tab>
          </Tabs>

          <div className={styles.socialAuth}>
            <p className={styles.socialAuthText}>или войдите через</p>
            <div className={styles.socialButtons}>
              <Button variant="outline-primary" className={styles.socialButton}>
                <FaVk /> ВКонтакте
              </Button>
              <Button variant="outline-primary" className={styles.socialButton}>
                <FaOdnoklassniki /> Одноклассники
              </Button>
              <Button variant="outline-primary" className={styles.socialButton}>
                <FaTelegramPlane /> Telegram
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
