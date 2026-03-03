import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaClock,
  FaStar,
  FaVk,
  FaOdnoklassniki,
  FaTelegramPlane,
  FaWhatsapp,
  FaRegBuilding,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    alert("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <NavbarComponent />

      <div className={styles.heroImage}>
        <img src="/public/images/здание.jpg" alt="Декоративная картинка" />
      </div>

      <section className="py-5">
        <Container>
          <h1
            className={`display-4 text-center mb-2 ${styles.pageTitle}`}
            data-aos="fade-down"
          >
            Контактная информация
          </h1>
          <p
            className="text-center text-muted mb-5"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Мы всегда рады ответить на ваши вопросы и принять вас в нашем саду
          </p>

          <Row className="g-4 mb-5">
            <Col md={6} data-aos="fade-right">
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <FaBuilding />
                </div>
                <h3 className="mb-4">Офис</h3>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt />
                  <p>ул. Весенняя, 15, Москва, Россия, 123456</p>
                </div>
                <div className={styles.contactItem}>
                  <FaPhoneAlt />
                  <p>+7 (495) 666-33-99</p>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <p>info@znaika.ru</p>
                </div>
              </div>
            </Col>

            <Col md={6} data-aos="fade-left">
              <div className={styles.contactCard}>
                <div
                  className={`${styles.contactIcon} ${styles.secondaryIcon}`}
                >
                  <FaUsers />
                </div>
                <h3 className="mb-4">Руководство</h3>
                <div className={styles.contactItem}>
                  <FaUserTie />
                  <p>Директор: Елена Васильева</p>
                </div>
                <div className={styles.contactItem}>
                  <FaPhoneAlt />
                  <p>+7 (495) 666-33-99 (доб. 101)</p>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <p>director@znaika.ru</p>
                </div>
                <div className={styles.contactItem}>
                  <FaClock />
                  <p>Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col xs={12}>
              <h2
                className={`display-5 text-center mb-4 ${styles.sectionTitle}`}
                data-aos="fade-up"
              >
                Как нас найти
              </h2>
              <div className={styles.mapContainer} data-aos="zoom-in">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.373241239647!2d37.6184!3d55.7512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzA0LjQiTiAzN8KwMzcnMDYuNCJF!5e0!3m2!1sru!2sru!4v1234567890!5m2!1sru!2sru"
                  allowFullScreen
                  loading="lazy"
                  title="Карта проезда"
                ></iframe>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={8}>
              <div className={styles.contactForm} data-aos="fade-up">
                <h2
                  className={`display-5 text-center mb-4 ${styles.formTitle}`}
                >
                  Свяжитесь с нами
                </h2>
                <p className="text-center text-muted mb-4">
                  Воспользуйтесь формой ниже, чтобы связаться с нами. Мы ответим
                  в ближайшее время!
                </p>

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
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
                    <Col md={6}>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ваш email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Номер телефона"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Тема сообщения"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={4}
                        placeholder="Ваше сообщение"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col xs={12} className="text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className={`px-5 py-3 ${styles.submitButton}`}
                      >
                        ОТПРАВИТЬ
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={12}>
              <div className={styles.infoBlock} data-aos="fade-up">
                <p className="fs-5 mb-0">
                  <FaPhoneAlt
                    className="me-2"
                    style={{ color: "var(--primary)" }}
                  />
                  Есть вопросы? Звоните: <strong>+7 (495) 666-33-99</strong>
                  <span className="mx-3">|</span>
                  <FaEnvelope
                    className="me-2"
                    style={{ color: "var(--primary)" }}
                  />
                  Пишите: <strong>hello@znaika.ru</strong>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default ContactsPage;
