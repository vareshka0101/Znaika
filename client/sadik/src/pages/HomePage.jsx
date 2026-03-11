import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  Modal,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import {
  FaSmile,
  FaPuzzlePiece,
  FaSeedling,
  FaBookOpen,
  FaUtensils,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaEye,
  FaUsers,
  FaStar,
  FaChild,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import AddReviewModal from "../components/AddReviewModal";
import BookingButtons from "../components/BookingButtons";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const classesScrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [registrationForm, setRegistrationForm] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    preferredClass: "",
    message: "",
  });

  const [simpleForm, setSimpleForm] = useState({
    phone: "",
    name: "",
    message: "",
  });

  const fallbackTestimonials = [
    {
      id: 1,
      text: "Ребёнок бежит в сад каждое утро! Очень довольны программой и чуткими воспитателями. Знайка — наша вторая семья.",
      author: "Анна, мама Тимофея",
      rating: 5,
    },
    {
      id: 2,
      text: "После года в Знайке сын научился читать и считать, а главное — появилась тяга к знаниям. Спасибо команде!",
      author: "Игорь, папа Миши",
      rating: 5,
    },
    {
      id: 3,
      text: "Очень уютная атмосфера, ребёнок всегда с радостью рассказывает, как прошёл день. Отдельное спасибо за вкусное питание!",
      author: "Елена, мама Киры",
      rating: 4,
    },
    {
      id: 4,
      text: "Воспитатели настоящие профессионалы! Ребёнок с удовольствием ходит в сад, участвует во всех мероприятиях. Рекомендую!",
      author: "Дмитрий, папа Сони",
      rating: 5,
    },
    {
      id: 5,
      text: "Отличный сад! Ребёнок всегда сыт, доволен, занятия интересные. Особенно нравится подход к развитию речи.",
      author: "Светлана, мама Артёма",
      rating: 5,
    },
  ];

  const [allTestimonials, setAllTestimonials] = useState(fallbackTestimonials);

  const newsData = [
    {
      id: 1,
      title: "Преимущества игрового обучения для детей дошкольного возраста",
      date: "2026-02-10",
      image: "/public/images/новость1.jpg",
      views: 245,
      excerpt:
        "Исследования показывают, что дети лучше усваивают материал через игру. В нашей статье рассказываем о методиках игрового обучения...",
    },
    {
      id: 2,
      title: "Создание безопасной и инклюзивной среды в детском саду",
      date: "2026-03-15",
      image: "/public/images/новость2.jpg",
      views: 189,
      excerpt:
        "Как сделать детский сад комфортным для каждого ребенка, включая детей с особенностями развития...",
    },
    {
      id: 3,
      title: "Советы по питанию для здоровых перекусов",
      date: "2026-02-22",
      image: "/public/images/новость 3.jpg",
      views: 312,
      excerpt:
        "Простые и полезные рецепты перекусов, которые понравятся детям и сэкономят время родителям...",
    },
    {
      id: 4,
      title: "Идеи для творческих проектов в детском саду",
      date: "2026-03-26",
      image: "/public/images/новость4.jpg",
      views: 156,
      excerpt:
        "Вдохновляющие идеи для поделок и творческих занятий с детьми от 3 до 6 лет...",
    },
  ];

  const classesData = [
    {
      id: 1,
      title: "Урок Каллиграфии",
      age: "4-6 лет",
      students: 10,
      price: 750,
      icon: "fa-om",
      color: "#58b4ae",
    },
    {
      id: 2,
      title: "Художественный класс",
      age: "3-6 лет",
      students: 10,
      price: 650,
      icon: "fa-paint-brush",
      color: "#ff8a5c",
    },
    {
      id: 3,
      title: "Английский язык",
      age: "3-6 лет",
      students: 10,
      price: 550,
      icon: "fa-book",
      color: "#ffd665",
    },
    {
      id: 4,
      title: "Класс танцев",
      age: "3-7 лет",
      students: 12,
      price: 600,
      icon: "fa-music",
      color: "#f6abb6",
    },
    {
      id: 5,
      title: "Театральная студия",
      age: "4-7 лет",
      students: 10,
      price: 700,
      icon: "fa-theater-masks",
      color: "#58b4ae",
    },
    {
      id: 6,
      title: "Робототехника",
      age: "5-7 лет",
      students: 8,
      price: 800,
      icon: "fa-robot",
      color: "#58b4ae",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    fetchApprovedReviews();
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/reviews");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setAllTestimonials(data);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const [formErrors, setFormErrors] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleFieldBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name, registrationForm[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "parentName":
        if (!value.trim()) error = "Введите ваше имя";
        break;
      case "childName":
        if (!value.trim()) error = "Введите имя ребенка";
        break;
      case "childAge":
        if (!value) error = "Выберите возраст ребенка";
        break;
      case "phone":
        if (!value.trim()) error = "Введите номер телефона";
        else if (!/^[+]?[0-9\s-()]{10,}$/.test(value))
          error = "Введите корректный номер телефона";
        break;
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Введите корректный email";
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const scrollLeft = () => {
    classesScrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    classesScrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({ ...prev, [name]: value }));
    if (touchedFields[name]) {
      validateField(name, value);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(registrationForm).forEach((key) => {
      if (
        key === "parentName" ||
        key === "childName" ||
        key === "childAge" ||
        key === "phone"
      ) {
        const error = validateField(key, registrationForm[key]);
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setTouchedFields({
        parentName: true,
        childName: true,
        childAge: true,
        phone: true,
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(registrationForm),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
        setRegistrationForm({
          parentName: "",
          childName: "",
          childAge: "",
          phone: "",
          email: "",
          preferredClass: "",
          message: "",
        });
        setTouchedFields({});
        setFormErrors({});
        setShowRegistrationModal(false);
      } else {
        alert("Ошибка: " + (data.message || "Не удалось отправить заявку"));
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения с сервером");
    }
  };

  const handleSimpleFormChange = (e) => {
    const { name, value } = e.target;
    setSimpleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpleFormSubmit = (e) => {
    e.preventDefault();
    setRegistrationForm({
      ...registrationForm,
      parentName: simpleForm.name,
      phone: simpleForm.phone,
      message: simpleForm.message,
    });
    setShowRegistrationModal(true);
    setSimpleForm({ phone: "", name: "", message: "" });
  };

  const handleAddReview = async (newReview) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          author: newReview.author,
          child_name: newReview.childName,
          text: newReview.text,
          rating: newReview.rating,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Спасибо за отзыв! После модерации он появится на сайте.");
      } else {
        alert("Ошибка: " + (data.message || "Не удалось отправить отзыв"));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Ошибка соединения с сервером");
    }
  };

  const openRegistrationModal = () => setShowRegistrationModal(true);
  const handleExcursionClick = () => navigate("/classes");

  const goToNewsPage = () => {
    navigate("/news");
  };

  return (
    <>
      <NavbarComponent />

      {error && (
        <Container className="mt-3">
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        </Container>
      )}

      <section className={styles.heroSection} data-aos="fade-down">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h1
                className={styles.heroTitle}
                data-aos="fade-right"
                data-aos-delay="200"
              >
                Где игра сочетается <span>с ростом</span>
              </h1>
              <p
                className={`fs-4 my-4 ${styles.heroSubtitle}`}
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <FaSmile className="text-primary me-2" />
                Философия "Знайки" — радость и развитие каждый день
              </p>
              <BookingButtons
                onBookingClick={openRegistrationModal}
                onExcursionClick={handleExcursionClick}
                data-aos="fade-right"
                data-aos-delay="600"
              />
            </Col>
            <Col lg={6} data-aos="fade-left" data-aos-delay="400">
              <img
                src="https://i.pinimg.com/736x/9a/65/c2/9a65c2465dfc872c9673d7c2492a21e0.jpg"
                alt="дети играют"
                className={`img-fluid ${styles.heroImage}`}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="text-center g-4">
            {[
              {
                icon: <FaPuzzlePiece />,
                title: "Игровая среда",
                color: styles.bgCoral,
                delay: 100,
              },
              {
                icon: <FaSeedling />,
                title: "Философия Знайки",
                color: styles.bgTurq,
                delay: 200,
              },
              {
                icon: <FaBookOpen />,
                title: "Учебная программа",
                color: styles.bgGold,
                delay: 300,
              },
              {
                icon: <FaUtensils />,
                title: "Кухня шеф-повара",
                color: styles.bgRose,
                delay: 400,
              },
            ].map((item, idx) => (
              <Col
                md={3}
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={item.delay}
              >
                <Link
                  to="#"
                  className={`${styles.categoryCircle} ${item.color} mx-auto`}
                >
                  {item.icon}
                </Link>
                <h4>{item.title}</h4>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className={`py-5 ${styles.bgSoftGreen}`}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right">
              <h2 className="display-4">
                Учебная программа для маленьких исследователей
              </h2>
              <p className="lead">
                Развитие речи, математика, творчество, музыка — каждый день
                наполнен открытиями.
              </p>
              <ul className={styles.listCheck}>
                {[
                  "Английский с носителем",
                  "LEGO-конструирование",
                  "Робототехника",
                  "Каллиграфия",
                  "Класс танцев",
                  "Театральная студия",
                ].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Col>
            <Col md={6} data-aos="fade-left" data-aos-delay="200">
              <img
                src="https://i.pinimg.com/1200x/e3/95/71/e3957129fff4cf4354d20340ae753f70.jpg"
                className="img-fluid rounded-5 shadow"
                alt="дети на занятии"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="display-4 text-center mb-5" data-aos="fade-up">
            Сердце нашего детского сада
          </h2>
          <Row className="g-4">
            {[
              {
                img: "/public/images/4.jpg",
                name: "Елена Петрова",
                role: "педагог раннего развития",
                delay: 100,
              },
              {
                img: "/public/images/3.jpg",
                name: "Наталия Соколова",
                role: "музыкальный руководитель",
                delay: 200,
              },
              {
                img: "/public/images/1.jpg",
                name: "Анна Васильева",
                role: "художник-педагог",
                delay: 300,
              },
              {
                img: "/public/images/2.jpg",
                name: "Ольга Миронова",
                role: "психолог",
                delay: 400,
              },
            ].map((teacher, idx) => (
              <Col
                md={3}
                className="text-center"
                key={idx}
                data-aos="flip-left"
                data-aos-delay={teacher.delay}
              >
                <img
                  src={teacher.img}
                  className={`rounded-circle mb-3 ${styles.teacherImg}`}
                  alt="teacher"
                />
                <h4>{teacher.name}</h4>
                <p className="text-secondary">{teacher.role}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className={`py-5 ${styles.bgLight}`}>
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="display-4" data-aos="fade-up">
              Истории успеха родителей
            </h2>
            <Button
              variant="excursion"
              size="lg"
              className="mt-3 px-3"
              style={{ background: "#97d6d2", color: "black" }}
              onClick={() => setShowReviewModal(true)}
              data-aos="fade-left"
            >
              <FaStar className="me-2" /> Оставить отзыв
            </Button>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            {allTestimonials.length > 0 ? (
              <Carousel indicators className={styles.testimonialCarousel}>
                {Array.from({
                  length: Math.ceil(allTestimonials.length / 2),
                }).map((_, index) => (
                  <Carousel.Item key={index}>
                    <Row className="g-4">
                      {allTestimonials
                        .slice(index * 2, index * 2 + 2)
                        .map((testimonial) => (
                          <Col md={6} key={testimonial.id}>
                            <div className={styles.testimonialCard}>
                              <div className="d-flex justify-content-between mb-3">
                                <FaQuoteLeft
                                  className={`fa-3x ${styles.quoteIcon}`}
                                />
                                {testimonial.rating && (
                                  <div className={styles.testimonialRating}>
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={
                                          i < testimonial.rating
                                            ? styles.starFilled
                                            : styles.starEmpty
                                        }
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                              <p className="fs-5">"{testimonial.text}"</p>
                              <small className="text-secondary d-block">
                                {testimonial.author}
                              </small>
                            </div>
                          </Col>
                        ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p className="text-center text-muted">
                Пока нет отзывов. Будьте первым!
              </p>
            )}
          </div>
        </Container>
      </section>

      <Container>
        <div
          className={`text-center my-5 p-5 ${styles.ctaBlock}`}
          data-aos="zoom-in"
        >
          <h2 className="display-8 mb-3" style={{ color: "#4a4a4a" }}>
            Собираетесь ли Вы записать своего ребенка в детский сад?
          </h2>
          <Button
            variant="primary"
            size="lg"
            className="mt-3 px-5"
            onClick={openRegistrationModal}
            style={{
              background: "#58b4ae",
              border: "none",
              borderRadius: "40px",
              padding: "12px 40px",
              fontWeight: "600",
            }}
          >
            Записаться
          </Button>
        </div>
      </Container>

      <section className={styles.classesSliderSection}>
        <Container>
          <div className={styles.sliderHeader} data-aos="fade-right">
            <h2 className={`display-5 ${styles.sliderTitle}`}>Наши классы</h2>
            <div className={styles.sliderArrows}>
              <div
                className={styles.sliderArrow}
                onClick={scrollLeft}
                role="button"
                tabIndex={0}
              >
                <FaChevronLeft />
              </div>
              <div
                className={styles.sliderArrow}
                onClick={scrollRight}
                role="button"
                tabIndex={0}
              >
                <FaChevronRight />
              </div>
            </div>
          </div>
          <div
            className={styles.classesGrid}
            ref={classesScrollRef}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {classesData.map((classItem) => (
              <div key={classItem.id} className={styles.classCardSlide}>
                <div className={`${styles.classCard} text-center`}>
                  <i
                    className={`fas ${classItem.icon} fa-3x mb-3`}
                    style={{ color: classItem.color }}
                  ></i>
                  <h3>{classItem.title}</h3>
                  <p>
                    <strong>{classItem.age}</strong>
                    <br />
                    <FaUsers /> {classItem.students} учеников
                  </p>
                  <div className={styles.classPrice}>
                    {classItem.price} ₽ <small>/урок</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={`py-5 ${styles.bgSoftGreen}`}>
        <Container>
          <h2 className="display-5 text-center mb-5" data-aos="fade-up">
            Новости и статьи
          </h2>
          <Row className="g-4">
            {newsData.map((news, index) => (
              <Col
                key={news.id}
                md={6}
                lg={3}
                data-aos="flip-up"
                data-aos-delay={100 + index * 50}
              >
                <div className={styles.newsCard}>
                  <div className={styles.newsImageContainer}>
                    <img
                      src={news.image}
                      className={styles.newsImage}
                      alt={news.title}
                      loading="lazy"
                    />
                  </div>
                  <p className={styles.newsDate}>
                    <FaCalendarAlt className="me-1" />
                    {formatDate(news.date)}
                  </p>
                  <h4>{news.title}</h4>
                  <p className={styles.newsExcerpt}>{news.excerpt}</p>
                  <div className={styles.newsCardFooter}>
                    <span className={styles.newsViews}>
                      <FaEye /> {news.views}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5" data-aos="fade-up">
            <Button
              variant="outline-dark"
              size="lg"
              className="rounded-pill"
              onClick={goToNewsPage}
            >
              ЧИТАЙТЕ ВСЕ НОВОСТИ
            </Button>
          </div>
          <hr className="my-5" />

          <Row className="justify-content-center">
            <Col
              md={8}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="display-5 mb-4">
                Как записать ребенка на занятия?
              </h2>
              <p className="fs-5">
                Позвоните: <strong>+7 (495) 666-33-99</strong> или заполните
                форму ниже.
              </p>

              <div
                className="mb-4"
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "56.25%",
                  }}
                >
                  <video
                    controls
                    className="rounded-5 shadow position-absolute top-0 start-0 w-100 h-100"
                    poster="/public/images/11.jpg"
                    style={{ objectFit: "cover" }}
                  >
                    <source
                      src="/public/images/inner-kids-party-rock-d6jtutis_UvBev9Us.mp4"
                      type="video/mp4"
                    />
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>
              </div>

              <Form
                className={styles.contactForm}
                onSubmit={handleSimpleFormSubmit}
                noValidate
              >
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Контактный телефон *"
                        className="rounded-pill"
                        value={simpleForm.phone}
                        onChange={handleSimpleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ваше имя *"
                        className="rounded-pill"
                        value={simpleForm.name}
                        onChange={handleSimpleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={3}
                        placeholder="Ваше сообщение"
                        className="rounded-4"
                        value={simpleForm.message}
                        onChange={handleSimpleFormChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-5 py-2 rounded-pill"
                    >
                      ОТПРАВИТЬ
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        size="lg"
        centered
        dialogClassName={styles.registrationModal}
      >
        <Modal.Header closeButton className={styles.registrationModalHeader}>
          <Modal.Title as="h3" className={styles.registrationModalTitle}>
            <FaChild className="me-2" style={{ color: "#ff8a5c" }} /> Запись в
            детский сад
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted mb-4">
            Заполните форму ниже, и мы свяжемся с вами
          </p>
          <Form onSubmit={handleRegistrationSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ваше имя *</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    value={registrationForm.parentName}
                    onChange={handleRegistrationInputChange}
                    onBlur={handleFieldBlur}
                    isInvalid={
                      touchedFields.parentName && !!formErrors.parentName
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.parentName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Имя ребенка *</Form.Label>
                  <Form.Control
                    type="text"
                    name="childName"
                    value={registrationForm.childName}
                    onChange={handleRegistrationInputChange}
                    onBlur={handleFieldBlur}
                    isInvalid={
                      touchedFields.childName && !!formErrors.childName
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.childName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Возраст ребенка *</Form.Label>
                  <Form.Select
                    name="childAge"
                    value={registrationForm.childAge}
                    onChange={handleRegistrationInputChange}
                    onBlur={handleFieldBlur}
                    isInvalid={touchedFields.childAge && !!formErrors.childAge}
                    required
                  >
                    <option value="">Выберите возраст</option>
                    <option value="3-4">3-4 года</option>
                    <option value="4-5">4-5 лет</option>
                    <option value="5-6">5-6 лет</option>
                    <option value="6-7">6-7 лет</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.childAge}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Телефон *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={registrationForm.phone}
                    onChange={handleRegistrationInputChange}
                    onBlur={handleFieldBlur}
                    isInvalid={touchedFields.phone && !!formErrors.phone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={registrationForm.email}
                    onChange={handleRegistrationInputChange}
                    onBlur={handleFieldBlur}
                    isInvalid={touchedFields.email && !!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Предпочитаемое направление</Form.Label>
                  <Form.Select
                    name="preferredClass"
                    value={registrationForm.preferredClass}
                    onChange={handleRegistrationInputChange}
                  >
                    <option value="">Выберите направление</option>
                    <option value="Каллиграфия">Каллиграфия</option>
                    <option value="Художественный класс">
                      Художественный класс
                    </option>
                    <option value="Английский язык">Английский язык</option>
                    <option value="Класс танцев">Класс танцев</option>
                    <option value="Театральная студия">
                      Театральная студия
                    </option>
                    <option value="Робототехника">Робототехника</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Дополнительная информация</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    value={registrationForm.message}
                    onChange={handleRegistrationInputChange}
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
                  style={{ borderRadius: "40px" }}
                >
                  Отправить заявку
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <AddReviewModal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        onAddReview={handleAddReview}
      />
      <FooterComponent />
    </>
  );
};

export default HomePage;
