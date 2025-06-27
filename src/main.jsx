import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import ReservationFormPage from "./pages/ReservationFormPage";
import ReviewReservationPage from "./pages/ReviewReservationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { BookingProvider } from "./context/BookingContext";
import AboutPage from "./pages/AboutPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservation" element={<ReservationFormPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/review" element={<ReviewReservationPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
