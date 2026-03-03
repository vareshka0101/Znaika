import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<div>О нас</div>} />
      <Route path="/contacts" element={<div>Контакты</div>} />
    </Routes>
  );
}

export default App;
