import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TeacherClassProgress from "../../../components/TeacherClassProgress";
import PreLoader from "../../../components/PreLoader";
import TeacherClassAssignmentList from "../../../components/TeacherClassAssignmetList";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";

const TeacherSeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosSecure = useAxiosSecure();
  
  const {
    data: classData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classData", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-[#f8f9fb]">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-rose-100 max-w-md">
          <p className="text-xl font-black text-rose-600 mb-2">Error Loading Data</p>
          <p className="text-gray-500 font-medium mb-6">{error.message || "An unknown error occurred."}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6 lg:p-10">
      <Helmet>
        <title>EduHub | Class Management</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* ── Back Button ── */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-4 py-2 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-gray-500 hover:text-indigo-600 active:scale-95"
          >
            <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
              <FaArrowLeft className="text-xs" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest">Back to Classes</span>
          </button>
        </div>

        <div className="space-y-12">
          {/* Progress Overview Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TeacherClassProgress classData={classData} />
          </section>

          {/* Assignments Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <TeacherClassAssignmentList classId={id} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherSeeDetails;

