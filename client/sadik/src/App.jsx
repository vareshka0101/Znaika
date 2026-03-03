import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import TeachersPage from "./pages/TeachersPage";
import PricesPage from "./pages/PricesPage";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/prices" element={<PricesPage />} />
    </Routes>
  );
}

export default App;
