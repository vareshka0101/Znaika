import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Accordion } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import "./PricesPage.css";

const PricesPage = () => {
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
                  <Button
                    variant={plan.buttonVariant}
                    className="w-100 rounded-pill py-3"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center my-5 p-5 cta-block" data-aos="zoom-in">
            <h2 className="display-5 mb-3">
              Собираетесь ли Вы записать своего ребенка в детский сад?
            </h2>
            <Button variant="primary" size="lg" className="mt-3 px-5">
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

                <div className="contact-card p-4 rounded-4 mt-4">
                  <h4 className="mb-3">Остались вопросы?</h4>
                  <p className="mb-3">
                    Свяжитесь с нами любым удобным способом — мы с радостью
                    проконсультируем вас!
                  </p>
                  <div className="d-flex gap-3">
                    <Button variant="primary" className="rounded-pill">
                      <FaPhoneAlt className="me-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline-dark" className="rounded-pill">
                      <FaEnvelope className="me-2" />
                      Написать
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <FooterComponent />
    </>
  );
};

export default PricesPage;
