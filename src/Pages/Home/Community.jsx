import { useQuery } from "@tanstack/react-query";
import ComunityCard from "../../components/ComunityCard";
import PreLoader from "../../components/PreLoader";
import SectionHeader from "../../components/SectionHeader";
import Container from "../../Sharecomponent/Container";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import community from "../../assets/comunity.png";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: counts,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/totalCount");
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return <p className="text-2xl text-red-500 text-center py-10">{error.message}</p>;
  }

  return (
    <section className="py-20 bg-[#f7f9fa] dark:bg-gray-800/10 transition-colors duration-300">
      <Container>
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeader 
            title="Growing every day" 
            subtitle="Our community is fueled by passionate learners and expert mentors"
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 px-4">
            {/* Stat Item: Classes */}
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-bold text-[#2d2f31] dark:text-gray-100 mb-2">
                {counts?.allClasses || 0}
              </span>
              <span className="text-lg font-medium text-[#6a6f73] dark:text-gray-400">
                Online courses
              </span>
            </div>

            {/* Stat Item: Users */}
            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-[#d1d7dc] dark:border-gray-700 py-10 sm:py-0">
              <span className="text-5xl md:text-6xl font-bold text-[#2d2f31] dark:text-gray-100 mb-2">
                {counts?.alluser || 0}+
              </span>
              <span className="text-lg font-medium text-[#6a6f73] dark:text-gray-400">
                Educators & Students
              </span>
            </div>

            {/* Stat Item: Enrollments */}
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-bold text-[#2d2f31] dark:text-gray-100 mb-2">
                {counts?.totalEnroll || 0}
              </span>
              <span className="text-lg font-medium text-[#6a6f73] dark:text-gray-400">
                Course enrollments
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );

};

export default Community;