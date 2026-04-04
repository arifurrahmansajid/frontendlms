import PropTypes from "prop-types";
import PreLoader from "./PreLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";
import { useState } from "react";
import AssignmentCheckModal from "./AssignmentCheckModal";
import { FaChevronLeft, FaChevronRight, FaClipboardCheck, FaRegCalendarAlt, FaFileAlt } from "react-icons/fa";

const TeacherClassAssignmentList = ({ classId }) => {
  const AxiosSecure = useAxiosSecure();
  const { user } = useContexHooks();
  const [openmodal, setOpenModal] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const {
    data: classAssignments = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classAssignments", classId, itemsPerPage, currentPage],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/find-assignment/${classId}?email=${user?.email}&page=${
          currentPage - 1
        }&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100 mt-6">
        <p className="text-rose-600 font-bold">Failed to load assignment data. {error.message || "Please refresh."}</p>
      </div>
    );
  }

  const numOfData = classAssignments?.length || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1;
  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const checkAssignmetSubmission = (assignmentId) => {
    setOpenModal(assignmentId);
  };
  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="space-y-8 mt-12 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Assignment <span className="text-indigo-600">Tracker</span></h2>
          <p className="text-gray-500 font-medium">Monitor, review, and evaluate student submissions</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-16">
                  #
                </th>
                <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Curriculum Module
                </th>
                <th className="px-6 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Max Points
                </th>
                <th className="px-6 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Activity
                </th>
                <th className="px-6 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Due Date
                </th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Administration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classAssignments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaFileAlt className="text-3xl text-gray-200" />
                      </div>
                      <p className="text-xl font-black text-gray-400">Empty Curriculum</p>
                      <p className="text-sm font-medium text-gray-400 mt-1 max-w-[200px]">Launch your first assignment to start tracking progress.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                classAssignments.map((assignment, index) => (
                  <tr key={assignment._id || index} className="group hover:bg-indigo-50/20 transition-all duration-200">
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-gray-300">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <p className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{assignment.title || "Untitled Module"}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 max-w-[300px] font-medium">{assignment.description || "No description provided."}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-black text-xs border border-gray-200 shadow-sm">
                        {assignment.mark || "0"} PTS
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="inline-flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-indigo-600">{assignment.submitedAssignments || 0}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Submissions</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs border border-rose-100 whitespace-nowrap">
                         <FaRegCalendarAlt className="opacity-70" /> 
                         {assignment.deadline || "TBA"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 font-black text-[10px] rounded-xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95 uppercase tracking-widest shadow-sm hover:shadow-indigo-100"
                        onClick={() => checkAssignmetSubmission(assignment._id)}
                      >
                        <FaClipboardCheck className="text-xs" />
                        Eval Submissions
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Controls */}
        <div className="bg-gray-50/30 px-8 py-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rows Per Page</p>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer text-sm shadow-sm transition-all"
            >
              <option value="10">10 Rows</option>
              <option value="20">20 Rows</option>
              <option value="30">30 Rows</option>
            </select>
          </div>

          {numberOfPages > 1 && (
            <div className="flex items-center gap-2 font-black">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:bg-gray-900 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <div className="flex items-center gap-2">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page + 1)}
                    className={`w-11 h-11 text-xs rounded-2xl transition-all ${
                      currentPage === page + 1
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 border-transparent"
                        : "bg-white border border-gray-100 text-gray-900 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === numberOfPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:bg-gray-900 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>

      {openmodal && (
        <AssignmentCheckModal
          assignmentId={openmodal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

TeacherClassAssignmentList.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default TeacherClassAssignmentList;

