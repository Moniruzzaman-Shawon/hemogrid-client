// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CarouselSlide from "./CarouselSlide";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Donate Blood, Save Precious Lives",
      subtitle: "A single donation can give someone a second chance at life.",
      image: image1,
    },
    {
      title: "Connect With Trusted Donors",
      subtitle:
        "Hemogrid makes it simple to find and connect with blood donors near you.",
      image: image2,
    },
    {
      title: "Join Our Life-Saving Community",
      subtitle: "Together, we can ensure no one suffers due to blood shortage.",
      image: image3,
    },
  ];

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
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
    </>
  );
};

export default HeroCarousel;
