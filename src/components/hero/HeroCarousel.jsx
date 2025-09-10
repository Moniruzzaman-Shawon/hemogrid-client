import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CarouselSlide from "./CarouselSlide";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Find Blood Donors Nearby",
      subtitle: "Your quick action can save lives.",
      image: image1,
    },
    {
      title: "Join Hemogrid Community",
      subtitle: "Connect with donors and recipients easily.",
      image: image2,
    },
    {
      title: "Be a Lifesaver Today",
      subtitle: "Donate blood and make a difference.",
      image: image3,
    },
  ];

  return (
    <div>
      <div className="relative">
        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <CarouselSlide
                title={slide.title}
                subtitle={slide.subtitle}
                image={slide.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-center py-4">
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 my-4 rounded-full text-lg font-semibold shadow-lg transition">
          Search Donor
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
