import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import useContexHooks from "../../../useHooks/useContexHooks";
import PreLoader from "../../../components/PreLoader";
import TeacherAddClassCard from "../../../components/TeacherAddClassCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaPlus, FaFolderOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContexHooks();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: classes,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["classes", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/findClass/${user?.email}?page=${
            currentPage - 1
          }&limit=${itemsPerPage}`
        );
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });

  const numOfData = classes?.length || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1;
  const pages = [...Array(numberOfPages).keys()];

  if (isFetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 max-w-md">
          <p className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</p>
          <p className="text-red-500 mb-6">{error.message || "Failed to load classes."}</p>
          <button 
            onClick={() => refetch()}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6 lg:p-10">
      <Helmet>
        <title>EduHub | My Classes</title>
      </Helmet>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            My <span className="text-indigo-600">Classes</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Manage and monitor your teaching curriculum</p>
        </div>

        <Link
          to="/dashboard/addclass"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <FaPlus />
          <span>Post New Class</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {classes?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <FaFolderOpen className="text-4xl text-indigo-200" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">No classes found</h3>
            <p className="text-gray-500 mt-2 mb-8 max-w-xs text-center">
              You haven't added any classes to your teaching profile yet.
            </p>
            <Link
              to="/dashboard/addclass"
              className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
            >
              Get Started Now
            </Link>
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((singleclass, idx) => (
                <TeacherAddClassCard
                  refetch={refetch}
                  key={singleclass._id || idx}
                  item={singleclass}
                />
              ))}
            </div>

            {/* Pagination & Controls */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-900 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-all"
                >
                  <option value="6">6 Items</option>
                  <option value="12">12 Items</option>
                  <option value="24">24 Items</option>
                </select>
              </div>

              {numberOfPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page + 1)}
                        className={`w-12 h-12 font-black text-sm rounded-2xl transition-all ${
                          currentPage === page + 1
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {page + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyClass;

