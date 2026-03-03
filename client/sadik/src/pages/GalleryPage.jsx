import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import {
  FaCameraRetro,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./GalleryPage.module.css";

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const categories = [
    { id: "all", label: "Все", icon: null },
    { id: "holidays", label: "Праздники", icon: "🎉" },
    { id: "classes", label: "Занятия", icon: "📚" },
    { id: "creativity", label: "Творчество", icon: "🎨" },
    { id: "sport", label: "Спорт", icon: "⚽" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "classes",
      image: "/public/images/по математике.jpg",
      title: "📐 Занятие по математике",
      delay: 0,
    },
    {
      id: 2,
      category: "classes",
      image: "/public/images/развитие речи.jpg",
      title: "🗣️ Развитие речи",
      delay: 50,
    },

    {
      id: 3,
      category: "holidays",
      image: "/public/images/новый год.jpg",
      title: "🎄 Новогодний утренник",
      delay: 100,
    },
    {
      id: 4,
      category: "holidays",
      image: "/public/images/день рождения.jpg",
      title: "🎂 День рождения",
      delay: 150,
    },
    {
      id: 9,
      category: "holidays",
      image: "/public/images/осенний.jpg",
      title: "🍂 Осенний бал",
      delay: 400,
    },

    {
      id: 5,
      category: "creativity",
      image: "/public/images/рисование.jpg",
      title: "🖌️ Рисование",
      delay: 200,
    },
    {
      id: 6,
      category: "creativity",
      image: "/public/images/лепка.jpg",
      title: "🏺 Лепка",
      delay: 250,
    },

    {
      id: 7,
      category: "sport",
      image: "/public/images/физра.jpg",
      title: "🤸 Физкультура",
      delay: 300,
    },
    {
      id: 8,
      category: "sport",
      image: "/public/images/подвиж.jpg",
      title: "🏃 Подвижные игры",
      delay: 350,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleImageClick = (item, index, visibleItems) => {
    setCurrentImages(visibleItems);
    setCurrentIndex(index);
    setModalImage(item.image);
    setModalTitle(item.title);
    setShowModal(true);
  };

  const handlePrevImage = () => {
    if (currentImages.length > 0) {
      const newIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      setCurrentIndex(newIndex);
      setModalImage(currentImages[newIndex].image);
      setModalTitle(currentImages[newIndex].title);
    }
  };

  const handleNextImage = () => {
    if (currentImages.length > 0) {
      const newIndex = (currentIndex + 1) % currentImages.length;
      setCurrentIndex(newIndex);
      setModalImage(currentImages[newIndex].image);
      setModalTitle(currentImages[newIndex].title);
    }
  };

  const handleKeyDown = (e) => {
    if (showModal) {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, currentIndex, currentImages]);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <NavbarComponent />

      <section className={styles.galleryHeaderSection}>
        <Container className="text-center">
          <h1 data-aos="fade-down">Наша галерея</h1>
          <p
            className={`lead mb-4 fs-4 ${styles.gallerySubtitle}`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaCameraRetro
              className="me-2"
              style={{ color: "var(--primary)" }}
            />
            Яркие моменты из жизни детского клуба "Знайка"
          </p>
        </Container>
      </section>

      <main className="container pb-5">
        <div className={styles.categoryFilters} data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ""}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon && <span className="me-1">{category.icon}</span>}
              {category.label}
            </button>
          ))}
        </div>

        <Row className="g-4">
          {filteredItems.map((item, index) => (
            <Col
              key={item.id}
              lg={4}
              md={6}
              data-aos="zoom-in"
              data-aos-delay={item.delay}
            >
              <div
                className={styles.galleryCard}
                onClick={() =>
                  handleImageClick(
                    item,
                    index,
                    filteredItems.map((i) => ({
                      image: i.image,
                      title: i.title,
                    })),
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleImageClick(
                      item,
                      index,
                      filteredItems.map((i) => ({
                        image: i.image,
                        title: i.title,
                      })),
                    );
                  }
                }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className={styles.galleryOverlay}>
                  <span>{item.title}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </main>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        dialogClassName={styles.galleryModal}
        contentClassName="bg-transparent border-0"
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <Modal.Body className="p-0 text-center">
          <img src={modalImage} alt={modalTitle} className="img-fluid" />
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <span className="fw-bold fs-5">{modalTitle}</span>
          <div>
            <button className={styles.modalNavBtn} onClick={handlePrevImage}>
              <FaChevronLeft className="me-2" /> Предыдущее
            </button>
            <button className={styles.modalNavBtn} onClick={handleNextImage}>
              Следующее <FaChevronRight className="ms-2" />
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <a href="/" className={styles.backHome} title="На главную">
        <FaHome />
      </a>

      <FooterComponent />
    </>
  );
};

export default GalleryPage;
