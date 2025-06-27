// File: src/pages/ReviewReservationPage.jsx
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const ReviewReservationPage = () => {
  const { bookingData } = useBooking();
  const navigate = useNavigate();
  const [breedImage, setBreedImage] = useState(null);

  useEffect(() => {
    const fetchBreedImage = async () => {
      if (
        bookingData?.service === "Pets" &&
        bookingData.petType === "Dog" &&
        bookingData.dogBreed
      ) {
        try {
          const response = await fetch(
            `https://dog.ceo/api/breed/${bookingData.dogBreed.toLowerCase()}/images/random`
          );
          const data = await response.json();
          if (data.status === "success") {
            setBreedImage(data.message);
          }
        } catch (error) {
          console.error("Error fetching dog image:", error);
        }
      }
    };

    fetchBreedImage();
  }, [bookingData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* LEFT: Image */}
        <div className="md:w-1/2 h-72 md:h-auto">
          {breedImage ? (
            <img
              src={breedImage}
              alt={bookingData.dogBreed}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-center text-sm">
              No preview image available.
            </div>
          )}
        </div>

        {/* RIGHT: Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {bookingData.petName
                ? bookingData.petName
                : "Review Your Reservation"}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {bookingData.service} Service
            </p>

            {/* Date / Time block */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-gray-50 rounded-lg p-3 flex flex-col items-center">
                <CalendarDaysIcon className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-sm text-gray-700">
                  {bookingData.date || "-"}
                </span>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3 flex flex-col items-center">
                <ClockIcon className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-sm text-gray-700">
                  {bookingData.time || "-"}
                </span>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3 flex flex-col items-center">
                <ClockIcon className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-sm text-gray-700">
                  {bookingData.duration ? `${bookingData.duration}h` : "-"}
                </span>
              </div>
            </div>

            {/* Other fields */}
            <ul className="text-gray-700 text-sm space-y-2">
              {bookingData.petType && (
                <li>
                  <span className="font-medium">Pet Type:</span>{" "}
                  {bookingData.petType}
                </li>
              )}
              {bookingData.dogBreed && (
                <li>
                  <span className="font-medium">Dog Breed:</span>{" "}
                  {bookingData.dogBreed}
                </li>
              )}
              {bookingData.otherBreed && (
                <li>
                  <span className="font-medium">Breed:</span>{" "}
                  {bookingData.otherBreed}
                </li>
              )}
              {bookingData.petAge && (
                <li>
                  <span className="font-medium">Pet Age:</span>{" "}
                  {bookingData.petAge}
                </li>
              )}
              {bookingData.friendlyWithChildren && (
                <li>
                  <span className="font-medium">Friendly with children:</span>{" "}
                  {bookingData.friendlyWithChildren}
                </li>
              )}
              {bookingData.specialRequirements === "yes" &&
                bookingData.specialRequirementsDetails && (
                  <li>
                    <span className="font-medium">Special Requirements:</span>{" "}
                    {bookingData.specialRequirementsDetails}
                  </li>
                )}
              {bookingData.additionalDetails && (
                <li>
                  <span className="font-medium">Additional Details:</span>{" "}
                  {bookingData.additionalDetails}
                </li>
              )}
              {/* Owner info */}
              {(bookingData.ownerFirstName ||
                bookingData.ownerLastName ||
                bookingData.email ||
                bookingData.mobile) && (
                <>
                  <li className="mt-4 text-gray-500 uppercase text-xs">
                    Owner Details
                  </li>
                  {bookingData.ownerFirstName && (
                    <li>
                      <UserIcon className="inline h-4 w-4 text-gray-500 mr-1" />
                      {bookingData.ownerFirstName} {bookingData.ownerLastName}
                    </li>
                  )}
                  {bookingData.email && (
                    <li>
                      <EnvelopeIcon className="inline h-4 w-4 text-gray-500 mr-1" />
                      {bookingData.email}
                    </li>
                  )}
                  {bookingData.mobile && (
                    <li>
                      <PhoneIcon className="inline h-4 w-4 text-gray-500 mr-1" />
                      {bookingData.mobile}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          <button
            onClick={() => navigate("/confirmation")}
            className="mt-6 w-full bg-[#FFC107] hover:bg-[#FFA000] text-black font-bold py-3 rounded text-lg"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewReservationPage;
