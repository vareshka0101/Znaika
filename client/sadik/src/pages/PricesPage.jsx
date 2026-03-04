import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Modal,
  Form,
} from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaChild } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import "./PricesPage.css";

const PricesPage = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    preferredClass: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const pricingPlans = [
    {
      id: 1,
      title: "Базовый",
      price: "35 000",
      period: "/мес",
      description: "Первая половина дня с 8:00 до 13:00",
      features: [
        { text: "Пребывание с 8:00 до 13:00", included: true },
        { text: "Завтрак и второй завтрак", included: true },
        { text: "Развивающие занятия", included: true },
        { text: "Прогулка на свежем воздухе", included: true },
        { text: "Игры и творчество", included: true },
        { text: "Дневной сон", included: false },
        { text: "Обед", included: false },
      ],
      buttonText: "ВЫБРАТЬ ПЛАН",
      buttonVariant: "outline-warning",
      popular: false,
    },
    {
      id: 2,
      title: "Стандарт +",
      price: "48 000",
      period: "/мес",
      description: "Первая половина дня + дополнительное занятие",
      features: [
        { text: "Пребывание с 8:00 до 13:00", included: true },
        { text: "Завтрак и второй завтрак", included: true },
        { text: "Развивающие занятия", included: true },
        { text: "Прогулка на свежем воздухе", included: true },
        { text: "Игры и творчество", included: true },
        { text: "Доп. занятие (английский/каллиграфия)", included: true },
        { text: "Индивидуальный подход", included: true },
        { text: "Дневной сон", included: false },
      ],
      buttonText: "ВЫБРАТЬ ПЛАН",
      buttonVariant: "primary",
      popular: true,
    },
    {
      id: 3,
      title: "Полный день",
      price: "65 000",
      period: "/мес",
      description: "Полноценный день с 8:00 до 18:00",
      features: [
        { text: "Пребывание с 8:00 до 18:00", included: true },
        { text: "5-разовое питание", included: true },
        { text: "Развивающие занятия", included: true },
        { text: "Прогулки (утро/вечер)", included: true },
        { text: "Дневной сон", included: true },
        { text: "Игры и творчество", included: true },
        { text: "Подготовка к школе", included: true },
      ],
      buttonText: "ВЫБРАТЬ ПЛАН",
      buttonVariant: "outline-warning",
      popular: false,
    },
  ];

  const faqGeneral = [
    {
      id: 1,
      question: "Какие услуги вы предлагаете?",
      answer:
        "Мы предлагаем полный спектр услуг по уходу и развитию детей от 3 до 6 лет: развивающие занятия, подготовка к школе, английский язык, творческие мастерские, музыка, физкультура, логопед и психолог.",
    },
    {
      id: 2,
      question: "Как работает ваше ценообразование?",
      answer:
        "Стоимость зависит от выбранного тарифа и дополнительных занятий. Все цены фиксированы на учебный год, индексация не чаще одного раза в год.",
    },
    {
      id: 3,
      question: "Как я могу записать ребенка?",
      answer:
        "Вы можете записаться по телефону +7 (495) 666-33-99, через форму на сайте или лично посетить наш сад в рабочее время.",
    },
    {
      id: 4,
      question: "Могу ли я отменить регистрацию?",
      answer:
        "Да, вы можете отменить регистрацию за 2 недели до планируемой даты начала посещения. Внесите предоплату за первый месяц, она будет возвращена в полном объеме.",
    },
    {
      id: 5,
      question: "Могу ли я прийти лично для регистрации?",
      answer:
        "Конечно! Мы всегда рады гостям. Ждем вас по адресу: ул. Весенняя, 15 с 9:00 до 18:00 в будние дни.",
    },
  ];

  const faqPayment = [
    {
      id: 6,
      question: "Какие способы оплаты вы принимаете?",
      answer:
        "Мы принимаем оплату наличными, банковской картой, по QR-коду, а также безналичный расчет для юридических лиц с предоставлением всех закрывающих документов.",
    },
    {
      id: 7,
      question: "Существуют ли какие-либо дополнительные сборы?",
      answer:
        "Нет, все сборы включены в стоимость тарифа. Дополнительно оплачиваются только экскурсии и праздничные мероприятия (по желанию).",
    },
    {
      id: 8,
      question: "Есть ли скидки на второго ребенка?",
      answer:
        "Да, мы предоставляем скидку 10% на посещение для второго ребенка из одной семьи.",
    },
    {
      id: 9,
      question: "Как производится возврат при пропусках?",
      answer:
        "При пропуске по болезни (со справкой) производится перерасчет за пропущенные дни. При пропуске без уважительной причины оплата не возвращается.",
    },
  ];

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log("Registration form submitted:", registrationForm);
    alert(
      "Спасибо за заявку! Мы свяжемся с вами в ближайшее время для уточнения деталей.",
    );
    setRegistrationForm({
      parentName: "",
      childName: "",
      childAge: "",
      phone: "",
      email: "",
      preferredClass: "",
      message: "",
    });
    setShowRegistrationModal(false);
  };

  return (
    <>
      <NavbarComponent />

      <section className="prices-page py-5">
        <Container>
          <h1 className="display-4 text-center mb-2" data-aos="fade-down">
            Выберите свой тарифный план
          </h1>
          <p className="text-center text-muted mb-5" data-aos="fade-up">
            Гибкие варианты посещения для вашего ребенка
          </p>

          <Row className="g-4 mb-5">
            {pricingPlans.map((plan, index) => (
              <Col
                key={plan.id}
                md={4}
                data-aos="flip-up"
                data-aos-delay={100 + index * 100}
              >
                <div
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                >
                  {plan.popular && (
                    <div className="popular-badge">ПОПУЛЯРНЫЙ</div>
                  )}
                  <h3 className="pricing-title">{plan.title}</h3>
                  <div className="pricing-price">
                    {plan.price} ₽ <small>{plan.period}</small>
                  </div>
                  <p className="pricing-desc">{plan.description}</p>
                  <ul className="pricing-features">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        {feature.included ? (
                          <FaCheckCircle className="text-success me-2" />
                        ) : (
                          <FaTimesCircle className="text-muted me-2" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center my-5 p-5 cta-block" data-aos="zoom-in">
            <h2 className="display-5 mb-3">
              Собираетесь ли Вы записать своего ребенка в детский сад?
            </h2>
            <Button
              variant="primary"
              size="lg"
              className="mt-3 px-5"
              onClick={openRegistrationModal}
            >
              Записаться
            </Button>
          </div>

          <div className="faq-section mt-5" data-aos="fade-up">
            <h2 className="display-5 text-center mb-5">Вопросы и Ответы</h2>

            <Row>
              <Col lg={6}>
                <h3 className="faq-category">Общая информация</h3>
                <Accordion defaultActiveKey="0" className="mb-5">
                  {faqGeneral.map((item, index) => (
                    <Accordion.Item key={item.id} eventKey={index.toString()}>
                      <Accordion.Header>{item.question}</Accordion.Header>
                      <Accordion.Body>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>

              <Col lg={6}>
                <h3 className="faq-category">Оплата и выставление счетов</h3>
                <Accordion defaultActiveKey="0" className="mb-5">
                  {faqPayment.map((item, index) => (
                    <Accordion.Item key={item.id} eventKey={index.toString()}>
                      <Accordion.Header>{item.question}</Accordion.Header>
                      <Accordion.Body>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <Modal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        size="lg"
        centered
        dialogClassName="registration-modal"
      >
        <Modal.Header closeButton className="registration-modal-header">
          <Modal.Title as="h3" className="registration-modal-title">
            <FaChild className="me-2" style={{ color: "#ff8a5c" }} />
            Запись в детский сад
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted mb-4">
            Заполните форму ниже, и мы свяжемся с вами для уточнения деталей и
            приглашения на экскурсию
          </p>
          <Form onSubmit={handleRegistrationSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ваше имя *</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    placeholder="Иванов Иван"
                    value={registrationForm.parentName}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Имя ребенка *</Form.Label>
                  <Form.Control
                    type="text"
                    name="childName"
                    placeholder="Петров Петя"
                    value={registrationForm.childName}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Возраст ребенка *</Form.Label>
                  <Form.Select
                    name="childAge"
                    value={registrationForm.childAge}
                    onChange={handleRegistrationInputChange}
                    required
                  >
                    <option value="">Выберите возраст</option>
                    <option value="3-4">3-4 года</option>
                    <option value="4-5">4-5 лет</option>
                    <option value="5-6">5-6 лет</option>
                    <option value="6-7">6-7 лет</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Телефон *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={registrationForm.phone}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ivan@example.com"
                    value={registrationForm.email}
                    onChange={handleRegistrationInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Предпочитаемое направление</Form.Label>
                  <Form.Select
                    name="preferredClass"
                    value={registrationForm.preferredClass}
                    onChange={handleRegistrationInputChange}
                  >
                    <option value="">Выберите направление</option>
                    <option value="Каллиграфия">Каллиграфия</option>
                    <option value="Художественный класс">
                      Художественный класс
                    </option>
                    <option value="Английский язык">Английский язык</option>
                    <option value="Класс танцев">Класс танцев</option>
                    <option value="Театральная студия">
                      Театральная студия
                    </option>
                    <option value="Робототехника">Робототехника</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Дополнительная информация</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    placeholder="Ваши пожелания или вопросы"
                    value={registrationForm.message}
                    onChange={handleRegistrationInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Я согласен на обработку персональных данных"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="text-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  className="px-5 py-3"
                  style={{ borderRadius: "40px" }}
                >
                  Отправить заявку
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default PricesPage;
