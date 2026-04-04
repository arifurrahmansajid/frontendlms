import PropTypes from "prop-types";
import { useState } from "react";
import { FaUserGraduate, FaClipboardList, FaFileUpload, FaPlus } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import TeacherCreateAsignModal from "./TeacherCreateAsignModal";
import { Helmet } from "react-helmet-async";

const TeacherClassProgress = ({ classData }) => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (classId) => {
    setOpenModal(classId);
  };
  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>EduHub | Class Progress</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Class <span className="text-indigo-600">Analytics</span>
          </h2>
          <p className="text-gray-500 font-medium">Real-time overview of student interaction and participation</p>
        </div>

        <button
          onClick={() => handleOpenModal(classData._id)}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Total Enrollment Card */}
        <div className="relative group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="relative flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <FaUserGraduate />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Enrollments</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">{classData.enroll}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg">Active Students</span>
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                   U{i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Assignments Card */}
        <div className="relative group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="relative flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <FaClipboardList />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Modules</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">{classData.assignments}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div className="bg-indigo-600 h-full rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest text-center">Curriculum Status (65%)</p>
          </div>
        </div>

        {/* Total Submissions Card */}
        <div className="relative group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="relative flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <FaFileUpload />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Submissions</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">
                {classData.submitedAssignments}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-500">+12% from last week</span>
            <span className="text-gray-400">Total Activity</span>
          </div>
        </div>
      </div>

      {openModal && (
        <TeacherCreateAsignModal classId={openModal} closeModal={closeModal} />
      )}
    </div>
  );
};

TeacherClassProgress.propTypes = {
  classData: PropTypes.object.isRequired,
};

export default TeacherClassProgress;

