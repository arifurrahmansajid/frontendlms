import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaChalkboardTeacher,
  FaBookOpen,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AllAdminClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: classCount } = useQuery({
    queryKey: ["classCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminClassPagination`);
      return res.data;
    },
  });

  const numOfData = classCount?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: classes,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["classes", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getClasses-forAdmin?page=${currentPage - 1}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <p className="text-xl font-bold text-red-600 mb-2">Error Loading Classes</p>
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

  const onReject = (id) => {
    axiosSecure
      .patch(`/approved-reject-class/${id}?message=reject`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Successfully rejected the class");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const onApprove = (id) => {
    axiosSecure
      .patch(`/approved-reject-class/${id}?message=approved`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Successfully approved the class");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    if (!status || status === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100">
          <FaClock className="text-[8px]" /> Pending
        </span>
      );
    }
    if (status === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
          <FaCheckCircle className="text-[8px]" /> Approved
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 border border-red-100">
        <FaTimesCircle className="text-[8px]" /> Rejected
      </span>
    );
  };

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Helmet>
        <title>EduHub | All Classes</title>
      </Helmet>

      {/* ── Page Header ── */}
      <div className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Class Management
          </h1>
          <p className="text-gray-500 mt-2 text-base font-medium">
            Review, approve or reject course submissions from teachers
          </p>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 group hover:border-[#a435f0]/30 transition-all">
          <div className="p-4 bg-violet-100 rounded-2xl group-hover:bg-[#a435f0] transition-colors">
            <FaBookOpen className="text-2xl text-[#a435f0] group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Classes</p>
            <p className="text-4xl font-black text-gray-900 mt-1">{numOfData}</p>
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 group hover:border-emerald-300 transition-all">
          <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-emerald-500 transition-colors">
            <FaCheckCircle className="text-2xl text-emerald-500 group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Approved</p>
            <p className="text-4xl font-black text-gray-900 mt-1">
              {classes?.filter((c) => c.status === "approved").length ?? "—"}
            </p>
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 group hover:border-amber-300 transition-all">
          <div className="p-4 bg-amber-100 rounded-2xl group-hover:bg-amber-400 transition-colors">
            <FaClock className="text-2xl text-amber-500 group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending Review</p>
            <p className="text-4xl font-black text-gray-900 mt-1">
              {classes?.filter((c) => !c.status || c.status === "pending").length ?? "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Classes Table Card ── */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Course
                </th>
                <th className="px-6 py-6 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Teacher
                </th>
                <th className="px-6 py-6 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-6 py-6 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-6 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Progress
                </th>
                <th className="px-6 py-6 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!classes || classes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FaBookOpen className="text-6xl text-gray-100" />
                      <p className="text-2xl font-bold text-gray-300">No classes found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                classes.map((classItem) => (
                  <tr
                    key={classItem._id}
                    className="group hover:bg-gray-50/50 transition-all duration-200"
                  >
                    {/* Course info */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-16 h-16 object-cover rounded-2xl shadow-sm border-2 border-white group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#a435f0] transition-colors line-clamp-2 max-w-[180px]">
                            {classItem.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <FaChalkboardTeacher className="text-[#a435f0] text-[10px] opacity-60" />
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                              #{classItem._id?.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Teacher email */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-gray-600 truncate max-w-[160px]">
                        {classItem.email}
                      </p>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-500 line-clamp-2 max-w-[200px] leading-relaxed">
                        {classItem.description}
                      </p>
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-5 text-center">
                      {getStatusBadge(classItem.status)}
                    </td>

                    {/* See Progress */}
                    <td className="px-6 py-5 text-center">
                      <Link
                        to={`/dashboard/seeprogress/${classItem._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-[#a435f0] text-xs font-bold rounded-xl hover:bg-[#a435f0] hover:text-white transition-all active:scale-95 uppercase tracking-widest"
                      >
                        <FaEye className="text-[10px]" />
                        See Progress
                      </Link>
                    </td>

                    {/* Approve / Reject actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onApprove(classItem._id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest"
                        >
                          <FaCheck className="text-[10px]" />
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(classItem._id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 text-xs font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest"
                        >
                          <FaTimes className="text-[10px]" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="bg-gray-50/50 px-8 py-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Show</p>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 font-bold outline-none focus:ring-2 focus:ring-[#a435f0]/20 cursor-pointer"
            >
              <option value="10">10 Rows</option>
              <option value="20">20 Rows</option>
              <option value="30">30 Rows</option>
            </select>
            <p className="text-sm text-gray-400 font-medium">
              Page {currentPage} of {numberOfPages || 1}
            </p>
          </div>

          {numberOfPages > 1 && (
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-[#2d2f31] hover:bg-[#2d2f31] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <FaChevronLeft />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page + 1)}
                    className={`w-11 h-11 font-bold rounded-2xl transition-all ${
                      currentPage === page + 1
                        ? "bg-[#a435f0] text-white shadow-lg shadow-[#a435f0]/30"
                        : "bg-white border border-gray-100 text-[#2d2f31] hover:bg-gray-50"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === numberOfPages}
                onClick={() => {
                  if (currentPage < numberOfPages) handlePageChange(currentPage + 1);
                }}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-[#2d2f31] hover:bg-[#2d2f31] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAdminClasses;
