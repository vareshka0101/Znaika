import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaHeart,
  FaListUl,
  FaLock,
  FaComments,
  FaClock,
  FaCommentDots,
  FaInfoCircle,
  FaCoffee,
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaLockOpen,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import styles from "./ParentClubPage.module.css";

const ParentClubPage = () => {
  const [secretCode, setSecretCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });

    const savedCode = localStorage.getItem("parentClubCode");
    if (savedCode === "SECRET2026") {
      setIsAuthenticated(true);
      fetchForumPosts();
    }
  }, []);

  const fetchForumPosts = async () => {
    setLoading(true);
    try {
      const mockPosts = [
        {
          id: 1,
          author: "Екатерина М.",
          avatar: "E",
          time: "вчера, 19:34",
          title: "Кризис 3 лет: как договариваться?",
          content:
            "Сын постоянно говорит «нет», истерит, если что-то не по его. Пробовали и ласку, и строгость — ничего не помогает. Буду благодарна за советы...",
          replies: 7,
          lastActivity: "Последний от психолога 2 часа назад",
          color: "#ff8a5c",
        },
        {
          id: 2,
          author: "Анна В.",
          avatar: "А",
          time: "3 дня назад",
          title: "Детская агрессия на площадке",
          content:
            "Дочка (4 года) толкает других детей, отбирает игрушки. Дома ласковая, а на улице — маленький тиран. Как скорректировать поведение?",
          replies: 12,
          lastActivity: "Комментарий педагога",
          color: "#58b4ae",
        },
        {
          id: 3,
          author: "Марина П.",
          avatar: "М",
          time: "1 неделя назад",
          title: "Раннее развитие: не перегружаем ли?",
          content:
            "Ходим на английский, математику, творчество. Ребёнок стал капризным, может, слишком много? Поделитесь опытом.",
          replies: 23,
          lastActivity: "Модератор: психолог «Знайка»",
          color: "#ffd665",
        },
        {
          id: 4,
          author: "Ольга Н.",
          avatar: "О",
          time: "2 недели назад",
          title: "Детские страхи: темноты, монстров",
          content:
            "Сыну 5 лет, боится спать один. Пробовали ночник, но всё равно просыпается. Скоро в школу, переживаю.",
          replies: 9,
          lastActivity: "",
          color: "#ff8a5c",
        },
      ];
      setForumPosts(mockPosts);
    } catch (error) {
      console.error("Error fetching forum posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    "Как мы общаемся с детьми",
    "Сверхзабота: помощь или помеха",
    "Детская агрессия",
    "Раннее развитие: за и против",
    "Скороговорки: заговорил быстрее",
    "Осторожно! Игрушки!",
    "Жадность на площадке",
    "У других умнее, быстрее, красивее",
    "Мой ребенок — будущий первоклассник",
    "Кризис 3 лет: первый бунт",
    "Гиперактивный малыш",
    "Детские страхи",
    "Застенчивый ребенок",
    "Истерика: что делать?",
    "Сказкотерапия",
    "Женский клуб «Познай себя сама»",
    "Братья и сестры: ссоры",
    "Как беречь игрушки и книги",
    "Деньги и дети",
    "Обидчивость",
    "Ребенок-хвостик",
    "Фантазёры",
    "Телевидение и компьютер",
    "10 фильмов и мультиков",
    "Женский клуб «Хочешь быть счастливой»",
    "И многое другое",
  ];

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (secretCode === "SECRET2026" || secretCode === "DEMO2026") {
      setIsAuthenticated(true);
      localStorage.setItem("parentClubCode", secretCode);
      fetchForumPosts();
    } else {
      setError(
        "Неверный секретный код. Попробуйте снова или получите код на встрече клуба.",
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSecretCode("");
    localStorage.removeItem("parentClubCode");
  };

  const handleLoadMore = () => {
    alert("Полный форум доступен после входа с секретным кодом.");
  };

  return (
    <>
      <NavbarComponent />

      <section className="py-5">
        <Container>
          <div className="text-center mb-5" data-aos="fade-down">
            <h1 className="display-4 mb-3">🌱 Родительский клуб «Знайка»</h1>
            <p className={`fs-5 col-lg-8 mx-auto ${styles.description}`}>
              Ребенок – это чудо, которое живет рядом с нами. Мы стараемся его
              оберегать и помогать в развитии. Но у каждого родителя возникают
              вопросы:{" "}
              <strong>
                как общаться, понимать, воспитывать, помогать, поощрять… и не
                навредить?
              </strong>
            </p>
          </div>

          <Row className="g-4 mb-5">
            <Col lg={6} data-aos="fade-right">
              <div className={styles.clubCard}>
                <FaHeart className={`fa-3x mb-3 ${styles.heartIcon}`} />
                <h3>Тёплые встречи для родителей</h3>
                <p className={styles.indent}>
                  По выходным в «Знайке» работает{" "}
                  <strong>Родительский клуб</strong>. Это встречи с практикующим
                  детским психологом и педагогами в доверительной, дружеской
                  атмосфере. За чашечкой ароматного чая или кофе вы сможете
                  обсудить волнующие моменты, получить ответы на все вопросы и
                  научиться находить выход из самых сложных ситуаций в
                  воспитании.
                </p>
                <p>
                  Приглашаются мамы, папы, бабушки, дедушки — все, кто
                  интересуется психологией и развитием детей.
                </p>
                <div className="mt-4 d-flex align-items-center">
                  <FaPhoneAlt className={`fa-2x me-3 ${styles.phoneIcon}`} />
                  <span className="fs-4 fw-bold">+7 (495) 666-33-99</span>
                </div>
                <p className="mt-3">
                  <FaCalendarCheck className="me-2" />
                  Обязательна предварительная запись у администратора.
                </p>
              </div>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className={styles.clubCard}>
                <FaListUl className={`fa-3x mb-3 ${styles.listIcon}`} />
                <h3>Примерные темы встреч</h3>
                <div className={styles.topicsContainer}>
                  {topics.map((topic, index) => (
                    <span key={index} className={styles.topicBadge}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          <div className={styles.forumContainer} data-aos="zoom-in">
            <div className="text-center mb-4">
              <FaLock className={`fa-3x mb-3 ${styles.lockIcon}`} />
              <h2 className="display-6">Закрытый форум для родителей</h2>
              <p className="lead">
                Обсуждайте темы с другими родителями и нашими психологами.
                Доступ по секретному коду (выдаётся на встречах клуба или у
                администратора).
              </p>
            </div>

            {!isAuthenticated ? (
              <div className={styles.loginForm}>
                <Form
                  onSubmit={handleCodeSubmit}
                  className="d-flex justify-content-center gap-3 flex-wrap"
                >
                  <Form.Control
                    type="text"
                    placeholder="Введите секретный код"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    className={styles.secretCodeInput}
                    required
                  />
                  <Button type="submit" variant="primary" className="px-5">
                    Войти
                  </Button>
                </Form>
                {error && (
                  <Alert
                    variant="danger"
                    className="mt-3 text-center"
                    style={{ maxWidth: "500px", margin: "0 auto" }}
                  >
                    {error}
                  </Alert>
                )}
                <p className="text-muted text-center mt-3">
                  <FaInfoCircle className="me-1" />
                  Код можно получить на встречах родительского клуба или у
                  администратора
                </p>
              </div>
            ) : (
              <div className={styles.forumContent}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>
                    <FaComments
                      className="me-2"
                      style={{ color: "var(--secondary)" }}
                    />
                    Актуальные обсуждения (участники клуба)
                  </h4>
                  <Button
                    variant="outline-secondary"
                    onClick={handleLogout}
                    size="sm"
                  >
                    <FaLockOpen className="me-2" /> Выйти
                  </Button>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Загрузка...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {forumPosts.map((post) => (
                      <div key={post.id} className={styles.forumThread}>
                        <div className="d-flex align-items-center mb-2">
                          <div
                            className={styles.userAvatar}
                            style={{ backgroundColor: post.color }}
                          >
                            {post.avatar}
                          </div>
                          <div>
                            <strong>{post.author}</strong>
                            <span className="text-secondary ms-3">
                              <FaClock className="me-1" /> {post.time}
                            </span>
                          </div>
                        </div>
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                        <div className={styles.postMeta}>
                          <FaCommentDots className="me-2" />
                          {post.replies} ответов
                          {post.lastActivity && (
                            <>
                              <span className="mx-2">·</span>
                              <span className="text-primary">
                                {post.lastActivity}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="text-center mt-4">
                      <Button
                        variant="outline-dark"
                        size="lg"
                        className="rounded-pill px-5"
                        onClick={handleLoadMore}
                      >
                        Загрузить ещё темы
                      </Button>
                    </div>
                    <p className="text-muted text-center mt-3 small">
                      <FaInfoCircle className="me-1" />
                      Участвовать в обсуждениях могут только зарегистрированные
                      пользователи с кодом доступа.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={styles.ctaBlock} data-aos="zoom-in">
            <h2 className="display-7 mb-3">
              Хотите стать участником родительского клуба?
            </h2>
            <p className="fs-4">Запишитесь на ближайшую встречу по телефону</p>
            <p className={styles.ctaPhone}>+7 (495) 666-33-99</p>
            <a href="#" className={styles.ctaButton}>
              Позвонить сейчас
            </a>
          </div>
        </Container>
      </section>

      <section className={`py-5 ${styles.benefitsSection}`}>
        <Container>
          <Row className="g-4">
            <Col md={4} data-aos="flip-up" data-aos-delay="100">
              <div className={`${styles.clubCard} text-center`}>
                <FaCoffee className={`fa-3x mb-3 ${styles.benefitIcon}`} />
                <h4>Душевная атмосфера</h4>
                <p>
                  Чай, кофе и уютная гостиная. Никаких лекций — только живое
                  общение и поддержка.
                </p>
              </div>
            </Col>
            <Col md={4} data-aos="flip-up" data-aos-delay="200">
              <div className={`${styles.clubCard} text-center`}>
                <FaUserMd className={`fa-3x mb-3 ${styles.benefitIcon}`} />
                <h4>Опытные психологи</h4>
                <p>
                  Ведущие встреч — практикующие детские и семейные психологи с
                  большим опытом.
                </p>
              </div>
            </Col>
            <Col md={4} data-aos="flip-up" data-aos-delay="300">
              <div className={`${styles.clubCard} text-center`}>
                <FaUsers className={`fa-3x mb-3 ${styles.benefitIcon}`} />
                <h4>Сообщество</h4>
                <p>
                  Вы найдёте друзей среди родителей, которые понимают ваши
                  радости и трудности.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default ParentClubPage;
