// File: src/pages/AboutPage.jsx
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Placeholder image */}
          <img
            src="https://via.placeholder.com/200x200.png?text=Sherry"
            alt="Sherry"
            className="w-40 h-40 rounded-full object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              About Sherry
            </h1>
            <p className="text-gray-700 mb-4">
              Hi! I’m Sherry, the founder of Sherry’s Care Services. With over
              <span className="font-semibold">
                {" "}
                10 years of professional experience
              </span>{" "}
              in childcare, elderly care, pet sitting, and housekeeping, I’m
              dedicated to making families’ lives easier and more joyful.
            </p>
            <p className="text-gray-700 mb-4">
              Whether you’re looking for a trustworthy babysitter, a companion
              for your elderly loved one, or someone to keep your home sparkling
              clean, my team and I are here to help with kindness, expertise,
              and a personal touch.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Certified childcare provider</li>
              <li>CPR and First Aid trained</li>
              <li>Experienced with pets of all kinds</li>
              <li>Passionate about supporting families and individuals</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Your family’s comfort and safety mean the world to me. Let’s
              connect and find the perfect care solution for your needs!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#FFC107] hover:bg-[#FFA000] text-black font-bold py-3 px-6 rounded text-lg"
            >
              Reserve now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
