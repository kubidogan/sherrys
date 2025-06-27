// File: src/pages/ReservationFormPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useState } from "react";
import BabysittingForm from "./BabySittingForm";
import PetsForm from "./PetsForm";

const ReservationFormPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    service: state?.service?.name || "",
    date: "",
    time: "",
    duration: "",
    name: "",
    phone: "",
    email: "",
    extraDetails: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setBookingData(form);
    navigate("/review");
  };

  // ✅ Check if the selected service is Babysitting
  if (form.service === "Babysitting") {
    return <BabysittingForm />;
  }
  if (form.service === "Pets") {
    return <PetsForm />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reserve {form.service}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              name="date"
              type="date"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              name="time"
              type="time"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.time}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (hours)
            </label>
            <input
              name="duration"
              type="number"
              placeholder="e.g. 2"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.duration}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Details for {form.service}
          </label>
          <textarea
            name="extraDetails"
            rows={4}
            className="w-full border border-gray-300 p-3 rounded"
            placeholder={`Describe details for ${form.service}`}
            value={form.extraDetails}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#FFC107] hover:bg-[#FFA000] text-black font-bold py-3 rounded text-lg"
        >
          Review Reservation
        </button>
      </div>
    </div>
  );
};

export default ReservationFormPage;
