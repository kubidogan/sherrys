// File: src/pages/BabysittingForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const BabysittingForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    childFirstName: "",
    childLastName: "",
    childPreferredName: "",
    parentFirstName: "",
    parentLastName: "",
    contactNumber: "",
    address: "",
    email: "",
    mobile: "",
    specialNeeds: "no",
    specialNeedsDetails: "",
    previouslyBabysat: "",
    childAge: "",
    language: "",
    additionalDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    setBookingData({ service: "Babysitting", ...form });
    navigate("/review");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Reserve Babysitting Service
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Child's Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Child's First Name
          </label>
          <input
            name="childFirstName"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.childFirstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Child's Last Name
          </label>
          <input
            name="childLastName"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.childLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Child's Preferred Name
          </label>
          <input
            name="childPreferredName"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.childPreferredName}
            onChange={handleChange}
          />
        </div>

        {/* Parent Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent First Name
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
            Parent Last Name
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
            Contact Number
          </label>
          <input
            name="contactNumber"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            name="address"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile
          </label>
          <input
            name="mobile"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Additional Questions */}
      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-1">
          Does your child have any special needs?
        </p>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="specialNeeds"
              value="no"
              checked={form.specialNeeds === "no"}
              onChange={handleChange}
              className="mr-2"
            />
            No
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="specialNeeds"
              value="yes"
              checked={form.specialNeeds === "yes"}
              onChange={handleChange}
              className="mr-2"
            />
            Yes
          </label>
        </div>
        {form.specialNeeds === "yes" && (
          <textarea
            name="specialNeedsDetails"
            placeholder="Please describe any special needs."
            className="mt-3 w-full border border-gray-300 p-3 rounded"
            rows={3}
            value={form.specialNeedsDetails}
            onChange={handleChange}
          ></textarea>
        )}
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-1">
          Has your child previously been babysat?
        </p>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="previouslyBabysat"
              value="yes"
              checked={form.previouslyBabysat === "yes"}
              onChange={handleChange}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="previouslyBabysat"
              value="no"
              checked={form.previouslyBabysat === "no"}
              onChange={handleChange}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How old is your child?
        </label>
        <select
          name="childAge"
          className="w-full border border-gray-300 p-3 rounded"
          value={form.childAge}
          onChange={handleChange}
        >
          <option value="">Select Age Range</option>
          <option value="0-1 years">0-1 years</option>
          <option value="2-4 years">2-4 years</option>
          <option value="5-8 years">5-8 years</option>
          <option value="10+ years">10+ years</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-1">
          What is your child’s preferred language?
        </p>
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value="English"
              checked={form.language === "English"}
              onChange={handleChange}
              className="mr-2"
            />
            English
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value="Turkish"
              checked={form.language === "Turkish"}
              onChange={handleChange}
              className="mr-2"
            />
            Turkish
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value="Other"
              checked={form.language === "Other"}
              onChange={handleChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any further details you'd like to share with the babysitter?
        </label>
        <textarea
          name="additionalDetails"
          className="w-full border border-gray-300 p-3 rounded"
          rows={4}
          value={form.additionalDetails}
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
  );
};

export default BabysittingForm;
