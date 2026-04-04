import { FaChalkboardTeacher } from "react-icons/fa";
import Lottie from "lottie-react";
import teacherLottie from "./LottieFiles/teacher.json";
import Container from "../../Sharecomponent/Container";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../Sharecomponent/Button";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

const Teacher = () => {
  const axiousPublic = useAxiosPublic();
  const {
    data: teachers,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await axiousPublic.get(`/find-approved-teacher`);
      return res.data;
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
    <section className="bg-gradient-to-r shadow-xl py-3 overflow-hidden">
      <Container>
        <SectionHeader title={"Join As Teacher"} />
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Lottie Animation */}
          <div className="w-full w-max-[200px] lg:w-1/2">
            <Lottie
              animationData={teacherLottie}
              loop={true}
              className="w-full mx-auto"
            />
          </div>

          {/* Right: Swiper Component */}
          <div className="w-full lg:w-1/2">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-full mx-auto p-2"
            >
              {teachers.map((teacher) => (
                <SwiperSlide key={teacher._id}>
                  <div className="card card-compact bg-base-100 shadow-xl w-full ">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                      Meet Our Amazing Teachers
                    </h2>
                    <figure>
                      <img
                        src={teacher.image}
                        alt="teacher"
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-lg">{teacher?.name}</h3>
                      <p className="text-gray-600">{teacher?.category}</p>
                      <div className="flex">
                        <Button
                          text="Become a Teacher"
                          width="100%"
                          link="/techon"
                          logo={<FaChalkboardTeacher />}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Teacher;

