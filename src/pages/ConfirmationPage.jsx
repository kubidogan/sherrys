// File: src/pages/ConfirmationPage.jsx
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2 text-green-700">
          Reservation Confirmed!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for reserving with Sherry's Care Services. We will call you
          shortly to confirm the details!
        </p>
        <Link
          to="/"
          className="inline-block bg-[#FFC107] hover:bg-[#FFA000] text-black font-bold py-3 px-6 rounded text-lg"
        >
          Reserve Another Service
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
