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

  const [formErrors, setFormErrors] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
  });

  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const validateName = (name) => {
    if (!name || name.trim() === "") return "Это поле обязательно";

    const allowedChars =
      "абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz -";
    const lowerName = name.toLowerCase();

    for (let i = 0; i < lowerName.length; i++) {
      if (!allowedChars.includes(lowerName[i])) {
        return "Имя может содержать только буквы, пробелы и дефисы";
      }
    }

    return "";
  };

  const validatePhone = (phone) => {
    if (!phone || phone.trim() === "") return "Телефон обязателен";

    const allowedChars = "0123456789+ ()-";

    for (let i = 0; i < phone.length; i++) {
      if (!allowedChars.includes(phone[i])) {
        return "Телефон может содержать только цифры, +, пробелы, скобки и дефисы";
      }
    }

    let digitCount = 0;
    for (let i = 0; i < phone.length; i++) {
      if (phone[i] >= "0" && phone[i] <= "9") {
        digitCount++;
      }
    }

    if (digitCount < 10) {
      return "Телефон должен содержать минимум 10 цифр";
    }

    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") return "";

    const hasAt = email.includes("@");
    const hasDot = email.includes(".");
    const atPosition = email.indexOf("@");
    const lastDotPosition = email.lastIndexOf(".");

    if (!hasAt || !hasDot) {
      return "Email должен содержать @";
    }

    if (atPosition === 0) {
      return "Email должен содержать символы до @";
    }

    if (lastDotPosition < atPosition) {
      return "Email должен содержать точку после @";
    }

    if (lastDotPosition === email.length - 1) {
      return "Email должен содержать символы после последней точки";
    }

    return "";
  };

  const validateAge = (age) => {
    if (!age) return "Выберите возраст ребенка";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "parentName":
      case "childName":
        return validateName(value);
      case "phone":
        return validatePhone(value);
      case "email":
        return validateEmail(value);
      case "childAge":
        return validateAge(value);
      default:
        return "";
    }
  };

  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;

    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const fieldsToValidate = ["parentName", "childName", "childAge", "phone"];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, registrationForm[field]);
      errors[field] = error;
      if (error) {
        isValid = false;
      }
    });

    if (registrationForm.email) {
      const emailError = validateEmail(registrationForm.email);
      errors.email = emailError;
      if (emailError) {
        isValid = false;
      }
    }

    setFormErrors(errors);

    const touched = {};
    Object.keys(registrationForm).forEach((key) => {
      touched[key] = true;
    });
    setTouchedFields(touched);

    return isValid;
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
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
      setFormErrors({});
      setTouchedFields({});
      setShowRegistrationModal(false);
    } else {
      alert("Пожалуйста, исправьте ошибки в форме перед отправкой");
    }
  };

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

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
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center my-5 p-5 cta-block" data-aos="zoom-in">
            <h2 className="display-7 mb-3">
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
                    onBlur={handleFieldBlur}
                    isInvalid={
                      touchedFields.parentName && !!formErrors.parentName
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.parentName}
                  </Form.Control.Feedback>
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
                    onBlur={handleFieldBlur}
                    isInvalid={
                      touchedFields.childName && !!formErrors.childName
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.childName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Возраст ребенка *</Form.Label>
                  <Form.Select
                    name="childAge"
                    value={registrationForm.childAge}
                    onChange={handleRegistrationInputChange}
                    onBlur={handleFieldBlur}
                    isInvalid={touchedFields.childAge && !!formErrors.childAge}
                    required
                  >
                    <option value="">Выберите возраст</option>
                    <option value="3-4">3-4 года</option>
                    <option value="4-5">4-5 лет</option>
                    <option value="5-6">5-6 лет</option>
                    <option value="6-7">6-7 лет</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.childAge}
                  </Form.Control.Feedback>
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
                    onBlur={handleFieldBlur}
                    isInvalid={touchedFields.phone && !!formErrors.phone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phone}
                  </Form.Control.Feedback>
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
                    onBlur={handleFieldBlur}
                    isInvalid={touchedFields.email && !!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
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
