// File: src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "babysitting",
    name: "Babysitting",
    icon: "👶",
    desc: "Professional babysitting services tailored to your family’s needs.",
    bgColor: "#E3F2FD",
  },
  {
    id: "babies-pets",
    name: "Pets",
    icon: "🐶",
    desc: "Experienced care for beloved pets.",
    bgColor: "#E0F7FA",
  },
  {
    id: "housekeeping",
    name: "Housekeeping",
    icon: "🏠",
    desc: "Keep your home sparkling clean and organized.",
    bgColor: "#F3E5F5",
  },
  {
    id: "elderly",
    name: "Elderly & Companionship",
    icon: "❤️",
    desc: "Caring companionship and support for elderly loved ones.",
    bgColor: "#FFF9C4",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleSelect = (service) => {
    navigate("/reservation", { state: { service } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
        <img
          src="/assets/new.png"
          alt="Sherry's Care Services Logo"
          className="w-full max-w-[200px] md:max-w-[250px] mb-4"
        />
        <p className="text-white text-sm md:text-base font-medium opacity-80 mb-6">
          Babysitting &bull; Housekeeping &bull; Elderly Care &amp;
          Companionship
        </p>
      </section>

      {/* Services Section */}
      <section className="py-10 px-4 max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-blue-300 p-6 transform transition hover:scale-105 hover:border-blue-500"
              style={{ backgroundColor: s.bgColor }}
            >
              <div className="text-5xl text-blue-700 text-center mb-4">
                {s.icon}
              </div>
              <h3 className="text-[#007BFF] font-bold text-center text-lg mb-2">
                {s.name}
              </h3>
              <p className="text-gray-700 text-center text-sm mb-4">{s.desc}</p>
              <button
                onClick={() => handleSelect(s)}
                className="bg-[#FFC107] hover:bg-[#FFA000] text-black font-bold py-2 px-4 rounded w-full"
              >
                Reserve
              </button>
            </div>
          ))}
        </div>

        {/* About Button centered below services */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/about")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded shadow text-lg"
          >
            About Sherry's Care Services
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
