// File: src/pages/HousekeepingForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { sendEmail } from "../utils/email";

/**
 * Builds HTML rows for non-empty fields.
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
      <h2 style="color: #007bff;">New Housekeeping Reservation</h2>
      <table style="border-collapse: collapse; width: 100%; border:1px solid #ddd;">
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p style="margin-top:20px; font-size:12px; color:#999;">This email was generated automatically from your reservation system.</p>
    </div>
  `;
}

const HousekeepingForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    date: "",
    time: "",
    duration: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    propertyType: "",
    propertyTypeOther: "",
    bedrooms: "",
    bathrooms: "",
    propertySize: "",
    servicesRequired: [],
    suppliesProvided: "",
    preferredProducts: "",
    allergies: "no",
    allergiesDetails: "",
    pets: "no",
    petsDetails: "",
    areasToAvoid: "",
    specialInstructions: "",
  });

  const serviceOptions = [
    "General cleaning",
    "Deep cleaning",
    "Kitchen cleaning",
    "Bathroom cleaning",
    "Carpet cleaning",
    "Window cleaning",
    "Laundry / ironing",
    "Organizing / decluttering",
    "Post-construction cleaning",
    "Move-in / move-out cleaning",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => {
        const updated = checked
          ? [...prev.servicesRequired, value]
          : prev.servicesRequired.filter((s) => s !== value);
        return { ...prev, servicesRequired: updated };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!form.email || !form.mobile) {
      alert("Email and mobile are required.");
      return;
    }

    const dataForEmail = {
      service: "Housekeeping",
      date: form.date || "N/A",
      time: form.time || "N/A",
      duration: form.duration || "N/A",
      first_name: form.firstName || "N/A",
      last_name: form.lastName || "N/A",
      email: form.email || "N/A",
      mobile: form.mobile || "N/A",
      address: form.address || "N/A",
      property_type:
        form.propertyType === "Other"
          ? form.propertyTypeOther || "N/A"
          : form.propertyType || "N/A",
      bedrooms: form.bedrooms || "N/A",
      bathrooms: form.bathrooms || "N/A",
      property_size: form.propertySize || "N/A",
      services_required:
        form.servicesRequired.length > 0
          ? form.servicesRequired.join(", ")
          : "N/A",
      supplies_provided: form.suppliesProvided || "N/A",
      preferred_products: form.preferredProducts || "N/A",
      allergies: form.allergies || "N/A",
      allergies_details: form.allergiesDetails || "N/A",
      pets: form.pets || "N/A",
      pets_details: form.petsDetails || "N/A",
      areas_to_avoid: form.areasToAvoid || "N/A",
      special_instructions: form.specialInstructions || "N/A",
      name: `${form.firstName || "N/A"} ${form.lastName || ""}`,
      message: form.specialInstructions || "N/A",
    };

    const htmlMessage = buildEmailHtml(dataForEmail);

    const templateParams = {
      to_email: form.email,
      subject: "New Housekeeping Reservation",
      html_message: htmlMessage,
    };

    console.log("Sending email with:", templateParams);

    sendEmail(templateParams)
      .then((res) => {
        console.log("Email sent!", res.text);
        setBookingData({ service: "Housekeeping", ...form });
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
          Reserve Housekeeping Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="Date"
            className="border p-3 rounded w-full"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Time"
            className="border p-3 rounded w-full"
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (hours)"
            type="number"
            className="border p-3 rounded w-full"
          />
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 rounded w-full"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 rounded w-full"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded w-full"
            required
          />
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Service Address"
            className="border p-3 rounded w-full col-span-2"
          />
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
          {form.propertyType === "Other" && (
            <input
              name="propertyTypeOther"
              value={form.propertyTypeOther}
              onChange={handleChange}
              placeholder="Describe property type"
              className="border p-3 rounded w-full col-span-2"
            />
          )}
          <input
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Number of Bedrooms"
            type="number"
            className="border p-3 rounded w-full"
          />
          <input
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Number of Bathrooms"
            type="number"
            className="border p-3 rounded w-full"
          />
          <input
            name="propertySize"
            value={form.propertySize}
            onChange={handleChange}
            placeholder="Property Size (sq ft/m²)"
            type="number"
            className="border p-3 rounded w-full"
          />

          <div className="col-span-2">
            <label className="block font-medium text-gray-700 mb-2">
              Which services do you require?
            </label>
            <div className="flex flex-wrap gap-3">
              {serviceOptions.map((s) => (
                <label key={s} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={s}
                    checked={form.servicesRequired.includes(s)}
                    onChange={handleChange}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>
          <select
            name="suppliesProvided"
            value={form.suppliesProvided}
            onChange={handleChange}
            className="border p-3 rounded w-full col-span-2"
          >
            <option value="">Are cleaning supplies provided?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Partial">Partial</option>
          </select>
          <input
            name="preferredProducts"
            value={form.preferredProducts}
            onChange={handleChange}
            placeholder="Preferred cleaning products"
            className="border p-3 rounded w-full col-span-2"
          />

          <div className="col-span-2">
            <label className="block font-medium text-gray-700 mb-2">
              Does anyone have allergies to cleaning products?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="allergies"
                  value="yes"
                  checked={form.allergies === "yes"}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="allergies"
                  value="no"
                  checked={form.allergies === "no"}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
            {form.allergies === "yes" && (
              <textarea
                name="allergiesDetails"
                placeholder="Please describe allergies."
                className="mt-2 w-full border p-3 rounded"
                rows={3}
                value={form.allergiesDetails}
                onChange={handleChange}
              ></textarea>
            )}
          </div>

          <div className="col-span-2">
            <label className="block font-medium text-gray-700 mb-2">
              Pets on premises?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="pets"
                  value="yes"
                  checked={form.pets === "yes"}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="pets"
                  value="no"
                  checked={form.pets === "no"}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
            {form.pets === "yes" && (
              <textarea
                name="petsDetails"
                placeholder="Describe pets (species, number, etc.)"
                className="mt-2 w-full border p-3 rounded"
                rows={3}
                value={form.petsDetails}
                onChange={handleChange}
              ></textarea>
            )}
          </div>

          <textarea
            name="areasToAvoid"
            placeholder="Any specific areas to avoid cleaning?"
            className="border p-3 rounded w-full col-span-2"
            rows={3}
            value={form.areasToAvoid}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="specialInstructions"
            placeholder="Other special instructions or notes."
            className="border p-3 rounded w-full col-span-2"
            rows={4}
            value={form.specialInstructions}
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

export default HousekeepingForm;
