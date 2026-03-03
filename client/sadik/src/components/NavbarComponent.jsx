import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaVk,
  FaOdnoklassniki,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./NavbarComponent.module.css";

const NavbarComponent = () => {
  const location = useLocation();

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
              href="https://web.telegram.org/k/"
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

              <Nav.Link as={Link} to="/login" className="ms-lg-3">
                <Button
                  variant="primary"
                  className={`rounded-pill px-4 py-2 ${styles.loginButton}`}
                >
                  <FaStar className="me-1" /> Войти
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
