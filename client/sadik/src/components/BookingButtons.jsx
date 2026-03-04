import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const BookingButtons = ({
  onBookingClick,
  onExcursionClick,
  className = "",
}) => {
  return (
    <div className={`d-flex gap-3 ${className}`}>
      <Button
        variant="primary"
        size="lg"
        className="px-5"
        onClick={onBookingClick}
      >
        Записаться
      </Button>
      <Button
        variant="excursion"
        size="lg"
        className="px-4"
        style={{
          backgroundColor: "#58b4ae",
          borderColor: "#58b4ae",
          color: "white",
        }}
        onClick={onExcursionClick}
      >
        Экскурсия
      </Button>
    </div>
  );
};

BookingButtons.propTypes = {
  onBookingClick: PropTypes.func.isRequired,
  onExcursionClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default BookingButtons;
