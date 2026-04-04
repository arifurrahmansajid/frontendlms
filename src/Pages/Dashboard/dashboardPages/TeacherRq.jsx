import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { 
  FaCheck, 
  FaTimes, 
  FaUserGraduate, 
  FaChevronLeft, 
  FaChevronRight, 
  FaBriefcase, 
  FaGraduationCap 
} from "react-icons/fa";

const TeacherRq = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: counts } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/techerRqCount`);
      return res.data;
    },
  });

  const numOfData = counts?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: requests = [],
    isFetching,
    isRefetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["requests", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/rqTeacher?page=${currentPage - 1}&limit=${itemsPerPage}`
        );
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch requests."
        );
      }
    },
  });

  if (isFetching && !isRefetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
           <p className="text-xl font-bold text-red-600 mb-2">Error Loading Requests</p>
           <p className="text-red-500">{error.message || "An unknown error occurred."}</p>
           <button 
             onClick={() => refetch()} 
             className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
           >
             Try Again
           </button>
        </div>
      </div>
    );
  }

  const onApprove = (id) => {
    toast.promise(
      axiosSecure.patch(`/class-request/${id}?message=approved`),
      {
        pending: 'Processing approval...',
        success: {
          render() {
            refetch();
            return 'Teacher request approved successfully! 🎉';
          }
        },
        error: 'Failed to approve request. Please try again.'
      }
    );
  };

  const onReject = (id) => {
    toast.promise(
      axiosSecure.patch(`/class-request/${id}`),
      {
        pending: 'Processing rejection...',
        success: {
          render() {
            refetch();
            return 'Teacher request rejected.';
          }
        },
        error: 'Failed to reject request.'
      }
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Helmet>
        <title>EduHub | Teacher Requests</title>
      </Helmet>

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Teacher Applications
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Review and manage instructor applications
          </p>
        </div>

        {/* Items per page selector */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Show</span>
          <select 
            value={itemsPerPage} 
            onChange={handleItemsPerPageChange}
            className="bg-transparent border-0 focus:ring-0 text-gray-800 font-semibold cursor-pointer text-base"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span className="text-sm font-medium text-gray-500">per page</span>
        </div>
      </div>

      {/* Stats Card */}
      <div className="mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="p-4 bg-violet-100 rounded-2xl">
            <FaUserGraduate className="text-4xl text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Applications</p>
            <p className="text-5xl font-bold text-gray-900 mt-1">{numOfData}</p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest w-80">
                  Applicant
                </th>
                <th className="px-8 py-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Expertise
                </th>
                <th className="px-8 py-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-widest w-40">
                  Status
                </th>
                <th className="px-8 py-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-widest w-48">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-24">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <FaUserGraduate className="text-5xl text-gray-300" />
                      </div>
                      <p className="text-2xl font-semibold text-gray-400">No applications yet</p>
                      <p className="text-gray-500 mt-2">New teacher requests will appear here</p>
                    </div>
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr 
                    key={request._id} 
                    className="group hover:bg-violet-50/30 transition-all duration-200"
                  >
                    {/* Applicant */}
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={request.image}
                            alt={request.name}
                            className="w-16 h-16 object-cover rounded-2xl border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-violet-200 transition-all"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[2.5px] border-white 
                            ${request.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-xl text-gray-900 group-hover:text-violet-700 transition-colors">
                            {request.name}
                          </p>
                          <p className="text-gray-500 text-sm mt-1 font-medium">{request.category}</p>
                        </div>
                      </div>
                    </td>

                    {/* Expertise */}
                    <td className="px-8 py-7">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-700">
                          <FaBriefcase className="text-violet-500" />
                          <span className="font-semibold">{request.experience} Years Experience</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                          <FaGraduationCap className="text-gray-400" />
                          <span className="line-clamp-1">{request.title}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-7 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest
                          ${request.status === "pending"
                            ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
                            : request.status === "approved"
                            ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-rose-100 text-rose-700 ring-1 ring-rose-200"
                          }`}
                      >
                        <span className={`w-2 h-2 rounded-full 
                          ${request.status === "pending" ? "bg-amber-600 animate-ping" : 
                            request.status === "approved" ? "bg-emerald-600" : "bg-rose-600"}`}
                        />
                        {request.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-7 text-right">
                      {request.status === 'pending' ? (
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => onApprove(request._id)}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-2xl transition-all active:scale-95 shadow-md shadow-emerald-200"
                            title="Approve"
                          >
                            <FaCheck className="text-lg" />
                            <span>Approve</span>
                          </button>

                          <button
                            onClick={() => onReject(request._id)}
                            className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-2xl transition-all active:scale-95 shadow-md shadow-rose-200"
                            title="Reject"
                          >
                            <FaTimes className="text-lg" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="inline-block px-5 py-2.5 text-xs font-bold text-gray-400 bg-gray-100 rounded-2xl">
                          DECISION MADE
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {numberOfPages > 1 && (
          <div className="px-8 py-8 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-gray-600 font-medium">
              Page <span className="font-bold text-gray-900">{currentPage}</span> of {numberOfPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 transition-all"
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-1 px-2">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page + 1)}
                    className={`w-11 h-11 rounded-2xl font-semibold transition-all ${
                      currentPage === page + 1
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                        : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === numberOfPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherRq;