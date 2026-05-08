'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const images = [
  "/assets/luxury_swiss_alps_resort_1778230255676.png",
  "/assets/bali_tropical_villa_pool_1778230301858.png",
  "/assets/tokyo_cyberpunk_street_food_1778230357373.png",
  "/assets/santorini_minimalist_sunset_1778230524677.png",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
];

const TravelCarousel = () => {
  return (
    <div className="carousel-wrapper">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Travel ${index}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .carousel-wrapper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
          overflow: hidden;
        }

        .swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }

        :global(.swiper-slide) {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        }

        @media (min-width: 768px) {
          :global(.swiper-slide) {
            width: 450px;
            height: 600px;
          }
        }

        :global(.swiper-slide img) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default TravelCarousel;
