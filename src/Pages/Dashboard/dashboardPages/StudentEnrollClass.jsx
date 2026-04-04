import { useQuery } from "@tanstack/react-query";
import EnrollClassCard from "../../../components/EnrollClassCard";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import PreLoader from "../../../components/PreLoader";
import useContexHooks from "../../../useHooks/useContexHooks";
import SectionHeader from "../../../components/SectionHeader";
import { Helmet } from "react-helmet-async";

const StudentEnrollClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContexHooks();

  console.log(user?.email);
  const {
    data: classes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/Enrollclasses/${user?.email}`);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });
  // console.log(classes);

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
    <div>
      <Helmet>
        <title>EduHub | Enroll Classes</title>
      </Helmet>
      <div className="p-5 relative">
        <SectionHeader title={"Your Enroll Classes"} />
        {classes?.length === 0 ? (
          <p className="text-red-600 text-xl text-center mt-4">
            You Have Not Enrolled Yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((singleclass, idx) => (
              <EnrollClassCard key={idx} item={singleclass} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEnrollClass;
