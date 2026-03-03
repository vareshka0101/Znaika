import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaVk,
  FaOdnoklassniki,
  FaTelegramPlane,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./FooterComponent.module.css";

const FooterComponent = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="gy-5">
          <Col md={3}>
            <h5 className={styles.footerTitle}>Знайка</h5>
            <p className={styles.footerSubtitle}>частный детский сад</p>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/about">О нас</Link>
              </li>
              <li>
                <Link to="/enrollment">Зачисление</Link>
              </li>
              <li>
                <Link to="/events">Мероприятия</Link>
              </li>
              <li>
                <Link to="/contacts">Контакты</Link>
              </li>
              <li>
                <Link to="/reviews">Отзывы</Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className={styles.footerTitle}>Страницы</h5>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/about">О нас</Link>
              </li>
              <li>
                <Link to="/menu">Меню</Link>
              </li>
              <li>
                <Link to="/teachers">Преподаватели</Link>
              </li>
              <li>
                <Link to="/prices">Тарифы и цены</Link>
              </li>
              <li>
                <Link to="/gallery">Галерея</Link>
              </li>
              <li>
                <Link to="/reviews">Отзывы</Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className={styles.footerTitle}>Классы</h5>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/classes">Классы</Link>
              </li>
              <li>
                <Link to="/programs">Программы</Link>
              </li>
              <li>
                <Link to="/schedule">Расписание</Link>
              </li>
              <li>
                <Link to="/teachers">Преподаватели</Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className={styles.footerTitle}>Мы в сети</h5>
            <div className={styles.footerSocial}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaVk />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaOdnoklassniki />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
            <div className={styles.footerContact}>
              <p>
                <FaMapMarkerAlt /> ул. Весенняя, 15, г.Москва
              </p>
              <p>
                <FaPhoneAlt /> +7 (495) 666-33-99
              </p>
              <p>
                <FaEnvelope /> hello@znaika.ru
              </p>
            </div>
          </Col>
        </Row>
        <hr className={styles.footerHr} />
        <div className={styles.footerBottom}>
          <span>© 2026 Знайка. Все права защищены.</span>
          <span className={styles.footerLicense}>
            Лицензия № 123456 от 01.01.2024
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;
