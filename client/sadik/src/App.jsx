import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import TeachersPage from "./pages/TeachersPage";
import PricesPage from "./pages/PricesPage";
import GalleryPage from "./pages/GalleryPage";
import ClassesPage from "./pages/ClassesPage";
import ProgramsPage from "./pages/ProgramsPage";
import EventsPage from "./pages/EventsPage";
import ParentClubPage from "./pages/ParentClubPage";
import ContactsPage from "./pages/ContactsPage";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/prices" element={<PricesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/parent-club" element={<ParentClubPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  );
}

export default App;
