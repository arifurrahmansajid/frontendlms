import React from "react";
import Container from "../../Sharecomponent/Container";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaGraduationCap, FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

const InstructorCTA = () => {
  const axiosPublic = useAxiosPublic();
  
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["approvedTeachersCTA"],
    queryFn: async () => {
      const res = await axiosPublic.get("/find-approved-teacher");
      return res.data;
    },
  });

  return (
    <section className="py-16 bg-white dark:bg-[#0f172a] transition-all duration-500 overflow-hidden relative">
      {/* Decorative gradient background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[100px] -mr-64 -mt-64 opacity-60" />
      
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* Left: Advertising / Content Side */}
          <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1 pt-6">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                <FaGraduationCap className="text-sm" />
                Global Instructor Program
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2d2f31] dark:text-gray-100 leading-[1.1] tracking-tight">
                Empower Your <span className="text-indigo-600">Expertise</span> <br /> 
                & Reach Millions
              </h2>
              
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xl">
                Instructors from around the world teach millions of learners on EduHub. We provide the tools to build your personal brand and share your knowledge globally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                   <FaCheckCircle className="text-emerald-500" />
                </div>
                <div>
                   <p className="font-black text-gray-900 dark:text-gray-200 uppercase tracking-tighter text-sm mb-1">Global Reach</p>
                   <p className="text-sm text-gray-400 font-medium">Teach students in 180+ countries.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                   <FaCheckCircle className="text-indigo-600" />
                </div>
                <div>
                   <p className="font-black text-gray-900 dark:text-gray-200 uppercase tracking-tighter text-sm mb-1">Modern Platform</p>
                   <p className="text-sm text-gray-400 font-medium">State-of-the-art course management.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link 
                to="/techon"
                className="group px-10 py-5 bg-[#2d2f31] dark:bg-white text-white dark:text-[#2d2f31] font-black text-sm uppercase tracking-widest hover:bg-black dark:hover:bg-gray-100 transition-all rounded-[1.5rem] shadow-2xl flex items-center gap-3 active:scale-95"
              >
                Start teaching today
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Dynamic Teacher Profile Showcase */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative p-6">
               {/* Background circle decorative */}
               <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full scale-110 blur-2xl" />
               
               {isLoading ? (
                 <div className="h-[450px] w-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                 </div>
               ) : (
                 <div className="max-w-[550px] mx-auto lg:ml-auto lg:mr-0">
                    <Swiper
                      effect={"cards"}
                      grabCursor={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      modules={[EffectCards, Autoplay]}
                      className="mySwiper overflow-visible"
                    >
                      {teachers?.map((teacher) => (
                        <SwiperSlide key={teacher._id} className="rounded-[2.5rem] shadow-3xl">
                           <div className="relative group bg-white dark:bg-[#1e293b] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500">
                             {/* Header Card Info */}
                             <div className="absolute top-6 right-6 z-20">
                                <span className="px-5 py-2.5 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-2xl text-[11px] font-black text-indigo-600 uppercase tracking-widest shadow-xl border border-gray-100 dark:border-white/5">
                                   Top rated
                                </span>
                             </div>

                             <div className="h-[520px] overflow-hidden">
                                <img 
                                  src={teacher.image} 
                                  alt={teacher.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                             </div>
                             
                             <div className="p-10 space-y-5">
                                <div className="space-y-1.5">
                                   <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em]">{teacher.category || "Lead Instructor"}</p>
                                   <h4 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{teacher.name}</h4>
                                </div>
                                <div className="flex items-center gap-2.5 text-amber-400">
                                   <div className="flex gap-1">
                                      {[1,2,3,4,5].map(i => <FaStar key={i} className="text-sm" />)}
                                   </div>
                                   <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">(4.9k)</span>
                                </div>
                             </div>
                           </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                    {/* Visual hint for swiping */}
                    <div className="mt-10 flex items-center justify-center lg:justify-end gap-3 text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em] animate-pulse">
                      <div className="h-[2px] w-8 bg-gray-200 dark:bg-gray-800" />
                      Dynamic expert roster
                    </div>
                 </div>
               )}
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
};

export default InstructorCTA;

