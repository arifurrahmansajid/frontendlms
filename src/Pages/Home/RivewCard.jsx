import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import StarRatings from "react-star-ratings";
import SectionHeader from "../../components/SectionHeader";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import { EffectCoverflow, Pagination } from "swiper/modules";
import Container from "../../Sharecomponent/Container";

const RivewCard = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: feedbacks,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return <p className="text-2xl text-red-500">{error}</p>;
  }

  return (
    <div className="py-16 bg-gradient-to-br ">
      <Container>
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title={"Student Reviews"} 
            subtitle={"What our students say about us"}
            center
          />

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper pb-12"
          >
            {(Array.isArray(feedbacks) ? feedbacks : []).map((feedback) => (
              <SwiperSlide key={feedback._id}>
                <div className="h-full flex flex-col">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-1 flex flex-col transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] p-4 text-center">
                      <h3 className="text-lg font-bold text-white">
                        {feedback.title}
                      </h3>
                    </div>
                    
                    {/* User Image */}
                    <div className="flex justify-center -mt-12 relative z-10">
                      <div className="rounded-full p-1 bg-white shadow-lg">
                        <img
                          src={feedback.photo}
                          alt={feedback.name}
                          className="w-20 h-20 object-cover rounded-full border-4 border-white"
                        />
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
                        {feedback.name}
                      </h2>
                      
                      {/* Rating */}
                      <div className="flex justify-center mb-4">
                        <StarRatings
                          starDimension="20px"
                          starSpacing="2px"
                          starRatedColor="#FFD700"
                          starEmptyColor="#E0E0E0"
                          numberOfStars={5}
                          rating={feedback.rating}
                          name="rating"
                        />
                      </div>
                      
                      {/* Review Text */}
                      <div className="bg-gray-50 rounded-lg p-4 flex-1">
                        <p className="text-gray-600 italic text-center">
                          "{feedback.description}"
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative Element */}
                    <div className="bg-gray-100 py-2 px-4 text-center">
                      <svg 
                        className="w-6 h-6 mx-auto text-[#4CAF50]" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default RivewCard;