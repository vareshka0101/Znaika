import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaClock,
  FaArchive,
  FaCalendarCheck,
  FaArrowUp,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./EventsPage.module.css";

const EventsPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Час Чтения",
      date: "22 февраля, пятница",
      time: "14:00–15:30",
      duration: "90 минут",
      description: "Приглашаем малышей послушать сказки и обсудить героев.",
      icon: FaCalendarCheck,
    },
    {
      id: 2,
      title: "Музыкальная и Танцевальная Вечеринка",
      date: "22 февраля, пятница",
      time: "14:00–15:30",
      duration: "90 минут",
      description: "Танцы, хороводы, музыкальные игры.",
      icon: FaCalendarCheck,
    },
    {
      id: 3,
      title: "Праздник Культур",
      date: "14:30–15:30",
      time: "Длительность: 90 минут",
      duration: "90 мин",
      description: "Знакомство с традициями разных стран.",
      icon: FaCalendarCheck,
    },
    {
      id: 4,
      title: "Прогулка На Природе",
      date: "15 марта, вторник",
      time: "14:30–15:30",
      duration: "60 минут",
      description: "Наблюдаем за птицами, собираем листья.",
      icon: FaCalendarCheck,
    },
  ];

  const archiveEvents = [
    {
      id: 1,
      title: "Час Чтения",
      date: "22 февраля",
      time: "16:00–17:30",
      icon: FaArchive,
    },
    {
      id: 2,
      title: "Музыкальная и Танцевальная Вечеринка",
      date: "",
      time: "16:00–17:30",
      duration: "90 минут",
      icon: FaArchive,
    },
    {
      id: 3,
      title: "Праздник Культур",
      date: "26 октября",
      time: "16:00–17:30",
      icon: FaArchive,
    },
  ];

  return (
    <>
      <NavbarComponent />

      <section className={styles.eventsHero}>
        <Container>
          <h1 data-aos="fade-down">Мероприятия</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">
            Актуальные и прошедшие события детского сада «Знайка»
          </p>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2
            className={styles.sectionTitle}
            id="planning"
            data-aos="fade-right"
          >
            В Планировании
          </h2>
          <Row className="g-4 mb-5">
            {upcomingEvents.map((event, index) => (
              <Col
                key={event.id}
                md={6}
                lg={4}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={styles.eventCard}>
                  <span className={styles.eventBadge}>
                    <FaCalendarCheck className="me-1" /> планируется
                  </span>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <div className={styles.eventDatetime}>
                    <FaCalendarAlt /> {event.date}
                  </div>
                  <div className={styles.eventDatetime}>
                    <FaClock /> {event.time}
                  </div>
                  {event.duration && (
                    <div className={styles.eventDuration}>{event.duration}</div>
                  )}
                  <p className="mt-2">{event.description}</p>
                </div>
              </Col>
            ))}
          </Row>

          <h2
            className={`${styles.sectionTitle} ${styles.archiveTitle}`}
            id="archive"
            data-aos="fade-right"
          >
            Архивные события
          </h2>
          <Row className="g-4">
            {archiveEvents.map((event, index) => (
              <Col
                key={event.id}
                md={4}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={styles.eventCard}>
                  <span
                    className={`${styles.eventBadge} ${styles.archiveBadge}`}
                  >
                    <FaArchive className="me-1" /> архив
                  </span>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  {event.date && (
                    <div className={styles.eventDatetime}>
                      <FaCalendarAlt /> {event.date}
                    </div>
                  )}
                  <div className={styles.eventDatetime}>
                    <FaClock /> {event.time}
                  </div>
                  {event.duration && (
                    <div className={styles.eventDuration}>{event.duration}</div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {showScrollTop && (
        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          title="Наверх"
        >
          <FaArrowUp />
        </button>
      )}

      <FooterComponent />
    </>
  );
};

export default EventsPage;
