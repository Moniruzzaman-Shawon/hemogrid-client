import PropTypes from "prop-types";

const CarouselSlide = ({ title, subtitle, image }) => {
  return (
    <section
      className="w-full h-[600px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"

    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-gray-700 my-4 text-lg">{subtitle}</p>
          
        </div>
        

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="max-w-full md:max-w-md "
            src={image}
            alt={title}
          />
        </div>
      </div>
    </section>
  );
};

// PropTypes to remove warnings
CarouselSlide.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CarouselSlide;
