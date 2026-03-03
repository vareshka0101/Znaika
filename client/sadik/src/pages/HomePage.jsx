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
  FaArrowRight,
  FaShareAlt,
  FaUsers,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaChild,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const classesScrollRef = useRef(null);

  // Состояние для формы регистрации
  const [registrationForm, setRegistrationForm] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    preferredClass: "",
    message: "",
  });

  // Состояние для простой формы внизу
  const [simpleForm, setSimpleForm] = useState({
    phone: "",
    name: "",
    message: "",
  });

  // Данные для новостей
  const newsData = [
    {
      id: 1,
      title: "Преимущества игрового обучения для детей дошкольного возраста",
      date: "2024-02-10",
      image: "https://placecats.com/300/200?random=101",
      views: 245,
      excerpt:
        "Исследования показывают, что дети лучше усваивают материал через игру. В нашей статье рассказываем о методиках игрового обучения...",
      content: `
        <img src="https://placecats.com/800/400?random=101" class="${styles.modalNewsImage}" alt="Игровое обучение">
        <div class="${styles.modalNewsMeta}">
          <span><i class="far fa-calendar-alt"></i> 10 февраля 2024</span>
          <span><i class="far fa-eye"></i> 245 просмотров</span>
        </div>
        <div class="${styles.modalNewsContent}">
          <h4>Почему игра — это важно?</h4>
          <p>Игровое обучение — это не просто развлечение, а мощный педагогический инструмент. Когда дети играют, они развивают социальные навыки, тренируют память и внимание, развивают творческое мышление.</p>
          <h4>Методики игрового обучения в "Знайке"</h4>
          <ul>
            <li><strong>Сюжетно-ролевые игры</strong> — дети примеряют на себя разные профессии</li>
            <li><strong>Дидактические игры</strong> — обучающие игры с четкими правилами</li>
            <li><strong>Подвижные игры</strong> — развивают координацию</li>
            <li><strong>Конструирование</strong> — развивает пространственное мышление</li>
          </ul>
        </div>
      `,
      tags: ["Игровое обучение", "Развитие детей", "Методики"],
    },
    {
      id: 2,
      title: "Создание безопасной и инклюзивной среды в детском саду",
      date: "2024-03-15",
      image: "https://placecats.com/301/201?random=102",
      views: 189,
      excerpt:
        "Как сделать детский сад комфортным для каждого ребенка, включая детей с особенностями развития...",
      content: `
        <img src="https://placecats.com/801/401?random=102" class="${styles.modalNewsImage}" alt="Безопасная среда">
        <div class="${styles.modalNewsMeta}">
          <span><i class="far fa-calendar-alt"></i> 15 марта 2024</span>
          <span><i class="far fa-eye"></i> 189 просмотров</span>
        </div>
        <div class="${styles.modalNewsContent}">
          <h4>Что такое инклюзивная среда?</h4>
          <p>Инклюзивная среда — это пространство, где каждый ребенок чувствует себя принятым и защищенным.</p>
          <h4>Наши принципы безопасности</h4>
          <ul>
            <li>Физическая безопасность</li>
            <li>Эмоциональная безопасность</li>
            <li>Социальная инклюзия</li>
          </ul>
        </div>
      `,
      tags: ["Безопасность", "Инклюзия", "Детский сад"],
    },
    {
      id: 3,
      title: "Советы по питанию для здоровых перекусов",
      date: "2024-02-22",
      image: "https://placecats.com/302/202?random=103",
      views: 312,
      excerpt:
        "Простые и полезные рецепты перекусов, которые понравятся детям и сэкономят время родителям...",
      content: `
        <img src="https://placecats.com/802/402?random=103" class="${styles.modalNewsImage}" alt="Здоровое питание">
        <div class="${styles.modalNewsMeta}">
          <span><i class="far fa-calendar-alt"></i> 22 февраля 2024</span>
          <span><i class="far fa-eye"></i> 312 просмотров</span>
        </div>
        <div class="${styles.modalNewsContent}">
          <h4>Топ-5 полезных перекусов</h4>
          <ol>
            <li>Фруктовые шашлычки</li>
            <li>Овощные палочки с хумусом</li>
            <li>Домашние мюсли-батончики</li>
            <li>Йогуртовые парфе</li>
            <li>Смузи-боулы</li>
          </ol>
        </div>
      `,
      tags: ["Питание", "Рецепты", "Здоровье"],
    },
    {
      id: 4,
      title: "Идеи для творческих проектов в детском саду",
      date: "2024-03-26",
      image: "https://placecats.com/303/203?random=104",
      views: 156,
      excerpt:
        "Вдохновляющие идеи для поделок и творческих занятий с детьми от 3 до 6 лет...",
      content: `
        <img src="https://placecats.com/803/403?random=104" class="${styles.modalNewsImage}" alt="Творчество">
        <div class="${styles.modalNewsMeta}">
          <span><i class="far fa-calendar-alt"></i> 26 марта 2024</span>
          <span><i class="far fa-eye"></i> 156 просмотров</span>
        </div>
        <div class="${styles.modalNewsContent}">
          <h4>Сезонные проекты</h4>
          <ul>
            <li>Осень: гербарий, поделки из листьев</li>
            <li>Зима: снежинки, новогодние игрушки</li>
            <li>Весна: цветы из бумаги</li>
            <li>Лето: рисунки на асфальте</li>
          </ul>
        </div>
      `,
      tags: ["Творчество", "Поделки", "Идеи"],
    },
  ];

  // Данные для классов
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

  // Данные для отзывов
  const testimonials = [
    {
      id: 1,
      text: "Ребёнок бежит в сад каждое утро! Очень довольны программой и чуткими воспитателями. Знайка — наша вторая семья.",
      author: "Анна, мама Тимофея",
      years: "3 года в саду",
    },
    {
      id: 2,
      text: "После года в Знайке сын научился читать и считать, а главное — появилась тяга к знаниям. Спасибо команде!",
      author: "Игорь, папа Миши",
      years: "1 год в саду",
    },
    {
      id: 3,
      text: "Очень уютная атмосфера, ребёнок всегда с радостью рассказывает, как прошёл день. Отдельное спасибо за вкусное питание!",
      author: "Елена, мама Киры",
      years: "2 года в саду",
    },
    {
      id: 4,
      text: "Воспитатели настоящие профессионалы! Ребёнок с удовольствием ходит в сад, участвует во всех мероприятиях. Рекомендую!",
      author: "Дмитрий, папа Сони",
      years: "полгода в саду",
    },
    {
      id: 5,
      text: "Отличный сад! Ребёнок всегда сыт, доволен, занятия интересные. Особенно нравится подход к развитию речи.",
      author: "Светлана, мама Артёма",
      years: "1,5 года в саду",
    },
  ];

  // Данные для мероприятий
  const upcomingEvents = [
    {
      id: 1,
      date: "22 февраля, пятница",
      title: "Час Чтения",
      time: "14:00–15:30",
    },
    {
      id: 2,
      date: "22 февраля, пятница",
      title: "Музыкальная И Танцевальная Вечеринка",
      time: "14:00–15:30",
    },
    { id: 3, date: "90 минут", title: "Праздник Культур", time: "14:30–15:30" },
    {
      id: 4,
      date: "15 марта, вторник",
      title: "Прогулка На Природе",
      time: "14:30–15:30",
    },
  ];

  const archiveEvents = [
    {
      id: 5,
      day: "22",
      month: "февраль",
      title: "Час Чтения",
      time: "16:00–17:30",
    },
    {
      id: 6,
      day: "90",
      month: "мин",
      title: "Музыкальная и Танцевальная Вечеринка",
      time: "16:00–17:30",
    },
    {
      id: 7,
      day: "26",
      month: "октябрь",
      title: "Праздник Культур",
      time: "16:00–17:30",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", options);
  };

  const scrollLeft = () => {
    if (classesScrollRef.current) {
      classesScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (classesScrollRef.current) {
      classesScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const openNewsModal = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedNews?.title || "Новость",
        text: 'Интересная статья на сайте детского сада "Знайка"',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Ссылка скопирована в буфер обмена!");
      });
    }
  };

  // Обработчики для формы регистрации
  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы на сервер
    console.log("Registration form submitted:", registrationForm);
    alert(
      "Спасибо за заявку! Мы свяжемся с вами в ближайшее время для уточнения деталей.",
    );
    setRegistrationForm({
      parentName: "",
      childName: "",
      childAge: "",
      phone: "",
      email: "",
      preferredClass: "",
      message: "",
    });
    setShowRegistrationModal(false);
  };

  // Обработчики для простой формы внизу
  const handleSimpleFormChange = (e) => {
    const { name, value } = e.target;
    setSimpleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSimpleFormSubmit = (e) => {
    e.preventDefault();
    // Переносим данные из простой формы в форму регистрации
    setRegistrationForm({
      ...registrationForm,
      parentName: simpleForm.name,
      phone: simpleForm.phone,
      message: simpleForm.message,
    });
    // Открываем модальное окно регистрации
    setShowRegistrationModal(true);
    // Очищаем простую форму
    setSimpleForm({
      phone: "",
      name: "",
      message: "",
    });
  };

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  const handleExcursionClick = () => {
    navigate("/classes");
  };

  return (
    <>
      <NavbarComponent />

      {/* Hero секция */}
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
                Философия Знайки — радость и развитие каждый день
              </p>
              <div
                className="d-flex gap-3"
                data-aos="fade-right"
                data-aos-delay="600"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="px-5"
                  onClick={openRegistrationModal}
                >
                  Записаться
                </Button>
                <Button
                  variant="excursion"
                  size="lg"
                  className={`px-4 ${styles.excursionButton}`}
                  onClick={handleExcursionClick}
                >
                  Экскурсия
                </Button>
              </div>
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

      {/* 4 ярких кружка-ссылки */}
      <section className="py-5">
        <Container>
          <Row className="text-center g-4">
            <Col md={3} data-aos="zoom-in" data-aos-delay="100">
              <Link
                to="#"
                className={`${styles.categoryCircle} ${styles.bgCoral} mx-auto`}
              >
                <FaPuzzlePiece />
              </Link>
              <h4>Игровая среда</h4>
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="200">
              <Link
                to="#"
                className={`${styles.categoryCircle} ${styles.bgTurq} mx-auto`}
              >
                <FaSeedling />
              </Link>
              <h4>Философия Знайки</h4>
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="300">
              <Link
                to="#"
                className={`${styles.categoryCircle} ${styles.bgGold} mx-auto`}
              >
                <FaBookOpen />
              </Link>
              <h4>Учебная программа</h4>
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="400">
              <Link
                to="#"
                className={`${styles.categoryCircle} ${styles.bgRose} mx-auto`}
              >
                <FaUtensils />
              </Link>
              <h4>Кухня шеф-повара</h4>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Учебная программа */}
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
                <li>Английский с носителем</li>
                <li>LEGO-конструирование</li>
                <li>Робототехника</li>
                <li>Каллиграфия</li>
                <li>Класс танцев</li>
                <li>Театральная студия</li>
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

      {/* Сердце сада (воспитатели) */}
      <section className="py-5">
        <Container>
          <h2 className="display-4 text-center mb-5" data-aos="fade-up">
            Сердце нашего детского сада
          </h2>
          <Row className="g-4">
            <Col
              md={3}
              className="text-center"
              data-aos="flip-left"
              data-aos-delay="100"
            >
              <img
                src="/public/images/4.jpg"
                className={`rounded-circle mb-3 ${styles.teacherImg}`}
                alt="teacher"
              />
              <h4>Елена Петрова</h4>
              <p className="text-secondary">педагог раннего развития</p>
            </Col>
            <Col
              md={3}
              className="text-center"
              data-aos="flip-left"
              data-aos-delay="200"
            >
              <img
                src="/public/images/3.jpg"
                className={`rounded-circle mb-3 ${styles.teacherImg}`}
                alt="teacher"
              />
              <h4>Наталия Соколова</h4>
              <p className="text-secondary">музыкальный руководитель</p>
            </Col>
            <Col
              md={3}
              className="text-center"
              data-aos="flip-left"
              data-aos-delay="300"
            >
              <img
                src="/public/images/1.jpg"
                className={`rounded-circle mb-3 ${styles.teacherImg}`}
                alt="teacher"
              />
              <h4>Анна Васильева</h4>
              <p className="text-secondary">художник-педагог</p>
            </Col>
            <Col
              md={3}
              className="text-center"
              data-aos="flip-left"
              data-aos-delay="400"
            >
              <img
                src="/public/images/2.jpg"
                className={`rounded-circle mb-3 ${styles.teacherImg}`}
                alt="teacher"
              />
              <h4>Ольга Миронова</h4>
              <p className="text-secondary">психолог</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Отзывы: карусель */}
      <section className={`py-5 ${styles.bgLight}`}>
        <Container>
          <h2 className="display-4 text-center mb-5" data-aos="fade-up">
            Истории успеха родителей
          </h2>
          <div data-aos="fade-up" data-aos-delay="200">
            <Carousel
              indicators
              prevIcon={<span className="carousel-control-prev-icon" />}
              nextIcon={<span className="carousel-control-next-icon" />}
              className={styles.testimonialCarousel}
            >
              <Carousel.Item>
                <Row className="g-4">
                  <Col md={6}>
                    <div className={styles.testimonialCard}>
                      <FaQuoteLeft
                        className={`fa-3x mb-3 ${styles.quoteIcon}`}
                      />
                      <p className="fs-5">"{testimonials[0].text}"</p>
                      <p className="fw-bold mb-0">— {testimonials[0].author}</p>
                      <small className="text-secondary">
                        {testimonials[0].years}
                      </small>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.testimonialCard}>
                      <FaQuoteLeft
                        className={`fa-3x mb-3 ${styles.quoteIcon}`}
                      />
                      <p className="fs-5">"{testimonials[1].text}"</p>
                      <p className="fw-bold mb-0">— {testimonials[1].author}</p>
                      <small className="text-secondary">
                        {testimonials[1].years}
                      </small>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row className="g-4">
                  <Col md={6}>
                    <div className={styles.testimonialCard}>
                      <FaQuoteLeft
                        className={`fa-3x mb-3 ${styles.quoteIcon}`}
                      />
                      <p className="fs-5">"{testimonials[2].text}"</p>
                      <p className="fw-bold mb-0">— {testimonials[2].author}</p>
                      <small className="text-secondary">
                        {testimonials[2].years}
                      </small>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.testimonialCard}>
                      <FaQuoteLeft
                        className={`fa-3x mb-3 ${styles.quoteIcon}`}
                      />
                      <p className="fs-5">"{testimonials[3].text}"</p>
                      <p className="fw-bold mb-0">— {testimonials[3].author}</p>
                      <small className="text-secondary">
                        {testimonials[3].years}
                      </small>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row className="g-4 justify-content-center">
                  <Col md={6}>
                    <div className={styles.testimonialCard}>
                      <FaQuoteLeft
                        className={`fa-3x mb-3 ${styles.quoteIcon}`}
                      />
                      <p className="fs-5">"{testimonials[4].text}"</p>
                      <p className="fw-bold mb-0">— {testimonials[4].author}</p>
                      <small className="text-secondary">
                        {testimonials[4].years}
                      </small>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </div>
        </Container>
      </section>

      {/* Блок CTA в центре */}
      <Container>
        <div
          className={`text-center my-5 p-5 ${styles.ctaBlock}`}
          data-aos="zoom-in"
        >
          <h2 className="display-8 mb-3">
            Собираетесь ли Вы записать своего ребенка в детский сад?
          </h2>
          <Button
            variant="primary"
            size="lg"
            className="mt-3 px-5"
            onClick={openRegistrationModal}
          >
            Записаться
          </Button>
        </div>
      </Container>

      {/* Наши классы — слайдер */}
      <section className={styles.classesSliderSection}>
        <Container>
          <div className={styles.sliderHeader} data-aos="fade-right">
            <h2 className={`display-5 ${styles.sliderTitle}`}>Наши классы</h2>
            <div className={styles.sliderArrows}>
              <div
                className={styles.sliderArrow}
                onClick={scrollLeft}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    scrollLeft();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <FaChevronLeft />
              </div>
              <div
                className={styles.sliderArrow}
                onClick={scrollRight}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    scrollRight();
                  }
                }}
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
                    <strong>{classItem.age}</strong> <br />
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

      {/* Мероприятия */}
      <section className={`py-5 ${styles.bgLight}`}>
        <Container>
          <h2 className="display-5 text-center mb-5" data-aos="fade-up">
            Наши мероприятия
          </h2>
          <Row className="g-5">
            <Col lg={6} data-aos="fade-right">
              <h3 className="mb-4">
                <FaCalendarAlt className="me-2" style={{ color: "#ff8a5c" }} />В
                Планировании
              </h3>
              {upcomingEvents.map((event) => (
                <div key={event.id} className={styles.eventTile}>
                  <span className={styles.eventDate}>{event.date}</span>
                  <div className={styles.eventTitle}>{event.title}</div>
                  <div className={styles.eventTime}>{event.time}</div>
                </div>
              ))}
            </Col>
            <Col lg={6} data-aos="fade-left" data-aos-delay="200">
              <h3 className="mb-4">
                <FaStar className="me-2" style={{ color: "#58b4ae" }} />
                Архивные события
              </h3>
              {archiveEvents.map((event) => (
                <div
                  key={event.id}
                  className={`${styles.eventTile} d-flex align-items-center justify-content-between`}
                >
                  <div>
                    <span className="fw-bold fs-3 text-primary">
                      {event.day}
                    </span>{" "}
                    <span className="fw-semibold">{event.month}</span>
                  </div>
                  <div className="flex-grow-1 mx-3">
                    <span className="fw-bold">{event.title}</span> <br />{" "}
                    {event.time}
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Новости и статьи с формой внизу */}
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
                <div
                  className={styles.newsCard}
                  onClick={() => openNewsModal(news)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openNewsModal(news);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
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
                    <button
                      className={styles.readMoreBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        openNewsModal(news);
                      }}
                      type="button"
                    >
                      Читать далее <FaArrowRight />
                    </button>
                    <span className={styles.newsViews}>
                      <FaEye /> {news.views}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5" data-aos="fade-up">
            <Button variant="outline-dark" size="lg" className="rounded-pill">
              ЧИТАЙТЕ ВСЕ НОВОСТИ
            </Button>
          </div>

          <hr className="my-5" />

          {/* Форма внизу страницы */}
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
                      src="/public/Веселый детский танец _Нано техно_. Легкий танец (1).mp4"
                      type="video/mp4"
                    />
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>
              </div>

              {/* Форма с обработчиком */}
              <Form
                className={styles.contactForm}
                onSubmit={handleSimpleFormSubmit}
              >
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Контактный телефон"
                      className="rounded-pill"
                      value={simpleForm.phone}
                      onChange={handleSimpleFormChange}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      className="rounded-pill"
                      value={simpleForm.name}
                      onChange={handleSimpleFormChange}
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={3}
                      placeholder="Ваше сообщение"
                      className="rounded-4"
                      value={simpleForm.message}
                      onChange={handleSimpleFormChange}
                    />
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

      {/* Модальное окно для регистрации */}
      <Modal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        size="lg"
        centered
        dialogClassName={styles.registrationModal}
      >
        <Modal.Header closeButton className={styles.registrationModalHeader}>
          <Modal.Title as="h3" className={styles.registrationModalTitle}>
            <FaChild className="me-2" style={{ color: "#ff8a5c" }} />
            Запись в детский сад
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted mb-4">
            Заполните форму ниже, и мы свяжемся с вами для уточнения деталей и
            приглашения на экскурсию
          </p>
          <Form onSubmit={handleRegistrationSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ваше имя *</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    placeholder="Иванов Иван"
                    value={registrationForm.parentName}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Имя ребенка *</Form.Label>
                  <Form.Control
                    type="text"
                    name="childName"
                    placeholder="Петров Петя"
                    value={registrationForm.childName}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Возраст ребенка *</Form.Label>
                  <Form.Select
                    name="childAge"
                    value={registrationForm.childAge}
                    onChange={handleRegistrationInputChange}
                    required
                  >
                    <option value="">Выберите возраст</option>
                    <option value="3-4">3-4 года</option>
                    <option value="4-5">4-5 лет</option>
                    <option value="5-6">5-6 лет</option>
                    <option value="6-7">6-7 лет</option>
                  </Form.Select>
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
                    value={registrationForm.email}
                    onChange={handleRegistrationInputChange}
                  />
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
                    placeholder="Ваши пожелания или вопросы"
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

      {/* Модальное окно для новостей */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        scrollable
        dialogClassName={styles.newsModal}
      >
        <Modal.Header closeButton className={styles.newsModalHeader}>
          <Modal.Title as="h3" className={styles.modalNewsTitle}>
            {selectedNews?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNews && (
            <div>
              <div dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
              <div className={styles.newsTags}>
                {selectedNews.tags.map((tag, idx) => (
                  <span key={idx} className={styles.newsTag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.newsModalFooter}>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="rounded-pill"
          >
            Закрыть
          </Button>
          <Button
            variant="primary"
            onClick={handleShare}
            className="rounded-pill"
          >
            <FaShareAlt className="me-2" />
            Поделиться
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default HomePage;
