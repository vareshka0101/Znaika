import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert, Spinner } from "react-bootstrap";
import {
  FaArrowLeft,
  FaComment,
  FaEye,
  FaClock,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { api } from "../services/api";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./TopicPage.module.css";

const TopicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTopic();
  }, [id]);

  const fetchTopic = async () => {
    setLoading(true);
    try {
      const data = await api.getForumTopic(id);
      setTopic(data.data || data);
      setPosts(data.data?.posts || []);
    } catch (error) {
      console.error("Error fetching topic:", error);
      setError("Не удалось загрузить тему");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.addForumPost(id, newPost);
      const newPostData = response.data || response;

      setPosts((prev) => [...prev, newPostData]);
      setNewPost("");
      setSuccess("Ответ успешно добавлен!");

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding post:", error);
      setError(error.message || "Ошибка при добавлении ответа");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Неизвестно";
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Загрузка темы...</p>
        </Container>
        <FooterComponent />
      </>
    );
  }

  if (!topic) {
    return (
      <>
        <NavbarComponent />
        <Container className="text-center py-5">
          <Alert variant="danger">Тема не найдена</Alert>
          <Button variant="primary" onClick={() => navigate("/parent-club")}>
            <FaArrowLeft className="me-2" /> Вернуться к списку тем
          </Button>
        </Container>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <NavbarComponent />

      <Container className="py-4">
        <Button
          variant="link"
          onClick={() => navigate("/parent-club")}
          className={styles.backButton}
        >
          <FaArrowLeft className="me-2" /> Назад к списку тем
        </Button>

        <div className={styles.topicHeader}>
          <h1 className={styles.topicTitle}>{topic.title}</h1>

          <div className={styles.topicMeta}>
            <div className={styles.authorInfo}>
              <FaUserCircle className={styles.authorAvatar} />
              <span className={styles.authorName}>
                {topic.user?.name || "Пользователь"}
              </span>
              <FaClock className="ms-3 me-1" />
              <span>{formatDate(topic.created_at)}</span>
            </div>
            <div className={styles.stats}>
              <span className="me-3">
                <FaEye className="me-1" /> {topic.views || 0} просмотров
              </span>
              <span>
                <FaComment className="me-1" /> {posts.length} ответов
              </span>
            </div>
          </div>
        </div>

        <div className={styles.topicContent}>
          <p>{topic.content}</p>
        </div>

        <h3 className={styles.repliesTitle}>
          <FaComment className="me-2" /> Ответы ({posts.length})
        </h3>

        {posts.length === 0 ? (
          <Alert variant="info" className="text-center">
            Пока нет ответов. Будьте первым!
          </Alert>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <FaUserCircle className={styles.postAvatar} />
                <span className={styles.postAuthor}>
                  {post.user?.name || "Пользователь"}
                </span>
                <FaClock className="ms-3 me-1 text-secondary" />
                <span className={styles.postDate}>
                  {formatDate(post.created_at)}
                </span>
              </div>
              <div className={styles.postContent}>
                <p>{post.content}</p>
              </div>
            </div>
          ))
        )}

        <div className={styles.replyForm}>
          <h4>Добавить ответ</h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmitPost}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Напишите ваш ответ..."
                required
                disabled={sending}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              disabled={sending || !newPost.trim()}
              className={styles.submitButton}
            >
              {sending ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Отправка...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" /> Отправить ответ
                </>
              )}
            </Button>
          </Form>
        </div>
      </Container>

      <FooterComponent />
    </>
  );
};

export default TopicPage;
