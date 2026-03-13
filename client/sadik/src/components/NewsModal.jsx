import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const NewsModal = ({ show, onHide, news, onViewsUpdated }) => {
  const [currentNews, setCurrentNews] = useState(news);
  const hasIncrementedRef = useRef(false);
  const currentNewsIdRef = useRef(null);

  useEffect(() => {
    if (news) {
      console.log(
        "📰 Modal получил новость:",
        news.id,
        "просмотров:",
        news.views,
      );
      setCurrentNews(news);

      if (currentNewsIdRef.current !== news.id) {
        console.log("🔄 Новая новость, сбрасываем флаг");
        hasIncrementedRef.current = false;
        currentNewsIdRef.current = news.id;
      }
    }
  }, [news]);

  useEffect(() => {
    if (!show || !currentNews?.id) return;

    if (hasIncrementedRef.current) {
      console.log("⏭️ Просмотры уже увеличены для этой новости, пропускаем");
      return;
    }

    const viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "{}");
    if (viewedNews[`news_${currentNews.id}`]) {
      console.log("⏭️ Новость уже просмотрена в этой сессии");
      hasIncrementedRef.current = true;
      return;
    }

    const incrementViews = async () => {
      try {
        console.log("📊 Увеличиваем просмотры для новости:", currentNews.id);

        const response = await fetch(
          `http://localhost:8000/api/v1/news/${currentNews.id}/views`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();
        console.log("📊 Ответ от сервера:", data);

        if (data.success && data.data) {
          console.log("✅ Просмотры увеличены:", data.data.views);

          hasIncrementedRef.current = true;

          viewedNews[`news_${currentNews.id}`] = true;
          sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews));

          setCurrentNews(data.data);

          if (onViewsUpdated) {
            onViewsUpdated(data.data);
          }
        }
      } catch (error) {
        console.error("❌ Ошибка:", error);
      }
    };

    incrementViews();
  }, [show, currentNews?.id, onViewsUpdated]);

  if (!currentNews) return null;

  const formatDate = (dateString) => {
    try {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("ru-RU", options);
    } catch {
      return dateString;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #58b4ae 0%, #3a9b95 100%)",
          color: "white",
          borderBottom: "none",
        }}
      >
        <Modal.Title as="h3" style={{ color: "white" }}>
          {currentNews.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#666",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>📅 {formatDate(currentNews.date)}</span>
            <span>👁️ {currentNews.views || 0} просмотров</span>
          </div>

          <img
            src={currentNews.image || "/images/news-placeholder.jpg"}
            alt={currentNews.title}
            style={{
              width: "100%",
              borderRadius: "15px",
              marginBottom: "1.5rem",
              maxHeight: "400px",
              objectFit: "cover",
            }}
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

          {currentNews.tags?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #eee",
              }}
            >
              {currentNews.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "#f0f0f0",
                    color: "#666",
                    padding: "0.3rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "1px solid #eee" }}>
        <Button variant="secondary" onClick={onHide} className="rounded-pill">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
