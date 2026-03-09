import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import AdminReviews from "../components/AdminReviews";

const AdminReviewsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <>
      <NavbarComponent />
      <AdminReviews />
      <FooterComponent />
    </>
  );
};

export default AdminReviewsPage;
