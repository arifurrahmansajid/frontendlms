import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import PreLoader from "../../../components/PreLoader";
import { useState } from "react";
import TeacherClsDetaisModal from "../../../components/TeacherClsDetaisModal";
import useContexHooks from "../../../useHooks/useContexHooks";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  FaUserCircle,
  FaEnvelope,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaChalkboardTeacher,
  FaTag,
} from "react-icons/fa";

const SeeProgressByAdmin = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContexHooks();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);

  const {
    data: classData,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/classes/${id}`);
      return result.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }

  const { title, name, email, price, description, image, status } = classData || {};

  const openModal = (classItem) => setSelectedClass(classItem);
  const closeModal = () => setSelectedClass(null);

  const onDelete = (deleteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-class/${deleteId}?email=${user?.email}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The class has been deleted.",
                icon: "success",
              });
              navigate(-1);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const statusConfig = {
    approved: {
      icon: <FaCheckCircle />,
      label: "Approved",
      classes: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dot: "bg-emerald-500",
    },
    rejected: {
      icon: <FaTimesCircle />,
      label: "Rejected",
      classes: "bg-red-50 text-red-500 border-red-100",
      dot: "bg-red-500",
    },
    pending: {
      icon: <FaClock />,
      label: "Pending Review",
      classes: "bg-amber-50 text-amber-600 border-amber-100",
      dot: "bg-amber-500",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Helmet>
        <title>EduHub | Class Progress</title>
      </Helmet>

      {/* ── Back Button + Breadcrumb ── */}
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#a435f0] transition-colors group"
        >
          <span className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:bg-[#a435f0] group-hover:border-[#a435f0] group-hover:text-white transition-all">
            <FaArrowLeft className="text-xs" />
          </span>
          Back to All Classes
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-400 truncate max-w-[200px]">{title}</span>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ── LEFT: Course Image + Quick Info ── */}
        <div className="xl:col-span-1 flex flex-col gap-6">

          {/* Image Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover"
              />
              {/* Status overlay badge */}
              <span
                className={`absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${currentStatus.classes}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot} animate-pulse`}></span>
                {currentStatus.label}
              </span>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-black text-gray-900 leading-snug">{title}</h1>

              <div className="mt-5 space-y-4">
                {/* Teacher name */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                    <FaChalkboardTeacher className="text-[#a435f0] text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Teacher</p>
                    <p className="text-sm font-bold text-gray-800">{name}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-blue-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{email}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <FaDollarSign className="text-emerald-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Price</p>
                    <p className="text-2xl font-black text-emerald-600">${price}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <FaTag className="text-gray-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</p>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${currentStatus.classes} px-3 py-1 rounded-full border mt-0.5`}>
                      {currentStatus.icon} {currentStatus.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Description + Actions ── */}
        <div className="xl:col-span-2 flex flex-col gap-6">

          {/* Description Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Course Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-base font-medium">
              {description}
            </p>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
              Admin Actions
            </h2>

            <div className="flex flex-wrap gap-4">
              {/* Update / Edit */}
              <button
                onClick={() => openModal(classData)}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-50 text-[#a435f0] font-bold text-sm rounded-2xl hover:bg-[#a435f0] hover:text-white transition-all active:scale-95 shadow-sm hover:shadow-lg hover:shadow-[#a435f0]/20 border border-violet-100 hover:border-transparent"
              >
                <FaEdit />
                Update Class
              </button>

              {/* Delete */}
              <button
                onClick={() => onDelete(classData?._id)}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3.5 bg-red-50 text-red-500 font-bold text-sm rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm hover:shadow-lg hover:shadow-red-200 border border-red-100 hover:border-transparent"
              >
                <FaTrash />
                Delete Class
              </button>

              {/* See Details — only if approved */}
              <Link
                to={`/dashboard/teacherSeeDetails/${classData?._id}`}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm rounded-2xl transition-all active:scale-95 border ${
                  status === "approved"
                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border-emerald-100 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-emerald-200"
                    : "bg-gray-50 text-gray-300 border-gray-100 pointer-events-none cursor-not-allowed"
                }`}
                onClick={(e) => status !== "approved" && e.preventDefault()}
              >
                <FaExternalLinkAlt className="text-xs" />
                See Details
              </Link>
            </div>

            {status !== "approved" && (
              <p className="mt-4 text-xs font-medium text-gray-400 flex items-center gap-1.5">
                <FaClock className="text-amber-400" />
                "See Details" is only available for approved classes.
              </p>
            )}
          </div>

          {/* Class ID Card */}
          <div className="bg-[#2d2f31] rounded-3xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Class ID</p>
              <p className="text-white font-mono font-bold text-sm">{classData?._id}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <FaChalkboardTeacher className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Update Modal ── */}
      {selectedClass && (
        <TeacherClsDetaisModal
          classData={selectedClass}
          refetch={refetch}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SeeProgressByAdmin;
