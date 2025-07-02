// File: src/pages/ElderlyCompanionshipForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { sendEmail } from "../utils/email";

const ElderlyCompanionshipForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    clientName: "",
    clientAge: "",
    mobilityLevel: "",
    medicalConditions: "",
    medicationAssistance: "no",
    personalCareRequired: "no",
    personalCareDetails: "",
    companionshipActivities: "",
    mealPreparation: "no",
    houseTasks: "no",
    preferredLanguage: "",
    date: "",
    time: "",
    duration: "",
    familyFirstName: "",
    familyLastName: "",
    email: "",
    mobile: "",
    address: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.mobile) {
      alert("Email and mobile are required.");
      return;
    }

    const dataForEmail = {
      service: "Elderly & Companionship",
      client_name: form.clientName || "N/A",
      client_age: form.clientAge || "N/A",
      mobility_level: form.mobilityLevel || "N/A",
      medical_conditions: form.medicalConditions || "N/A",
      medication_assistance: form.medicationAssistance || "N/A",
      personal_care_required: form.personalCareRequired || "N/A",
      personal_care_details: form.personalCareDetails || "N/A",
      companionship_activities: form.companionshipActivities || "N/A",
      meal_preparation: form.mealPreparation || "N/A",
      house_tasks: form.houseTasks || "N/A",
      preferred_language: form.preferredLanguage || "N/A",
      date: form.date || "N/A",
      time: form.time || "N/A",
      duration: form.duration || "N/A",
      family_first_name: form.familyFirstName || "N/A",
      family_last_name: form.familyLastName || "N/A",
      email: form.email || "N/A",
      mobile: form.mobile || "N/A",
      address: form.address || "N/A",
      additional_notes: form.additionalNotes || "N/A",
      name: `${form.familyFirstName || "N/A"} ${form.familyLastName || ""}`,
      message: form.additionalNotes || "N/A",
    };

    // Generate dynamic HTML
    const htmlMessage = buildEmailHtml(dataForEmail);

    const templateParams = {
      to_email: form.email,
      subject: "New Elderly & Companionship Reservation",
      html_message: htmlMessage,
    };

    console.log("Sending email with:", templateParams);

    sendEmail(templateParams)
      .then((res) => {
        console.log("Email sent!", res.text);
        setBookingData({ service: "Elderly & Companionship", ...form });
        navigate("/review");
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        alert("Error sending email.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reserve Elderly & Companionship Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            name="clientName"
            placeholder="Client's Full Name"
            className="border p-3 rounded w-full"
            value={form.clientName}
            onChange={handleChange}
          />
          <input
            name="clientAge"
            placeholder="Client's Age"
            className="border p-3 rounded w-full"
            value={form.clientAge}
            onChange={handleChange}
          />
          <select
            name="mobilityLevel"
            value={form.mobilityLevel}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            <option value="">Mobility Level</option>
            <option value="Fully mobile">Fully mobile</option>
            <option value="Needs assistance">Needs assistance</option>
            <option value="Wheelchair bound">Wheelchair bound</option>
            <option value="Bed bound">Bed bound</option>
          </select>
          <input
            name="medicalConditions"
            placeholder="Medical conditions (optional)"
            className="border p-3 rounded w-full"
            value={form.medicalConditions}
            onChange={handleChange}
          />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Does the client require assistance with medication?
            </label>
            <select
              name="medicationAssistance"
              value={form.medicationAssistance}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Does the client require personal care?
            </label>
            <select
              name="personalCareRequired"
              value={form.personalCareRequired}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {form.personalCareRequired === "yes" && (
              <textarea
                name="personalCareDetails"
                placeholder="Describe personal care required (e.g. bathing, dressing, toileting)"
                className="mt-2 w-full border p-3 rounded"
                rows={3}
                value={form.personalCareDetails}
                onChange={handleChange}
              ></textarea>
            )}
          </div>
          <input
            name="companionshipActivities"
            placeholder="Preferred activities (conversation, games, walks, etc.)"
            className="border p-3 rounded w-full col-span-2"
            value={form.companionshipActivities}
            onChange={handleChange}
          />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Is meal preparation required?
            </label>
            <select
              name="mealPreparation"
              value={form.mealPreparation}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Light house tasks needed?
            </label>
            <select
              name="houseTasks"
              value={form.houseTasks}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <input
            name="preferredLanguage"
            placeholder="Preferred language"
            className="border p-3 rounded w-full col-span-2"
            value={form.preferredLanguage}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="border p-3 rounded w-full"
            value={form.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            className="border p-3 rounded w-full"
            value={form.time}
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Duration (hours)"
            type="number"
            className="border p-3 rounded w-full"
            value={form.duration}
            onChange={handleChange}
          />

          <input
            name="familyFirstName"
            placeholder="Family Contact First Name"
            className="border p-3 rounded w-full"
            value={form.familyFirstName}
            onChange={handleChange}
          />
          <input
            name="familyLastName"
            placeholder="Family Contact Last Name"
            className="border p-3 rounded w-full"
            value={form.familyLastName}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Family Contact Email"
            className="border p-3 rounded w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="mobile"
            placeholder="Family Contact Mobile"
            className="border p-3 rounded w-full"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Service Address"
            className="border p-3 rounded w-full col-span-2"
            value={form.address}
            onChange={handleChange}
          />
          <textarea
            name="additionalNotes"
            placeholder="Any additional notes or instructions"
            className="border p-3 rounded w-full col-span-2"
            rows={3}
            value={form.additionalNotes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#FFC107] hover:bg-[#FFA000] text-black font-bold py-3 rounded text-lg mt-4"
        >
          Review Reservation
        </button>
      </div>
    </div>
  );
};

export default ElderlyCompanionshipForm;

/**
 * Helper: build dynamic HTML table for email body
 */
function buildEmailHtml(data) {
  let rows = "";
  for (const [key, value] of Object.entries(data)) {
    if (value && value !== "N/A") {
      rows += `
        <tr>
          <td style="padding:8px; background:#f7f7f7; font-weight:bold; border:1px solid #ddd;">${key.replaceAll(
            "_",
            " "
          )}</td>
          <td style="padding:8px; border:1px solid #ddd;">${value}</td>
        </tr>`;
    }
  }

  return `
    <div style="font-family: system-ui, sans-serif; font-size: 14px; color: #333;">
      <h2 style="color: #007bff;">New Elderly & Companionship Reservation</h2>
      <table style="border-collapse: collapse; width: 100%; border:1px solid #ddd;">
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p style="margin-top:20px; font-size:12px; color:#999;">
        This email was generated automatically from your reservation system.
      </p>
    </div>
  `;
}
