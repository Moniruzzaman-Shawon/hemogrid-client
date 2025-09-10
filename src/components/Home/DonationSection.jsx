import bgImg from "../../assets/images/bg-red.jpg"

const DonationSection = () => {
  return (
    <section
      className="w-full h-[600px] bg-cover flex my-8 justify-center items-center text-center px-6"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="p-10 rounded-2xl max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 drop-shadow-lg">
          “Your Blood Can Be Someone’s Second Chance at Life”
        </h2>
        <p className="text-gray-900 text-lg mb-6">
          Join Hemogrid in building a community where no one suffers due to a
          lack of blood.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 my-4 rounded-full text-lg font-semibold shadow-lg transition">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default DonationSection;
