import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineArrowRight, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaUserCircle, FaEnvelope, FaTag } from "react-icons/fa";
import TeacherClsDetaisModal from "./TeacherClsDetaisModal";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TeacherAddClassCard = ({ item, refetch }) => {
  const { title, name, email, price, description, image, status, _id } = item;
  const [selectedClass, setSelectedClass] = useState(null);
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();

  const openModal = (classData) => {
    setSelectedClass(classData);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-class/${id}?email=${user?.email}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your class has been removed.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                background: "#ffffff",
                customClass: {
                  popup: 'rounded-3xl'
                }
              });
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const statusStyles = {
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <div className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/40">
      {/* Image Overlay Header */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
          {status}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white/20">
          <FaTag className="text-indigo-600 text-xs" />
          <span className="text-sm font-black text-gray-900">${price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h2>
        
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <FaUserCircle className="text-indigo-500 text-sm" />
            </div>
            <span className="text-sm font-semibold truncate">{name}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <FaEnvelope className="text-slate-400 text-xs" />
            </div>
            <span className="text-xs font-medium truncate">{email}</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Improved Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => openModal(item)}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 font-bold text-xs py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 active:scale-95"
          >
            <AiOutlineEdit className="text-base" />
            Update
          </button>

          <button
            onClick={() => onDelete(_id)}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-50 text-rose-600 font-bold text-xs py-3 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300 active:scale-95"
          >
            <AiOutlineDelete className="text-base" />
            Delete
          </button>

          <Link
            to={status === "approved" ? `/dashboard/teacherSeeDetails/${_id}` : "#"}
            className={`w-full inline-flex items-center justify-center gap-2 font-bold text-xs py-3 rounded-xl transition-all duration-300 ${
              status === "approved"
                ? "bg-[#2d2f31] text-white hover:bg-black shadow-lg shadow-gray-200"
                : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
            }`}
          >
            <span>Class Details</span>
            <AiOutlineArrowRight className="text-sm" />
          </Link>
        </div>
      </div>

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

TeacherAddClassCard.propTypes = {
  item: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TeacherAddClassCard;

