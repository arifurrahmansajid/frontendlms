import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Banner = () => {
  // High-resolution banner images (wide aspect ratio - perfect for hero sliders)
  const banners = [
    "https://picsum.photos/id/1015/1920/1080",   // Modern classroom / learning vibe
    "https://picsum.photos/id/201/1920/1080",    // Student studying with laptop
    "https://picsum.photos/id/1018/1920/1080",   // Abstract education / technology
    "https://picsum.photos/id/106/1920/1080",    // Professional learning environment
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        loop={true}
        spaceBetween={0}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation]}
        className="main-swiper h-[420px] md:h-[520px] lg:h-[620px] xl:h-[680px]"
        style={{
          "--swiper-navigation-color": "#ffffff",
          "--swiper-navigation-size": "28px",
        }}
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* High Quality Banner Image */}
              <img
                src={img}
                alt={`Premium online learning banner ${index + 1} - Expert courses and skill development`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Dark Gradient Overlay - Ensures excellent text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

              {/* Content Card - More User-Friendly & Modern */}
              <div className="absolute inset-0 flex items-center px-4 md:px-12 lg:px-20 xl:px-28">
                <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 lg:p-12 rounded-3xl shadow-2xl w-full max-w-full sm:max-w-sm md:max-w-md border border-white/60">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2f31] leading-[1.1] tracking-tighter mb-5">
                    Unlock your future with us
                  </h1>

                  <p className="text-[#2d2f31] text-base md:text-lg leading-relaxed mb-8 max-w-full sm:max-w-[380px]">
                    Learn from the best industry experts. Premium courses starting at just{" "}
                    <span className="font-semibold text-[#2d2f31]">$12.99</span> — offer ends today!
                  </p>

                  <button
                    className="group w-full justify-center bg-[#2d2f31] hover:bg-black text-white font-semibold py-4 px-6 md:px-10 rounded-2xl text-base tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Explore Courses Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Soft bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default Banner;