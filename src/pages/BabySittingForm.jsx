// File: src/pages/BabysittingForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { sendEmail } from "../utils/email";

/**
 * Generates HTML table rows from key-value pairs.
 * Only non-empty and non-N/A values are included.
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
      <h2 style="color: #007bff;">New Babysitting Reservation</h2>
      <table style="border-collapse: collapse; width: 100%; border:1px solid #ddd;">
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p style="margin-top:20px; font-size:12px; color:#999;">This email was generated automatically from your reservation system.</p>
    </div>
  `;
}

const BabysittingForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    childName: "",
    childAge: "",
    numberOfChildren: "",
    allergies: "no",
    allergyDetails: "",
    date: "",
    time: "",
    duration: "",
    mealPrep: "no",
    homeworkHelp: "no",
    bathingRequired: "no",
    preferredLanguage: "",
    petsInHome: "no",
    petDetails: "",
    houseRules: "",
    parentFirstName: "",
    parentLastName: "",
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
      service: "Babysitting",
      child_name: form.childName || "N/A",
      child_age: form.childAge || "N/A",
      number_of_children: form.numberOfChildren || "N/A",
      allergies: form.allergies || "N/A",
      allergy_details: form.allergyDetails || "N/A",
      date: form.date || "N/A",
      time: form.time || "N/A",
      duration: form.duration || "N/A",
      meal_prep: form.mealPrep || "N/A",
      homework_help: form.homeworkHelp || "N/A",
      bathing_required: form.bathingRequired || "N/A",
      preferred_language: form.preferredLanguage || "N/A",
      pets_in_home: form.petsInHome || "N/A",
      pet_details: form.petDetails || "N/A",
      house_rules: form.houseRules || "N/A",
      parent_first_name: form.parentFirstName || "N/A",
      parent_last_name: form.parentLastName || "N/A",
      email: form.email || "N/A",
      mobile: form.mobile || "N/A",
      address: form.address || "N/A",
      additional_notes: form.additionalNotes || "N/A",
      name: `${form.parentFirstName || "N/A"} ${form.parentLastName || ""}`,
      message: form.additionalNotes || "N/A",
    };

    const htmlMessage = buildEmailHtml(dataForEmail);

    const templateParams = {
      to_email: form.email,
      subject: "New Babysitting Reservation",
      html_message: htmlMessage,
    };

    console.log("Sending email with params:", templateParams);

    sendEmail(templateParams)
      .then((result) => {
        console.log("Email sent!", result.text);
        setBookingData({ service: "Babysitting", ...form });
        navigate("/review");
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Error sending email.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reserve Babysitting Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Child’s Name
            </label>
            <input
              name="childName"
              placeholder="E.g. Emma"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.childName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Child’s Age
            </label>
            <input
              name="childAge"
              placeholder="E.g. 5"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.childAge}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Children
            </label>
            <input
              name="numberOfChildren"
              placeholder="E.g. 2"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.numberOfChildren}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Any Allergies or Medical Conditions?
            </label>
            <select
              name="allergies"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.allergies}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {form.allergies === "yes" && (
              <textarea
                name="allergyDetails"
                placeholder="Describe allergies or conditions"
                className="mt-2 w-full border border-gray-300 p-3 rounded"
                rows={2}
                value={form.allergyDetails}
                onChange={handleChange}
              ></textarea>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="time"
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
              type="number"
              name="duration"
              placeholder="e.g. 4"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.duration}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do you require meal preparation?
            </label>
            <select
              name="mealPrep"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.mealPrep}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Help with homework or learning activities?
            </label>
            <select
              name="homeworkHelp"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.homeworkHelp}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Is bathing or changing children required?
            </label>
            <select
              name="bathingRequired"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.bathingRequired}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Language Spoken
            </label>
            <input
              name="preferredLanguage"
              placeholder="E.g. Turkish, English, Greek"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.preferredLanguage}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Any pets in the home?
            </label>
            <select
              name="petsInHome"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.petsInHome}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {form.petsInHome === "yes" && (
              <textarea
                name="petDetails"
                placeholder="Describe pets"
                className="mt-2 w-full border border-gray-300 p-3 rounded"
                rows={2}
                value={form.petDetails}
                onChange={handleChange}
              ></textarea>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Household rules or important instructions
            </label>
            <textarea
              name="houseRules"
              placeholder="e.g. no screen time, bedtime routine"
              className="w-full border border-gray-300 p-3 rounded"
              rows={3}
              value={form.houseRules}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <h3 className="text-lg font-bold mt-4 mb-2 text-gray-700">
          Parent / Guardian Info
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="parentFirstName"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.parentFirstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="parentLastName"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.parentLastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              name="mobile"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              name="address"
              placeholder="Optional"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              placeholder="Anything else the babysitter should know?"
              className="w-full border border-gray-300 p-3 rounded"
              rows={3}
              value={form.additionalNotes}
              onChange={handleChange}
            ></textarea>
          </div>
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

export default BabysittingForm;
