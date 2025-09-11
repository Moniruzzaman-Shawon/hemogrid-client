import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import bgImage from "../assets/images/banner-image-bg.jpg";

const Contact = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 py-12"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid gap-10 md:grid-cols-2 bg-white/20 rounded-2xl p-6 sm:p-10 shadow-xl">
        {/* Contact Info */}
        <div className="flex flex-col justify-center text-black text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 drop-shadow-lg">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base mb-6">
            Have questions or want to help? Reach out to us — we’re here to
            listen and respond as quickly as possible.
          </p>

          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <EnvelopeIcon className="w-5 h-5 text-black" />
              <span className="font-semibold sm:ml-2">Email:</span>
              <span>contact@hemogrid.com</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <PhoneIcon className="w-5 h-5 text-black" />
              <span className="font-semibold sm:ml-2">Phone:</span>
              <span>+880 1234 567890</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <MapPinIcon className="w-5 h-5 text-black" />
              <span className="font-semibold sm:ml-2">Address:</span>
              <span>123 Blood Drive Street, Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="flex flex-col gap-4 text-gray-900">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            rows="5"
            placeholder="Message"
            className="p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-red-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
