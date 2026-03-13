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
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [archiveEvents, setArchiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/events");
      const data = await response.json();
      console.log("📦 Загруженные события:", data);

      setUpcomingEvents(
        data.filter((e) => e.type === "upcoming" && e.is_active),
      );
      setArchiveEvents(data.filter((e) => e.type === "archive" && e.is_active));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    fetchEvents();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return "Дата уточняется";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

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
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            </div>
          ) : (
            <>
              <h2
                className={styles.sectionTitle}
                id="planning"
                data-aos="fade-right"
              >
                В Планировании
              </h2>
              <Row className="g-4 mb-5">
                {upcomingEvents.length === 0 ? (
                  <Col>
                    <p className="text-center text-muted">
                      Нет предстоящих мероприятий
                    </p>
                  </Col>
                ) : (
                  upcomingEvents.map((event, index) => (
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
                          <FaCalendarAlt /> {formatEventDate(event.event_date)}
                        </div>
                        <div className={styles.eventDatetime}>
                          <FaClock /> {event.time}
                        </div>
                        {event.duration && (
                          <div className={styles.eventDuration}>
                            {event.duration}
                          </div>
                        )}
                        {event.description && (
                          <p className="mt-2">{event.description}</p>
                        )}
                      </div>
                    </Col>
                  ))
                )}
              </Row>

              <h2
                className={`${styles.sectionTitle} ${styles.archiveTitle}`}
                id="archive"
                data-aos="fade-right"
              >
                Архивные события
              </h2>
              <Row className="g-4">
                {archiveEvents.length === 0 ? (
                  <Col>
                    <p className="text-center text-muted">
                      Нет архивных мероприятий
                    </p>
                  </Col>
                ) : (
                  archiveEvents.map((event, index) => (
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
                        <div className={styles.eventDatetime}>
                          <FaCalendarAlt /> {formatEventDate(event.event_date)}
                        </div>
                        <div className={styles.eventDatetime}>
                          <FaClock /> {event.time}
                        </div>
                        {event.duration && (
                          <div className={styles.eventDuration}>
                            {event.duration}
                          </div>
                        )}
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </>
          )}
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
