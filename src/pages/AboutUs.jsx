import React from "react";
import bgImage from "../assets/images/banner-image-bg.jpg";

const AboutUs = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 sm:px-6 py-10 sm:py-12 flex flex-col items-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 "></div>

      {/* About Us Section */}
      <div className="relative z-10 bg-white/30 rounded-2xl shadow-xl w-full max-w-5xl p-6 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 drop-shadow-lg">
          About <span className="text-red-600">Hemogrid</span>
        </h1>
        <p className="mt-4 text-gray-800 leading-relaxed font-medium text-sm sm:text-base">
          Hemogrid is more than just a blood donation bank — it’s a movement
          built to save lives. Our platform connects verified donors, hospitals,
          and patients in need, ensuring that every drop of blood reaches those
          who need it most. We believe that no one should lose a loved one
          simply because help was out of reach.
        </p>

        {/* Three Columns - Stacks on small screens */}
        {/* Three Columns - Stacks on small screens, 2 columns on md, 3 on lg */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 sm:mt-10 text-left">
          <article className="p-5 sm:p-6 rounded-xl shadow-xl bg-white/40 ">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              What is Hemogrid?
            </h3>
            <p className="mt-2 sm:mt-3 text-gray-800 text-sm sm:text-base">
              A centralized platform for blood requests, donor profiles,
              hospitals, and donation records — making it simple to find the
              right donor, quickly and securely.
            </p>
          </article>

          <article className="p-5 sm:p-6 rounded-xl shadow-xl bg-white/40 ">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Why Hemogrid?
            </h3>
            <p className="mt-2 sm:mt-3 text-gray-800 text-sm sm:text-base">
              We remove delays during emergencies by instantly connecting donors
              and patients. Verified users build trust, and our transparent
              system ensures safe donations every time.
            </p>
          </article>

          {/* Center the last card on md screens */}
          <article className="p-5 sm:p-6 rounded-xl shadow-xl bg-white/40  sm:col-start-1 sm:col-end-3 lg:col-auto mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Our Mission
            </h3>
            <p className="mt-2 sm:mt-3 text-gray-800 text-sm sm:text-base">
              “Donating blood is donating life.” Hemogrid’s mission is to create
              a compassionate community where saving lives is a shared
              responsibility.
            </p>
          </article>
        </div>
      </div>

      {/* Donate Money Section */}
      <div className="relative z-10 text-black bg-white/20 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-5xl p-6 sm:p-10 text-center mt-10 sm:mt-12 ">
        <h2 className="text-2xl sm:text-3xl font-bold">Support Our Mission</h2>
        <p className="mt-4 leading-relaxed text-sm sm:text-lg">
          Not everyone can donate blood, but everyone can help save lives.
          <br className="hidden sm:block" />
          Your financial support empowers us to organize blood drives, provide
          safe storage, and expand our life-saving network. Together, we can
          ensure that no request goes unanswered.
        </p>

        <p className="mt-5 italic text-xs sm:text-sm text-black">
          “When you give from the heart, you don’t just change lives — you save
          them.”
        </p>

        <div className="mt-6 sm:mt-8">
          <a
            href="#donate-money"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
          >
            Fund Our Mission
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
