import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import AdminNewsModal from "../components/AdminNewsModal";
import { api } from "../services/api";

const AdminNewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Проверка авторизации и роли админа
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await api.getNews();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Ошибка загрузки новостей");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/v1/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNews(news.filter((item) => item.id !== id));
        alert("Новость удалена");
      } else {
        alert("Ошибка при удалении");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Ошибка при удалении");
    }
  };

  const handleNewsSaved = (savedNews) => {
    if (editingNews) {
      setNews(
        news.map((item) => (item.id === savedNews.id ? savedNews : item)),
      );
    } else {
      setNews([savedNews, ...news]);
    }
    setShowModal(false);
    setEditingNews(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  return (
    <>
      <NavbarComponent />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Управление новостями</h1>
          <Button
            variant="primary"
            onClick={() => {
              setEditingNews(null);
              setShowModal(true);
            }}
          >
            <FaPlus className="me-2" /> Создать новость
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">Загрузка...</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Дата</th>
                <th>Просмотры</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.views}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      <AdminNewsModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingNews(null);
        }}
        onNewsSaved={handleNewsSaved}
        newsToEdit={editingNews}
      />
      <FooterComponent />
    </>
  );
};

export default AdminNewsPage;
