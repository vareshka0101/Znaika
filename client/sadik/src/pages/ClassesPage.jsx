import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import {
  FaCubes,
  FaBookOpen,
  FaBed,
  FaUtensils,
  FaFutbol,
  FaMusic,
  FaPaintBrush,
  FaPenFancy,
  FaLeaf,
  FaCouch,
  FaChild,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./ClassesPage.module.css";

const ClassesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showExcursionModal, setShowExcursionModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({ src: "", title: "" });

  const [excursionForm, setExcursionForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    preferredDate: "",
    message: "",
  });

  const rooms = [
    {
      id: 1,
      title: "Игровая комната",
      description:
        "Просторное помещение с развивающими игрушками, конструкторами и зонами для сюжетно-ролевых игр",
      image: "/public/images/игровая.jpg",
      icon: FaCubes,
      delay: 100,
      marginTop: 0,
      marginBottom: 0,
    },
    {
      id: 2,
      title: "Учебный класс",
      description:
        "Светлая аудитория с современной мебелью, интерактивной доской и учебными материалами",
      image: "/public/images/учебный.jpg",
      icon: FaBookOpen,
      delay: 150,
      marginTop: 20,
      marginBottom: 0,
    },
    {
      id: 3,
      title: "Спальня",
      description:
        "Уютная комната для дневного сна с удобными кроватками и спокойной атмосферой",
      image: "/public/images/спальня.jpg",
      icon: FaBed,
      delay: 200,
      marginTop: 0,
      marginBottom: 20,
    },
    {
      id: 4,
      title: "Столовая",
      description:
        "Светлая столовая с удобной мебелью, где дети получают вкусное и полезное питание",
      image: "/public/images/столовая.jpg",
      icon: FaUtensils,
      delay: 250,
      marginTop: 0,
      marginBottom: 0,
    },
    {
      id: 5,
      title: "Спортивный зал",
      description:
        "Зал для физкультуры с мягким покрытием, шведскими стенками и спортивным инвентарем",
      image: "/public/images/спортзал.jpg",
      icon: FaFutbol,
      delay: 300,
      marginTop: 30,
      marginBottom: 0,
    },
    {
      id: 6,
      title: "Музыкальный класс",
      description:
        "Помещение для занятий музыкой с фортепиано, детскими музыкальными инструментами",
      image: "/public/images/музык.jpg",
      icon: FaMusic,
      delay: 350,
      marginTop: 0,
      marginBottom: 30,
    },
    {
      id: 7,
      title: "Художественная мастерская",
      description:
        "Творческое пространство для рисования, лепки и поделок с большим выбором материалов",
      image: "/public/images/изо.jpg",
      icon: FaPaintBrush,
      delay: 400,
      marginTop: 0,
      marginBottom: 0,
    },
    {
      id: 8,
      title: "Каллиграфия",
      description:
        "Специализированный класс для обучения красивому письму с китайской методикой",
      image: "/public/images/калиграфия.jpg",
      icon: FaPenFancy,
      delay: 450,
      marginTop: 40,
      marginBottom: 0,
    },
    {
      id: 9,
      title: "Зимний сад",
      description:
        "Озелененное пространство для отдыха и знакомства с природой, ухода за растениями",
      image: "/public/images/зимний сад.png",
      icon: FaLeaf,
      delay: 500,
      marginTop: 0,
      marginBottom: 40,
    },
    {
      id: 10,
      title: "Зона ожидания",
      description:
        "Уютное пространство для родителей с информационными стендами и комфортными диванами",
      image: "/public/images/зал ожидания.jpg",
      icon: FaCouch,
      delay: 550,
      marginTop: 0,
      marginBottom: 0,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const handlePhotoClick = (room) => {
    setSelectedPhoto({ src: room.image, title: room.title });
    setShowModal(true);
  };

  const handleExcursionClick = () => {
    setShowExcursionModal(true);
  };

  const handleExcursionInputChange = (e) => {
    const { name, value } = e.target;
    setExcursionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExcursionSubmit = (e) => {
    e.preventDefault();
    console.log("Excursion form submitted:", excursionForm);
    alert(
      "Спасибо за запись на экскурсию! Мы свяжемся с вами для подтверждения даты и времени.",
    );
    setExcursionForm({
      parentName: "",
      phone: "",
      email: "",
      preferredDate: "",
      message: "",
    });
    setShowExcursionModal(false);
  };

  return (
    <>
      <NavbarComponent />

      <section className={styles.classesSection}>
        <Container>
          <Row className="g-4">
            <Col xs={12}>
              <div className={styles.headerBlock} data-aos="zoom-in">
                <h1
                  className={`display-4 text-center  ${styles.pageTitle}`}
                  data-aos="fade-down"
                >
                  Наши классы и игровые пространства
                </h1>
                <p className={`fs-5 text-center ${styles.headerDescription}`}>
                  Каждое помещение в нашем саду продумано до мелочей: безопасные
                  материалы, эргономичная мебель, много света и воздуха. Мы
                  создали среду, которая вдохновляет детей на игру, творчество и
                  познание. Приходите посмотреть лично — мы всегда рады гостям!
                </p>
              </div>
            </Col>
          </Row>

          <Row className={`g-4  mt-4${styles.roomsGrid}`}>
            {rooms.map((room) => (
              <Col
                key={room.id}
                md={6}
                lg={4}
                data-aos="fade-up"
                data-aos-delay={room.delay}
              >
                <div
                  className={`${styles.roomCard} ${
                    room.marginTop ? styles[`mt${room.marginTop}`] : ""
                  } ${
                    room.marginBottom ? styles[`mb${room.marginBottom}`] : ""
                  }`}
                  onClick={() => handlePhotoClick(room)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePhotoClick(room);
                    }
                  }}
                >
                  <div className={styles.roomImg}>
                    <img src={room.image} alt={room.title} loading="lazy" />
                  </div>
                  <div className={styles.roomContent}>
                    <div className={styles.roomIcon}>
                      <room.icon />
                    </div>
                    <h3 className={styles.roomTitle}>{room.title}</h3>
                    <p className={styles.roomDesc}>{room.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className={styles.ctaBlock} data-aos="zoom-in">
            <h2 className="display-5 mb-3">
              Хотите увидеть наши классы лично?
            </h2>
            <p className="fs-5 mb-4">
              Запишитесь на экскурсию и познакомьтесь с садом поближе
            </p>

            <Button
              variant="primary"
              size="lg"
              className={styles.excursionButton}
              onClick={handleExcursionClick}
            >
              Записаться на экскурсию
            </Button>
          </div>
        </Container>
      </section>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        dialogClassName={styles.photoModal}
      >
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            {selectedPhoto.title}
          </Modal.Title>
          <button
            className={styles.modalCloseBtn}
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body className="p-0 text-center">
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="rounded-pill"
            style={{ background: "#58b4ae", borderColor: "#58b4ae" }}
          >
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExcursionModal}
        onHide={() => setShowExcursionModal(false)}
        size="lg"
        centered
        dialogClassName={styles.excursionModal}
      >
        <Modal.Header closeButton className={styles.excursionModalHeader}>
          <Modal.Title as="h3" className={styles.excursionModalTitle}>
            <FaChild className="me-2" style={{ color: "#58b4ae" }} />
            Запись на экскурсию
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted mb-4">
            Заполните форму, и мы свяжемся с вами для выбора удобного времени
            экскурсии
          </p>
          <Form onSubmit={handleExcursionSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ваше имя *</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    placeholder="Иванов Иван"
                    value={excursionForm.parentName}
                    onChange={handleExcursionInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Телефон *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={excursionForm.phone}
                    onChange={handleExcursionInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ivan@example.com"
                    value={excursionForm.email}
                    onChange={handleExcursionInputChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Дополнительная информация</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    placeholder="Ваши пожелания или вопросы"
                    value={excursionForm.message}
                    onChange={handleExcursionInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Я согласен на обработку персональных данных"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="text-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  className="px-5 py-3"
                  style={{
                    borderRadius: "40px",
                    backgroundColor: "#58b4ae",
                    borderColor: "#58b4ae",
                  }}
                >
                  Отправить заявку
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default ClassesPage;
