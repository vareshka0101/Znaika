import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Alert,
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
  FaUserCircle,
  FaCog,
  FaUtensils,
  FaNewspaper,
  FaCalendarAlt,
} from "react-icons/fa";
import { api } from "../services/api";
import styles from "./NavbarComponent.module.css";

const NavbarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setErrors({});
    setLoginForm({ email: "", password: "" });
    setRegisterForm({
      name: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleShow = () => setShowModal(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await api.login(loginForm);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      handleClose();
      alert(`Добро пожаловать, ${response.user.name}!`);
    } catch (error) {
      setErrors({ login: "Неверный email или пароль" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrors({ register: "Пароли не совпадают" });
      setLoading(false);
      return;
    }

    try {
      const response = await api.register({
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        childName: registerForm.childName,
        childAge: registerForm.childAge,
        password: registerForm.password,
        password_confirmation: registerForm.confirmPassword,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      handleClose();
      alert(`Регистрация успешна! Добро пожаловать, ${response.user.name}!`);
    } catch (error) {
      if (error.errors) {
        setErrors({ register: Object.values(error.errors).flat()[0] });
      } else {
        setErrors({ register: "Ошибка при регистрации" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      alert("Вы вышли из системы");
    }
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
              style={{
                width: "45px",
                marginBottom: "10px",
              }}
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
                {user ? (
                  <div className="d-flex align-items-center">
                    <NavDropdown
                      title={
                        <span className={styles.userMenu}>
                          <FaUserCircle className="me-1" />
                          {user.name}
                        </span>
                      }
                      id="user-dropdown"
                      className={styles.userDropdown}
                      align="end"
                    >
                      <NavDropdown.Item onClick={handleLogout}>
                        <FaLock className="me-2" /> Выйти
                      </NavDropdown.Item>
                    </NavDropdown>

                    {user.role === "admin" && (
                      <NavDropdown
                        title={
                          <span className={styles.adminMenu}>
                            <FaCog className="me-1" />
                            Админ
                          </span>
                        }
                        id="admin-dropdown"
                        className={`${styles.adminDropdown} ms-2`}
                        align="end"
                      >
                        <NavDropdown.Item
                          onClick={() => navigate("/admin/news")}
                        >
                          <FaNewspaper className="me-2" /> Новости
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/admin/events")}
                        >
                          <FaCalendarAlt className="me-2" /> События
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/admin/menu")}
                        >
                          <FaUtensils className="me-2" /> Меню
                        </NavDropdown.Item>
                        {/* Добавлен пункт Отзывы */}
                        <NavDropdown.Item
                          onClick={() => navigate("/admin/reviews")}
                        >
                          <FaStar
                            className="me-2"
                            style={{ color: "#ffc107" }}
                          />{" "}
                          Отзывы
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className={`rounded-pill px-4 py-2 ${styles.loginButton}`}
                  >
                    <FaStar className="me-1" /> Войти
                  </Button>
                )}
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
                {errors.login && (
                  <Alert variant="danger" className="text-center">
                    {errors.login}
                  </Alert>
                )}
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.inputIcon} />
                    <Form.Control
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
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
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      placeholder="Введите пароль"
                      required
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 rounded-pill py-2 ${styles.submitButton}`}
                  disabled={loading}
                >
                  {loading ? "Вход..." : "Войти"}
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="register" title="Регистрация">
              <Form onSubmit={handleRegister} className={styles.authForm}>
                {errors.register && (
                  <Alert variant="danger" className="text-center">
                    {errors.register}
                  </Alert>
                )}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Имя</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaUser className={styles.inputIcon} />
                    <Form.Control
                      type="text"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
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
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
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
                      name="phone"
                      value={registerForm.phone}
                      onChange={handleRegisterChange}
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
                      name="childName"
                      value={registerForm.childName}
                      onChange={handleRegisterChange}
                      placeholder="Введите имя ребенка"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formChildAge">
                  <Form.Label>Возраст ребенка</Form.Label>
                  <Form.Select
                    name="childAge"
                    value={registerForm.childAge}
                    onChange={handleRegisterChange}
                    className={styles.selectInput}
                    required
                  >
                    <option value="">Выберите возраст</option>
                    <option value="3 года">3 года</option>
                    <option value="4 года">4 года</option>
                    <option value="5 лет">5 лет</option>
                    <option value="6 лет">6 лет</option>
                    <option value="7 лет">7 лет</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordReg">
                  <Form.Label>Пароль</Form.Label>
                  <div className={styles.inputGroup}>
                    <FaLock className={styles.inputIcon} />
                    <Form.Control
                      type="password"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      placeholder="Создайте пароль (минимум 8 символов)"
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
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="Подтвердите пароль"
                      required
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 rounded-pill py-2 ${styles.submitButton}`}
                  disabled={loading}
                >
                  {loading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
