import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaQuoteLeft, FaQuoteRight, FaLanguage } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import ContactForm from "../components/ContactForm";
import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const teachers = [
    {
      id: 1,
      name: "Елена Васильева",
      role: "Преподаватель каллиграфии",
      description:
        "Художник-график с 15-летним стажем. Обучает детей искусству красивого письма по методикам китайской и европейской каллиграфии.",
      image: "/public/images/1.jpg",
      subjects: ["Каллиграфия", "ИЗО"],
      languages: [],
    },
    {
      id: 2,
      name: "Елена Петрова",
      role: "Педагог раннего развития",
      description:
        "Специалист по раннему развитию, автор игровых методик. Занятия проходят на английском языке в игровой форме.",
      image: "/public/images/4.jpg",
      subjects: ["Раннее развитие"],
      languages: ["English"],
    },
    {
      id: 3,
      name: "Мария Козлова",
      role: "Педагог раннего развития",
      description:
        "Психолог дошкольного образования, специалист по билингвальному развитию. Ведёт группы на английском и русском языках.",
      image: "/public/images/5.jpg",
      subjects: ["Раннее развитие"],
      languages: ["English"],
    },
    {
      id: 4,
      name: "Наталия Соколова",
      role: "Музыкальный руководитель",
      description:
        "Выпускник консерватории, лауреат международных конкурсов. Развивает музыкальный слух и чувство ритма через игру.",
      image: "/public/images/3.jpg",
      subjects: ["Музыка", "Вокал"],
      languages: [],
    },
    {
      id: 5,
      name: "Ольга Морозова",
      role: "Художник-педагог",
      description:
        "Художник-иллюстратор, преподаватель ИЗО и ДПИ. Владеет техниками правополушарного рисования и арт-терапии.",
      image: "/public/images/8.jpg",
      subjects: ["Рисование", "Лепка"],
      languages: [],
    },
    {
      id: 6,
      name: "Ольга Миронова",
      role: "Детский психолог",
      description:
        "Кандидат психологических наук, специалист по эмоциональному интеллекту. Помогает детям адаптироваться и разрешать конфликты.",
      image: "/public/images/2.jpg",
      subjects: ["Психология", "Адаптация"],
      languages: [],
    },
    {
      id: 7,
      name: "Иван Петров",
      role: "Преподаватель физкультуры",
      description:
        "Мастер спорта по гимнастике, инструктор ЛФК. Проводит весёлые разминки, обучает основам здорового образа жизни.",
      image: "/public/images/7.jpg",
      subjects: ["Физкультура", "ЛФК"],
      languages: [],
    },
    {
      id: 8,
      name: "Наталья Григорьева",
      role: "Логопед-дефектолог",
      description:
        "Специалист высшей категории. Занимается постановкой звуков, развитием речи и профилактикой нарушений письма.",
      image: "/public/images/6.jpg",
      subjects: ["Логопедия", "Развитие речи"],
      languages: [],
    },
  ];

  return (
    <>
      <NavbarComponent />

      <div className={styles.heroImage}>
        <img
          src="/public/images/14.jpg"
          alt="Декоративная картинка"
          className="animate__animated animate__fadeIn"
          style={{ height: "350px" }}
        />
      </div>

      <section className="py-5">
        <Container>
          <h1
            className={`display-4 text-center mb-2 ${styles.pageTitle}`}
            data-aos="fade-down"
          >
            Наши преподаватели
          </h1>
          <p className="text-center text-muted mb-5" data-aos="fade-up">
            Профессионалы, любящие детей и своё дело
          </p>

          <Row
            className="justify-content-center mb-5"
            style={{ marginTop: "30px" }}
          >
            <Col xs={12}>
              <div
                className={styles.quoteBlock}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Container style={{ maxWidth: "1000px", margin: "0 auto" }}>
                  <p className={`fs-5 fst-italic mb-3 ${styles.quoteText}`}>
                    <FaQuoteLeft className={`me-2 ${styles.quoteIcon}`} />
                    В нашем саду работают не просто воспитатели — это настоящие
                    мастера своего дела, влюбленные в детей и свою профессию.
                    Каждый педагог — яркая личность с уникальным талантом:
                    кто-то виртуозно играет на фортепиано, кто-то говорит с
                    детьми на языке искусства, а кто-то превращает обычную
                    зарядку в захватывающее приключение. Мы гордимся нашей
                    командой и верим, что именно такие люди создают счастливое
                    детство.
                    <FaQuoteRight className={`ms-2 ${styles.quoteIcon}`} />
                  </p>
                  <p
                    className={`text-muted small ${styles.quoteAuthor}`}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    — Команда детского сада "Знайка"
                  </p>
                </Container>
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            {teachers.map((teacher, index) => (
              <Col
                key={teacher.id}
                md={6}
                lg={4}
                data-aos="flip-up"
                data-aos-delay={100 + index * 50}
              >
                <div className={styles.teacherCard}>
                  <div className={styles.teacherImg}>
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.teacherContent}>
                    <h3 className={styles.teacherName}>{teacher.name}</h3>
                    <div className={styles.teacherRole}>{teacher.role}</div>
                    <p className={styles.teacherDesc}>{teacher.description}</p>
                    <div>
                      {teacher.subjects.map((subject, idx) => (
                        <span key={idx} className={styles.teacherSubject}>
                          {subject}
                        </span>
                      ))}
                      {teacher.languages.map((lang, idx) => (
                        <span key={idx} className={styles.teacherLang}>
                          <FaLanguage className="me-1" />
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center mt-5">
            <Col lg={8}>
              <ContactForm />
            </Col>
          </Row>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default TeachersPage;
