import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import { api } from "../services/api";
import styles from "./NewsModal.module.css";

const NewsModal = ({ show, onHide, news, onViewsUpdated }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentNews, setCurrentNews] = useState(news);

  useEffect(() => {
    if (news) {
      setCurrentNews(news);
    }
  }, [news]);

  useEffect(() => {
    const incrementViews = async () => {
      if (show && currentNews?.id) {
        try {
          const viewedNews = JSON.parse(
            sessionStorage.getItem("viewedNews") || "{}",
          );

          if (!viewedNews[currentNews.id]) {
            console.log(
              `Увеличиваем просмотры для новости ID: ${currentNews.id}`,
            );

            const updatedNews = await api.incrementNewsViews(currentNews.id);

            if (updatedNews) {
              setCurrentNews(updatedNews);

              if (onViewsUpdated) {
                onViewsUpdated(updatedNews);
              }

              viewedNews[currentNews.id] = true;
              sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews));

              console.log(`Просмотры увеличены: ${updatedNews.views}`);
            }
          } else {
            console.log("Новость уже была просмотрена в этой сессии");
          }
        } catch (error) {
          console.error("Error incrementing views:", error);
        }
      }
    };

    incrementViews();
  }, [show, currentNews?.id, onViewsUpdated]);

  if (!currentNews) return null;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const content =
    currentNews.content ||
    `
    <div class="${styles.modalNewsContent}">
      <p>Полный текст новости скоро будет доступен.</p>
    </div>
  `;

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <>
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
          <div>
            <div className={styles.modalNewsMeta}>
              <span>📅 {formatDate(currentNews.date)}</span>
              <span>👁️ {currentNews.views || 0} просмотров</span>
            </div>
            <img
              src={currentNews.image || "/public/images/news-placeholder.jpg"}
              alt={currentNews.title}
              className={styles.modalNewsImage}
              onError={(e) => {
                e.target.src = "/public/images/news-placeholder.jpg";
              }}
            />
            <div
              className={styles.modalNewsContent}
              dangerouslySetInnerHTML={{ __html: content }}
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
    </>
  );
};

export default NewsModal;
