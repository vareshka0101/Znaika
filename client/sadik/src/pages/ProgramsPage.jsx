import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaCubes,
  FaBookOpen,
  FaChalkboardTeacher,
  FaSmile,
  FaTrophy,
  FaRegFileAlt,
  FaHeart,
  FaChild,
  FaCheckCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./ProgramsPage.module.css";

const ProgramsPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const programs = [
    {
      id: 1,
      age: "3-4 года",
      title: "«Любознайки»",
      description:
        "Промежуточное звено между базовыми и специальными навыками. Создаём прочный фундамент знаний.",
      badgeColor: "#58b4ae",
      features: [
        "Усвоение и отработка навыка чтения, развитие связной речи",
        "Математические навыки: счёт, сравнение, геометрические фигуры",
        "Постановка руки к письму (пальчиковая гимнастика, прописи)",
        "Развитие логического мышления и социальных навыков с психологом",
        "Расширение кругозора: музыка, живопись, физика, анатомия, география",
        "Знакомство с английским (в группах «Clever Kids») — стихи, песни, произношение",
      ],
    },
    {
      id: 2,
      age: "4-5 лет",
      title: "«Следопыты»",
      description:
        "Комплексное развитие: интеллектуальное, физическое, психологическое.",
      badgeColor: "#f9d56e",
      features: [
        "Отработка чтения (буквы/звуки, выразительность, составление слов)",
        "Математика до 20, сложение/вычитание, основы геометрии, величины",
        "Подготовка руки к письму, тренировка мышц, списывание",
        "Физическое развитие: равновесие, координация, танцы, фитнес",
        "Дополнительные дисциплины: география, анатомия, физика, история",
        "Творчество, обсуждение искусства, креативно-интеллектуальный тренинг с психологом",
        "Английский язык: фразы, диалоги, стихи, правильное произношение",
      ],
    },
    {
      id: 3,
      age: "5-7 лет",
      title: "«Эрудиты»",
      description: "Адаптация к школе + игры, танцы, творчество и физкультура.",
      badgeColor: "#a3d8c5",
      features: [
        "Чтение: произношение, выразительность, составление рассказов",
        "Математика до 1000, десятки/сотни, примеры, задачи, величины",
        "Письмо: карандаш, ручка, печатные и прописные буквы",
        "Ритмика, танцы, фитнес, хореография",
        "Доп. дисциплины: география, анатомия, физика, химия, биология, страноведение",
        "Мировая культура, основы психологии, актёрское мастерство",
        "Совершенствование английского: говорение, чтение",
      ],
    },
  ];

  const features = [
    {
      id: 1,
      icon: FaCubes,
      title: "5 уровней развития",
      description:
        "Программа состоит из нескольких уровней, направленных на развитие целостной личности. Каждый уровень соответствует определённому периоду и учитывает эмоциональные, духовные и интеллектуальные потребности.",
      color: "#ff8a5c",
      delay: 100,
    },
    {
      id: 2,
      icon: FaBookOpen,
      title: "10 000 пособий",
      description:
        "Учебная база «Знайка» насчитывает более 10 000 пособий. Каждый ребёнок имеет свой экземпляр для работы, чтобы занятия были интересными и разнообразными.",
      color: "#58b4ae",
      delay: 200,
    },
    {
      id: 3,
      icon: FaChalkboardTeacher,
      title: "Высококвалифицированные педагоги",
      description:
        "Преподаватели и психологи регулярно повышают квалификацию, применяют эффективные отечественные и зарубежные методики. Относятся к каждому ребёнку как к своему.",
      color: "#ff8a5c",
      delay: 300,
    },
  ];

  const licenses = [
    {
      id: 1,
      image: "/главная/images/лиц1.jpg",
      title: "Лицензия на образовательную деятельность",
      delay: 100,
    },
    {
      id: 2,
      image: "/главная/images/лиц2.jpg",
      title: "Свидетельство о государственной аккредитации",
      delay: 200,
    },
    {
      id: 3,
      image: "/главная/images/лиц 3.jpg",
      title: "Рекомендация Министерства образования РФ",
      delay: 300,
    },
    {
      id: 4,
      image: "/главная/images/наград.jpg",
      title: 'Награда "Лучший центр развития 2025"',
      delay: 400,
    },
  ];

  const advantages = [
    "Совершенно доступные цены на обучение.",
    "Лицензированное учреждение, регулярные проверки.",
    "Высококвалифицированный состав, искренне любящий детей.",
    "Педагоги и психологи участвуют в семинарах по повышению квалификации.",
    "Эффективные отечественные и зарубежные методики.",
  ];

  return (
    <>
      <NavbarComponent />

      <section className="py-5">
        <Container>
          <div className={styles.quoteBlock} data-aos="fade-up">
            <h1 className="display-4 mb-3">Детский сад «Знайка»</h1>
            <p className={`fs-5 ${styles.indent}`}>
              Быть родителями — совсем не лёгкая задача. Задача наших
              специалистов — дать родителям все знания, чтобы малыш рос умным,
              развитым, талантливым и успешным. Основная цель занятий –
              гармоничное всестороннее развитие личности ребёнка. Мы учим детей
              нестандартно, творчески мыслить!
            </p>
            <p className={`fs-5 ${styles.indent}`}>
              Все занятия проходят в игровой форме, учитываются психологические
              особенности каждого возраста. Небольшие группы позволяют уделить
              внимание каждому, а частая смена деятельности и тщательный подбор
              упражнений помогают продуктивно заниматься и не уставать. В
              программе «Знайка» мы используем как традиционные, так и
              уникальные авторские методики.
            </p>
            <div className="mt-3">
              <span className={styles.badgeAge}>
                <FaCheckCircle className="me-2" />
                Программа одобрена Научным Советом и рекомендована Министерством
                образования и науки молодёжи и спорта Российской Федерации
              </span>
            </div>
          </div>

          <Row className="g-4 mb-5">
            {features.map((feature) => (
              <Col
                key={feature.id}
                md={4}
                data-aos="fade-up"
                data-aos-delay={feature.delay}
              >
                <div className={styles.programCard}>
                  <feature.icon
                    className={`fa-3x mb-3 ${styles.featureIcon}`}
                    style={{ color: feature.color }}
                  />
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* Программы по возрастам */}
          <h2
            className={`display-5 text-center mb-4 ${styles.sectionTitle}`}
            data-aos="fade-up"
          >
            Наши программы
          </h2>

          {programs.map((program, index) => (
            <div
              key={program.id}
              className={styles.programCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Row className="align-items-center g-4">
                <Col lg={4}>
                  <span
                    className={styles.badgeAge}
                    style={{ backgroundColor: program.badgeColor }}
                  >
                    <FaSmile className="me-2" />
                    {program.age}
                  </span>
                  <h3 className="mt-2">{program.title}</h3>
                  <p className="text-secondary">{program.description}</p>
                </Col>
                <Col lg={8}>
                  <ul
                    className={`${styles.programList} row row-cols-1 row-cols-md-2`}
                  >
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="col">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </div>
          ))}

          <Row className="my-5 g-4">
            <Col md={6} data-aos="fade-right">
              <div className={styles.advantageCard}>
                <FaTrophy
                  className={`fa-2x mb-3 ${styles.advantageIcon}`}
                  style={{ color: "#ff8a5c" }}
                />
                <h4>Поступление в престижные лицеи и гимназии</h4>
                <p>
                  Пятилетняя программа «Знайка» рассчитана на успешное
                  прохождение вступительных испытаний. Мы даём глубокие знания и
                  уверенность.
                </p>
              </div>
            </Col>
            <Col md={6} data-aos="fade-left">
              <div className={styles.advantageCard}>
                <FaRegFileAlt
                  className={`fa-2x mb-3 ${styles.advantageIcon}`}
                  style={{ color: "#58b4ae" }}
                />
                <h4>Лицензированное учреждение</h4>
                <p>
                  «Знайка» имеет лицензию и регулярно проверяется органами
                  образования, что гарантирует высокое качество занятий.
                </p>
              </div>
            </Col>
          </Row>

          <div className={styles.contactBlock} data-aos="zoom-in">
            <h2 className="display-7 mb-3">Узнать стоимость и расписание</h2>
            <p className={styles.contactPhone}>+7 (495) 666-33-99</p>
            <a href="#" className={styles.contactButton}>
              Позвонить сейчас
            </a>
          </div>

          <h2
            className={`display-6 text-center mb-4 ${styles.sectionTitle}`}
            data-aos="fade-up"
          >
            Наши лицензии и сертификаты
          </h2>
          <Row className="g-4 justify-content-center">
            {licenses.map((license) => (
              <Col
                key={license.id}
                xs={6}
                md={3}
                data-aos="flip-left"
                data-aos-delay={license.delay}
              >
                <div className={styles.licenseThumb}>
                  <img
                    src={license.image}
                    alt={license.title}
                    className="img-fluid"
                  />
                </div>
                <p
                  className={`text-center mt-2 small text-secondary ${styles.licenseCaption}`}
                >
                  {license.title}
                </p>
              </Col>
            ))}
          </Row>

          <div className={styles.summaryBlock} data-aos="fade-up">
            <Row>
              <Col md={8}>
                <h4>
                  <FaHeart className="me-2" style={{ color: "#ff8a5c" }} />
                  Почему выбирают ДС «Знайка»
                </h4>
                <div className={styles.advantagesList}>
                  {advantages.map((advantage, idx) => (
                    <p key={idx} className="mb-2">
                      ✓ {advantage}
                    </p>
                  ))}
                </div>
              </Col>
              <Col md={4} className="text-center">
                <FaChild className={styles.childIcon} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default ProgramsPage;
