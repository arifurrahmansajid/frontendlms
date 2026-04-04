import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../components/SectionHeader";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import Container from "../../Sharecomponent/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import AllClassesCard from "../AllClasses/AllClassesCard";

const TopEnroll = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: classes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/classes");
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return (
      <p className="text-2xl text-red-500">
        {error || "An unknown error occurred."}
      </p>
    );
  }

  return (
    <div className="py-16 bg-white">
      <Container>
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#2d2f31] mb-2">A broad selection of courses</h2>
            <p className="text-[#2d2f31] text-lg opacity-80">Choose from over 210,000 online video courses with new additions published every month</p>
          </div>
          <Swiper
            style={{
              "--swiper-navigation-color": "#2d2f31",
              "--swiper-pagination-color": "#2d2f31",
              "--swiper-navigation-size": "20px",
            }}
            loop={true}
            modules={[FreeMode, Navigation, Thumbs]}
            spaceBetween={24}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-12"
          >
            {classes?.map((item) => (
              <SwiperSlide key={item._id} className="h-auto">
                <AllClassesCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>

  );
};

export default TopEnroll;

