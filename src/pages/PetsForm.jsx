// File: src/pages/PetsForm.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const PetsForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    petName: "",
    petAge: "",
    petType: "",
    dogBreed: "",
    otherBreed: "",
    friendlyWithChildren: "",
    specialRequirements: "no",
    specialRequirementsDetails: "",
    date: "",
    time: "",
    duration: "",
    ownerFirstName: "",
    ownerLastName: "",
    email: "",
    mobile: "",
    additionalDetails: "",
  });

  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    if (form.petType === "Dog") {
      fetch("https://dog.ceo/api/breeds/list/all")
        .then((res) => res.json())
        .then((data) => {
          const breeds = Object.keys(data.message);
          setDogBreeds(breeds);
        })
        .catch((error) => console.error("Error fetching dog breeds:", error));
    }
  }, [form.petType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!form.email || !form.mobile) {
      alert("Email and mobile are required.");
      return;
    }
    setBookingData({ service: "Pets", ...form });
    navigate("/review");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reserve Pet Care Service
        </h2>

        {/* Pet Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Name
            </label>
            <input
              name="petName"
              placeholder="E.g. Bella"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.petName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Age
            </label>
            <input
              name="petAge"
              placeholder="E.g. 3"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.petAge}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What pet are you bringing?
            </label>
            <div className="flex gap-4">
              {["Dog", "Cat", "Other"].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="petType"
                    value={type}
                    checked={form.petType === type}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {form.petType === "Dog" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Dog Breed
              </label>
              <select
                name="dogBreed"
                className="w-full border border-gray-300 p-3 rounded"
                value={form.dogBreed}
                onChange={handleChange}
              >
                <option value="">Select a breed</option>
                {dogBreeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed.charAt(0).toUpperCase() + breed.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(form.petType === "Cat" || form.petType === "Other") && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Breed
              </label>
              <input
                name="otherBreed"
                placeholder="Enter breed"
                className="w-full border border-gray-300 p-3 rounded"
                value={form.otherBreed}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {/* More Details */}
        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-1">
            Is your pet friendly with children?
          </p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="friendlyWithChildren"
                value="yes"
                checked={form.friendlyWithChildren === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="friendlyWithChildren"
                value="no"
                checked={form.friendlyWithChildren === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-1">
            Does your pet have any special requirements?
          </p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="specialRequirements"
                value="no"
                checked={form.specialRequirements === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialRequirements"
                value="yes"
                checked={form.specialRequirements === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
          </div>
          {form.specialRequirements === "yes" && (
            <textarea
              name="specialRequirementsDetails"
              placeholder="Please describe special requirements."
              className="mt-3 w-full border border-gray-300 p-3 rounded"
              rows={3}
              value={form.specialRequirementsDetails}
              onChange={handleChange}
            ></textarea>
          )}
        </div>

        {/* Date and Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
              Time
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
              placeholder="e.g. 2"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.duration}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner First Name
            </label>
            <input
              name="ownerFirstName"
              placeholder="Your first name"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.ownerFirstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Last Name
            </label>
            <input
              name="ownerLastName"
              placeholder="Your last name"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.ownerLastName}
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
              placeholder="you@example.com"
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
              placeholder="Your phone number"
              className="w-full border border-gray-300 p-3 rounded"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional details for carer about your pet
          </label>
          <textarea
            name="additionalDetails"
            placeholder="Tell us anything else we should know!"
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
    </div>
  );
};

export default PetsForm;
