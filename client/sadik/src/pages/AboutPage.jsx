import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Имя обязательно для заполнения";
        }
        if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
          return "Имя может содержать только буквы, пробелы и дефисы";
        }
        if (value.trim().length < 2) {
          return "Имя должно содержать минимум 2 символа";
        }
        return "";

      case "phone":
        if (!value.trim()) {
          return "Телефон обязателен для заполнения";
        }
        // Проверка формата: +7 (999) 123-45-67 или +79991234567 или 89991234567
        const phoneRegex =
          /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        if (!phoneRegex.test(value.replace(/\s+/g, " ").trim())) {
          return "Введите корректный номер телефона (например: +7 (999) 123-45-67)";
        }
        return "";

      case "message":
        if (value && value.length > 500) {
          return "Сообщение не может быть длиннее 500 символов";
        }
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Валидация при изменении
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Валидация при потере фокуса
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ["name", "phone", "message"];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Отмечаем все поля как "тронутые"
    setTouched({
      name: true,
      phone: true,
      message: true,
    });

    if (!validateForm()) {
      // Показываем первую ошибку
      const firstError = Object.values(errors)[0];
      if (firstError) {
        alert(firstError);
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
        setFormData({ phone: "", name: "", message: "" });
        setErrors({});
        setTouched({});
      } else {
        alert("Ошибка: " + (data.message || "Не удалось отправить заявку"));
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Ошибка соединения с сервером");
    }
  };

  const galleryImages = [
    {
      id: 1,
      src: "/public/images/осенний.jpg",
      alt: "Осеннее занятие",
      delay: 100,
    },
    { id: 2, src: "/public/images/лепка.jpg", alt: "Лепка", delay: 150 },
    { id: 3, src: "/public/images/физра.jpg", alt: "Физкультура", delay: 200 },
    {
      id: 4,
      src: "/public/images/рисование.jpg",
      alt: "Рисование",
      delay: 250,
    },
    {
      id: 5,
      src: "/public/images/по математике.jpg",
      alt: "Математика",
      delay: 300,
    },
    {
      id: 6,
      src: "/public/images/новый год.jpg",
      alt: "Новый год",
      delay: 350,
    },
  ];

  const advantages = [
    {
      id: 1,
      title: "🌸 Философия гармонии",
      text: "Счастье — это когда тебя понимают. Учим видеть красоту в простых вещах.",
      image:
        "/public/images/pngtree-children-planting-trees-environmental-conservation-and-teamwork-concept-image_16681784.jpg",
      alt: "Философия гармонии",
    },
    {
      id: 2,
      title: "🐼 Вдохновение мультфильмами",
      text: "Дети проживают истории любимых героев. Доброта и дружба побеждают.",
      image:
        "https://avatars.mds.yandex.net/i?id=46399b53ffffa28255aa891550f70ddb_l-4113749-images-thumbs&n=13",
      alt: "Вдохновение мультфильмами",
    },
    {
      id: 3,
      title: "🍵 Традиции и современность",
      text: "Каллиграфия, чаепития, создание мультфильмов в технике вырезания из бумаги.",
      image:
        "https://yandex-images.clstorage.net/9bJq5G408/ab91b90Q25zK/FS5Vy59vqvPp3ZG_U4heO34fV3pet6p7MFvgvUjsoQyUi1usV1vrkwEjSXE-6ASHjRibYidWhHi4mK6oEa_ouzDftCveb6vW_byVD8ZZP0_-GqJPSqe6akGPYz7rumIf5ig5b0ToWtfk1hx1v5xgwQocCqAmAyNKiOwp7YLIHWhS6hO7XP2pQ9rPxR8xC3oLrH8WW55hGIkRf2NNCMhhHjZZ-a43eHl0tuVNRNoccdNrGKrSxAPTm3k-Gb2xG90rMYhjid8MyxBrv4T_k0o5-Pz9J2mekkgIY11iHXkZMk41SAq_RQs6NPYlPpebbmLRW7qaMHZDwFnaDov_EJi8SfEoAUjePdkS6Z7mXcLLihusfYRaHhJZinAvQJxIisKvdvtbzXSLqCa0BX2Ga92gk7jaKTPUUZIpaIwbXSC6jwmg6EOq7Jw7UXjO1S0xWErojrzXeY_iSnsSjwH96vvzHTaL2a4mqCk1JmaOxxkdIDBJWTqBZJAiqNitW21ROe0bEmrBqJ482jDaHfRNsXnYeK4tJDrdQSuKc96w7BsIQp51qYhv9UrJpqYFfSd6fmGz6top0uQDskjYHMofIzqsakB78Qn9numhGt-37bCK67gdTrS4rBB6aEEMUZ2rO0FNZEm7fBQqC6Z0BG7G-R5Qk6rLKXMX05A5y-zor9Kbn3gSO9KpnW3YgduNlj0RCFvqvW-XG6-z-FvjbdK_qbkDrpb4iM202gl1xGSsZEk_4BDoqniAdlPQSeodG81RyV77oZpD--1fmhLKjncukUgJe29NV4oucjj50i1gvWiao3z16YmutlmYFKWkjxYbr9MgO8qa0QSBcgiIDTleEro_q0G4EHk87jshGL40zaLp-Au9L2dYn9IYWDBucl-7aUMsRkso3hQrqXeXJ07EKwxQk-lqO9A3weFKCZ-ZTrHL7qvyW6Nqv03JYQqO5-6ja0vKPl9V6uwSe_mhLHGvc",
      alt: "Традиции и современность",
    },
    {
      id: 4,
      title: "🎋 Семья — основа жизни человека",
      text: "Бабушки и дедушки рассказывают сказки. Празднуем традиционные праздники.",
      image:
        "https://solncesvet.ru/blog/wp-content/uploads/2024/10/novyj-god-v-detskom-sadu.jpg",
      alt: "Семья — основа жизни человека",
    },
  ];

  return (
    <>
      <NavbarComponent />

      <section className={styles.aboutHero}>
        <Container>
          <div className={styles.aboutStory}>
            <Row>
              <Col lg={8}>
                <h1
                  className={`display-4 ${styles.aboutTitle}`}
                  data-aos="fade-right"
                >
                  Как создавался детский сад "Знайка"
                </h1>
                <p
                  className={`fs-5 ${styles.indent}`}
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  Всё началось с нашей собственной семьи. Когда наши дети
                  подросли, мы, как и многие родители, столкнулись с главным
                  вопросом: «Кому доверить самое дорогое?». Мы искали сад, где
                  царила бы не дисциплины ради дисциплины, а атмосфера
                  творчества и открытий. Где воспитатели — это не просто
                  сотрудники, а люди, которые любят детей и понимают их. Но
                  идеального места мы не нашли. И тогда пришло решение: а почему
                  бы не создать его самим?
                </p>
                <p
                  className={`fs-5 ${styles.indent}`}
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  Мы собрали команду единомышленников — таких же родителей и
                  профессиональных педагогов, уставших от шаблонов. Мы часами
                  обсуждали, каким должен быть идеальный день в саду: чтобы
                  утром ребенок бежал в группу с радостью, чтобы обучение было
                  похоже на увлекательную игру, а обеды пахли домашней едой.
                </p>
              </Col>
              <Col
                lg={4}
                className="d-flex align-items-center"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                <img
                  src="https://i.pinimg.com/736x/d9/e9/17/d9e9175e4cfa843be6b2711c2b1b493f.jpg"
                  alt="История детского сада"
                  className={`img-fluid rounded-4 shadow ${styles.aboutImage}`}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className={`py-5 ${styles.advantagesSection}`}>
        <Container>
          <h2
            className={`display-4 text-center mb-5 ${styles.sectionTitle}`}
            data-aos="fade-up"
          >
            Подробнее о нас
          </h2>

          <Row className="g-4">
            {advantages.map((item, index) => (
              <Col
                key={item.id}
                md={6}
                lg={3}
                data-aos="flip-up"
                data-aos-delay={100 + index * 50}
              >
                <div className={styles.advantageSquare}>
                  <div className={styles.squareImageContainer}>
                    <img src={item.image} alt={item.alt} />
                  </div>
                  <h4>{item.title}</h4>
                  <p className={styles.advantageText}>{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Container>
        <div className={styles.learningSection} data-aos="zoom-in">
          <h2 className={`display-5 text-center mb-3 ${styles.learningTitle}`}>
            Учитесь, играя в детском саду
          </h2>
          <p className={styles.indent}>
            Мы знаем: дети лучше всего учатся через игру. Поэтому каждый день мы
            превращаем в весёлое занятие, где новые знания приходят легко и
            естественно. Играя, малыши развивают воображение, логику и любовь к
            познанию.
          </p>
          <p className={styles.indent}>
            Для того чтобы учиться играть в детские игры, необходимо начать с
            простых занятий. Например, можно играть в паре или в группе. Затем
            можно попробовать большее количество раз. Чем больше вы играете, тем
            лучше. Не бойтесь испытывать неудачи и помните, что каждый шаг в
            этом процессе важный.
          </p>
        </div>
      </Container>

      <section className={styles.gallerySection}>
        <Container>
          <h2
            className={`display-5 text-center mb-5 ${styles.galleryTitle}`}
            data-aos="fade-up"
          >
            Посмотрите нашу галерею
          </h2>
          <Row className="g-3">
            {galleryImages.map((img) => (
              <Col
                key={img.id}
                xs={4}
                md={2}
                data-aos="zoom-in"
                data-aos-delay={img.delay}
              >
                <div className={styles.galleryItem}>
                  <img src={img.src} alt={img.alt} />
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5" data-aos="fade-up">
            <Button
              variant="primary"
              size="lg"
              href="/gallery"
              className={styles.galleryButton}
            >
              ПРОСМОТРЕТЬ ГАЛЕРЕЮ <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      <section className={styles.formSection}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2
                className={`display-5 mb-4 ${styles.formTitle}`}
                data-aos="fade-up"
              >
                Как записать ребенка на занятия?
              </h2>
              <p className="fs-5" data-aos="fade-up" data-aos-delay="50">
                Позвоните по номеру: <strong>+7 (495) 666-33-99</strong> или
                заполните форму ниже.
              </p>

              {Object.keys(errors).length > 0 && (
                <Alert variant="danger" className="mb-3">
                  Пожалуйста, исправьте ошибки в форме
                </Alert>
              )}

              <Form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                data-aos="fade-up"
                data-aos-delay="150"
                noValidate
              >
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ваше имя *"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Контактный телефон *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        isInvalid={touched.phone && !!errors.phone}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={3}
                        placeholder="Ваше сообщение"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        isInvalid={touched.message && !!errors.message}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                      {formData.message && (
                        <Form.Text className="text-muted">
                          {formData.message.length}/500 символов
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-5 py-2"
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

      <FooterComponent />
    </>
  );
};

export default AboutPage;
