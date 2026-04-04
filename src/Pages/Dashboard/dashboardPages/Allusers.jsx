import { useState, useRef } from "react";
import PreLoader from "../../../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaUserShield, FaUsers, FaChevronLeft, FaChevronRight, FaAddressCard, FaEnvelope } from "react-icons/fa";

const Allusers = () => {
  const [searchOn, setSearchOn] = useState("");
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef(null);

  const { data: useCounts } = useQuery({
    queryKey: ["useCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/alluser-admin-count`);
      return res.data;
    },
  });

  const numOfData = useCounts?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: users = [],
    isFetching,
    isRefetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage, searchOn],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/alluser-admin?page=${
          currentPage - 1
        }&limit=${itemsPerPage}&search=${searchOn}`
      );
      return res.data;
    },
  });

  if (isFetching && !isRefetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
           <p className="text-xl font-bold text-red-600 mb-2">Error Loading Users</p>
           <p className="text-red-500">{error.message || "An unknown error occurred."}</p>
           <button onClick={() => refetch()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Try Again</button>
        </div>
      </div>
    );
  }

  const onSearch = () => {
    // Preserving the functionality of getting value from input
    // The user had: const value = document.querySelector("input[name='search']");
    // I'll keep it exactly as they had it to be safe, but via ref is cleaner if they allow it.
    // However, I'll stick to their exact logic to respect "do not change function".
    const value = document.querySelector("input[name='search']");
    setSearchOn(value.value);
    setCurrentPage(1);
  };

  const onMakeAdmin = (id) => {
    toast.promise(
      axiosSecure.patch(`/users/makeAdmin/${id}`),
      {
        pending: 'Updating user role...',
        success: {
          render({ data }) {
            if (data.data.modifiedCount > 0) {
              refetch();
              return 'User successfully promoted to Admin! 🛡️';
            }
            return 'No changes made.';
          }
        },
        error: 'Failed to update user role.'
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
        <title>EduHub | Manage Users</title>
      </Helmet>

      {/* Header & Search */}
      <div className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-600 mt-2 text-lg font-medium">Manage and monitor all platform members</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-[400px] group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a435f0] transition-colors" />
            <input
              type="text"
              name="search"
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#a435f0]/20 focus:border-[#a435f0] outline-none transition-all text-gray-700 font-medium"
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
          </div>
          <button
            onClick={onSearch}
            className="w-full sm:w-auto px-8 py-4 bg-[#2d2f31] text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:border-[#a435f0]/30 transition-all">
          <div className="p-4 bg-violet-100 rounded-2xl group-hover:bg-[#a435f0] transition-colors">
            <FaUsers className="text-3xl text-[#a435f0] group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
            <p className="text-4xl font-black text-gray-900 mt-1">{numOfData}</p>
          </div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</th>
                <th className="px-8 py-6 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">Role/Status</th>
                <th className="px-8 py-6 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-24 text-center">
                    <div className="flex flex-col items-center">
                      <FaUsers className="text-6xl text-gray-100 mb-4" />
                      <p className="text-2xl font-bold text-gray-400">No users matched your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((data) => (
                  <tr key={data._id} className="group hover:bg-gray-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={data.image || "https://i.ibb.co.com/8mPyLrB/user.png"}
                          alt={data.name}
                          className="w-14 h-14 object-cover rounded-2xl shadow-sm border-2 border-white group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-lg group-hover:text-[#a435f0] transition-colors">{data.name}</p>
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                            <FaAddressCard className="opacity-50" />
                            <span>ID: {data._id.slice(-6)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <FaEnvelope className="text-[#a435f0] opacity-50" />
                        {data.email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border-2 ${
                          data.isAdmin 
                            ? "bg-violet-50 text-violet-600 border-violet-100" 
                            : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}>
                          {data.isAdmin ? "Administrator" : "User / Student"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {data.isAdmin ? (
                        <span className="inline-flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl">
                          <FaUserShield /> Fully Authorized
                        </span>
                      ) : (
                        <button
                          onClick={() => onMakeAdmin(data._id)}
                          className="px-6 py-2.5 bg-[#a435f0] text-white text-xs font-bold rounded-xl hover:bg-[#8710d8] hover:shadow-lg hover:shadow-[#a435f0]/30 transition-all active:scale-95 uppercase tracking-widest"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination Footer */}
        <div className="bg-gray-50/50 px-8 py-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Show</p>
            <select 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 font-bold outline-none focus:ring-2 focus:ring-[#a435f0]/20"
            >
              <option value="10">10 Rows</option>
              <option value="20">20 Rows</option>
              <option value="30">30 Rows</option>
            </select>
            <p className="text-sm text-gray-500 font-medium">Page {currentPage} of {numberOfPages}</p>
          </div>

          {numberOfPages > 1 && (
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-[#2d2f31] hover:bg-[#2d2f31] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#2d2f31] transition-all shadow-sm"
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
                        ? "bg-[#a435f0] text-white shadow-lg shadow-[#a435f0]/30 border-transparent"
                        : "bg-white border border-gray-100 text-[#2d2f31] hover:bg-gray-50"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === numberOfPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-[#2d2f31] hover:bg-[#2d2f31] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#2d2f31] transition-all shadow-sm"
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

export default Allusers;
