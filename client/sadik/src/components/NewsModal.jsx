import React, { useState, useEffect, useRef, memo } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";
import styles from "./NewsModal.module.css";

const NewsModal = memo(({ show, onHide, news, onViewsUpdated }) => {
  const [currentNews, setCurrentNews] = useState(news);
  const hasIncrementedRef = useRef(false);
  const modalIdRef = useRef(null);

  // Сбрасываем состояние при смене новости
  useEffect(() => {
    if (news) {
      setCurrentNews(news);
      // Сбрасываем флаг только для новой новости
      if (modalIdRef.current !== news.id) {
        hasIncrementedRef.current = false;
        modalIdRef.current = news.id;
      }
    }
  }, [news]);

  // Увеличиваем просмотры только один раз при открытии
  useEffect(() => {
    // Проверяем все условия для предотвращения множественных вызовов
    if (!show || !currentNews?.id || hasIncrementedRef.current) {
      return;
    }

    // Проверяем sessionStorage
    const viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "{}");

    if (viewedNews[currentNews.id]) {
      hasIncrementedRef.current = true;
      return;
    }

    // Увеличиваем просмотры
    const incrementViews = async () => {
      try {
        console.log(`Incrementing views for news ID: ${currentNews.id}`);

        const updatedNews = await api.incrementNewsViews(currentNews.id);

        if (updatedNews) {
          // Обновляем локальное состояние
          setCurrentNews(updatedNews);

          // Уведомляем родителя
          if (onViewsUpdated) {
            onViewsUpdated(updatedNews);
          }

          // Сохраняем в sessionStorage
          viewedNews[currentNews.id] = true;
          sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews));

          hasIncrementedRef.current = true;

          console.log(`Views incremented to: ${updatedNews.views}`);
        }
      } catch (error) {
        console.error("Error incrementing views:", error);
        // В случае ошибки все равно помечаем как просмотренное, чтобы не спамить
        viewedNews[currentNews.id] = true;
        sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews));
        hasIncrementedRef.current = true;
      }
    };

    // Запускаем с задержкой
    const timer = setTimeout(incrementViews, 500);

    return () => clearTimeout(timer);
  }, [show, currentNews?.id, onViewsUpdated]); // Убрали currentNews из зависимостей

  if (!currentNews) return null;

  const formatDate = (dateString) => {
    try {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("ru-RU", options);
    } catch {
      return dateString;
    }
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      scrollable
      dialogClassName={styles.newsModal}
    >
      <Modal.Header closeButton className={styles.newsModalHeader}>
        <Modal.Title as="h3" className={styles.modalNewsTitle}>
          {currentNews.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalNewsContent}>
          <div className={styles.modalNewsMeta}>
            <span>📅 {formatDate(currentNews.date)}</span>
            <span>👁️ {currentNews.views || 0} просмотров</span>
          </div>

          <img
            src={currentNews.image || "/images/news-placeholder.jpg"}
            alt={currentNews.title}
            className={styles.modalNewsImage}
            loading="lazy"
            onError={(e) => {
              e.target.src = "/images/news-placeholder.jpg";
            }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html:
                currentNews.content ||
                "<p>Полный текст новости скоро будет доступен.</p>",
            }}
          />

          {currentNews.tags && currentNews.tags.length > 0 && (
            <div className={styles.newsTags}>
              {currentNews.tags.map((tag, idx) => (
                <span key={idx} className={styles.newsTag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.newsModalFooter}>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="rounded-pill"
        >
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

NewsModal.displayName = "NewsModal";

export default NewsModal;
