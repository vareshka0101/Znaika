import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCalendarAlt, FaEye, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import NewsModal from "../components/NewsModal";
import { api } from "../services/api";
import styles from "./NewsPage.module.css";

const NewsPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await api.getNews();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const openNewsModal = (newsItem) => {
    setSelectedNews(newsItem);
    setShowModal(true);
  };

  const handleViewsUpdated = (updatedNews) => {
    setNews((prevNews) =>
      prevNews.map((item) => (item.id === updatedNews.id ? updatedNews : item)),
    );

    setSelectedNews(updatedNews);
  };

  return (
    <>
      <NavbarComponent />
      <Container className="py-5">
        <h1 className="display-4 text-center mb-5">Все новости</h1>

        {loading ? (
          <div className="text-center py-5">Загрузка новостей...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-4 text-muted">Новости пока не добавлены</p>
          </div>
        ) : (
          <Row className="g-4">
            {news.map((item) => (
              <Col key={item.id} md={6} lg={4} xl={3}>
                <div className={styles.newsCard}>
                  <div className={styles.newsImageContainer}>
                    <img
                      src={item.image || "/public/images/news-placeholder.jpg"}
                      className={styles.newsImage}
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = "/public/images/news-placeholder.jpg";
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
                      <button
                        className={styles.readMoreBtn}
                        onClick={() => openNewsModal(item)}
                      >
                        Читать далее <FaArrowRight />
                      </button>
                      <span className={styles.newsViews}>
                        <FaEye /> {item.views || 0}
                      </span>
                    </div>
                  </div>
                </div>
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
        onHide={() => setShowModal(false)}
        news={selectedNews}
        onViewsUpdated={handleViewsUpdated}
      />
      <FooterComponent />
    </>
  );
};

export default NewsPage;
