import React, { useState, useEffect, useCallback, memo } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCalendarAlt, FaEye, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import NewsModal from "../components/NewsModal";
import { api } from "../services/api";
import styles from "./NewsPage.module.css";

const NewsCard = memo(({ item, onOpen }) => {
  const formatDate = useCallback((dateString) => {
    try {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("ru-RU", options);
    } catch {
      return dateString;
    }
  }, []);

  const handleClick = useCallback(() => {
    onOpen(item);
  }, [onOpen, item]);

  return (
    <div className={styles.newsCard}>
      <div className={styles.newsImageContainer}>
        <img
          src={item.image || "/images/news-placeholder.jpg"}
          className={styles.newsImage}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/news-placeholder.jpg";
          }}
        />
      </div>
      <div className={styles.newsContent}>
        <p className={styles.newsDate}>
          <FaCalendarAlt className="me-1" />
          {formatDate(item.date)}
        </p>
        <h4>{item.title}</h4>
        <p className={styles.newsExcerpt}>
          {item.excerpt || item.content?.substring(0, 100) + "..."}
        </p>
        <div className={styles.newsCardFooter}>
          <button className={styles.readMoreBtn} onClick={handleClick}>
            Читать далее <FaArrowRight />
          </button>
          <span className={styles.newsViews}>
            <FaEye /> {item.views || 0}
          </span>
        </div>
      </div>
    </div>
  );
});

const NewsPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await api.getNews();
        if (isMounted) {
          setNews(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        if (isMounted) {
          setError("Ошибка загрузки новостей");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const openNewsModal = useCallback((newsItem) => {
    setSelectedNews(newsItem);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedNews(null);
    }, 300);
  }, []);

  const handleViewsUpdated = useCallback((updatedNews) => {
    console.log("🔄 NewsPage: views updated", updatedNews);

    setNews((prevNews) =>
      prevNews.map((item) => (item.id === updatedNews.id ? updatedNews : item)),
    );

    setSelectedNews(updatedNews);

    window.dispatchEvent(
      new CustomEvent("newsViewsUpdated", {
        detail: updatedNews,
      }),
    );
    console.log("📢 Событие отправлено на главную");
  }, []);

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <Container className="py-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        </Container>
        <FooterComponent />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarComponent />
        <Container className="py-5">
          <div className="text-center py-5">
            <p className="text-danger fs-4">{error}</p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              className="mt-3"
            >
              Попробовать снова
            </Button>
          </div>
        </Container>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <Container className="py-5">
        <h1 className="display-4 text-center mb-5">Все новости</h1>

        {news.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-4 text-muted">Новости пока не добавлены</p>
          </div>
        ) : (
          <Row className="g-4">
            {news.map((item) => (
              <Col key={item.id} md={6} lg={4} xl={3}>
                <NewsCard item={item} onOpen={openNewsModal} />
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-5">
          <Button
            variant="outline-dark"
            size="lg"
            className="rounded-pill"
            onClick={() => navigate("/")}
          >
            НА ГЛАВНУЮ
          </Button>
        </div>
      </Container>

      <NewsModal
        show={showModal}
        onHide={handleCloseModal}
        news={selectedNews}
        onViewsUpdated={handleViewsUpdated}
      />
      <FooterComponent />
    </>
  );
};

export default NewsPage;
