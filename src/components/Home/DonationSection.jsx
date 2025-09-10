import bgImg from "../../assets/images/bg-red.jpg";

const DonationSection = () => {
  return (
    <section
      className="w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] flex justify-center items-center text-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "150%", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-6 sm:p-10 rounded-2xl max-w-3xl  w-full mx-0">
        <h2 className="text-3xl sm:text-2xl md:text-5xl font-bold text-black mb-4 drop-shadow-lg">
          “Your Blood Can Be Someone’s Second Chance at Life”
        </h2>
        <p className="text-gray-900 text-base sm:text-lg mb-6">
          Join Hemogrid in building a community where no one suffers due to a
          lack of blood.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 my-4 rounded-full text-lg font-semibold shadow-lg transition">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default DonationSection;
