import { useQuery } from "@tanstack/react-query";
import Container from "../../Sharecomponent/Container";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import { useEffect, useState } from "react";
import AllClassesCard from "./AllClassesCard";
import { Helmet } from "react-helmet-async";
import { FaFilter, FaSearch, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import useContexHooks from "../../useHooks/useContexHooks";
import { useSearchParams } from "react-router-dom";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { togol } = useContexHooks();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search state — initialise from URL param so navbar search flows in
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [activeSearch, setActiveSearch] = useState(searchParams.get("search") || "");

  // When the URL param changes (e.g. user searches from navbar), sync state
  useEffect(() => {
    const paramSearch = searchParams.get("search") || "";
    setSearchInput(paramSearch);
    setActiveSearch(paramSearch);
    setCurrentPage(1);
  }, [searchParams]);

  const {
    data: counts,
    isFetching: isFetchingCounts,
  } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/totalCount");
      return res.data;
    },
  });

  const numOfData = counts?.allClasses || 0;

  const {
    data: allClasses,
    isFetching: isFetchingClasses,
    error: classesError,
  } = useQuery({
    queryKey: ["allclasses", currentPage, itemsPerPage, activeSearch],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allclasses?page=${currentPage - 1}&limit=${itemsPerPage}${activeSearch ? `&search=${encodeURIComponent(activeSearch)}` : ""}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // Client-side filter fallback (if backend doesn't support search param yet)
  const filteredClasses = activeSearch
    ? (allClasses || []).filter((item) => {
        const q = activeSearch.toLowerCase();
        return (
          item.title?.toLowerCase().includes(q) ||
          item.name?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.teacherName?.toLowerCase().includes(q)
        );
      })
    : allClasses;

  const numberOfPages = activeSearch
    ? 1  // client-side filter shows all results on one page
    : Math.ceil(numOfData / itemsPerPage) || 1;

  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setActiveSearch(trimmed);
    setCurrentPage(1);
    if (trimmed) {
      setSearchParams({ search: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setActiveSearch("");
    setCurrentPage(1);
    setSearchParams({});
  };

  if (isFetchingCounts || isFetchingClasses) {
    return <PreLoader />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-20 ${togol ? "bg-[#f7f9fa]" : "bg-[#111827]"}`}>
      <Helmet>
        <title>EduHub | Explore Courses</title>
      </Helmet>

      {/* Premium Header */}
      <div className="bg-[#2d2f31] py-12 md:py-20 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#a435f0]/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <Container>
          <div className="max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              A broad selection of courses
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Choose from over {numOfData} online video courses with new additions published every month. Master the skills that matter.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div className="flex flex-wrap items-center gap-4">
              <button className={`flex items-center gap-2 px-6 py-3 border-2 font-bold transition-all ${
                togol
                  ? "border-[#2d2f31] text-[#2d2f31] hover:bg-gray-100"
                  : "border-gray-500 text-gray-300 hover:bg-gray-800"
              }`}>
                <FaFilter className="text-sm" />
                Filter
              </button>

              {/* ── Working Search Input ── */}
              <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search courses..."
                    className={`pl-12 pr-10 py-3 border w-[300px] outline-none focus:border-[#a435f0] transition-colors ${
                      togol
                        ? "bg-white border-[#d1d7dc] text-[#2d2f31]"
                        : "bg-[#1e1e2e] border-gray-700 text-white"
                    }`}
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  {activeSearch && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="ml-2 px-5 py-3 bg-[#a435f0] text-white font-bold text-sm hover:bg-[#8710d8] transition-colors"
                >
                  Go
                </button>
              </form>
            </div>

            <div className={`flex items-center gap-4 text-sm font-bold ${
              togol ? "text-[#6a6f73]" : "text-gray-400"
            }`}>
              <span className="uppercase tracking-widest">Show:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className={`border px-4 py-2 outline-none focus:border-[#a435f0] cursor-pointer ${
                  togol
                    ? "bg-white border-[#d1d7dc] text-[#2d2f31]"
                    : "bg-[#1e1e2e] border-gray-700 text-white"
                }`}
              >
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
                <option value="36">36 per page</option>
              </select>
              <span className={`font-bold ml-2 ${
                togol ? "text-[#2d2f31]" : "text-white"
              }`}>
                {activeSearch ? `${filteredClasses?.length || 0} results` : `${numOfData} Courses Found`}
              </span>
            </div>
          </div>

          {/* Active search banner */}
          {activeSearch && (
            <div className={`flex items-center gap-3 mb-8 px-5 py-3 rounded-lg ${
              togol ? "bg-[#a435f0]/10 text-[#2d2f31]" : "bg-[#a435f0]/10 text-white"
            }`}>
              <FaSearch className="text-[#a435f0] flex-shrink-0" />
              <span className="text-sm font-medium">
                Showing results for <strong>&quot;{activeSearch}&quot;</strong>
                {filteredClasses?.length === 0 && " — No courses found."}
              </span>
              <button
                onClick={handleClearSearch}
                className="ml-auto text-xs font-bold text-[#a435f0] hover:underline flex items-center gap-1"
              >
                <FaTimes className="text-[10px]" /> Clear
              </button>
            </div>
          )}

          {/* Grid Layout */}
          {filteredClasses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filteredClasses.map((item) => (
                <AllClassesCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            !isFetchingClasses && (
              <div className="text-center py-24">
                <FaSearch className={`text-5xl mx-auto mb-4 ${togol ? "text-gray-300" : "text-gray-600"}`} />
                <p className={`text-xl font-bold ${togol ? "text-[#2d2f31]" : "text-white"}`}>
                  No courses found
                </p>
                <p className={`text-sm mt-2 ${togol ? "text-gray-500" : "text-gray-400"}`}>
                  Try a different search term or browse all courses.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="mt-5 px-6 py-2.5 bg-[#a435f0] text-white font-bold text-sm hover:bg-[#8710d8] transition-colors rounded"
                >
                  Browse All Courses
                </button>
              </div>
            )
          )}

          {/* Pagination — hidden while searching */}
          {!activeSearch && numberOfPages > 1 && (
            <div className="mt-20 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all shadow-sm disabled:opacity-30 ${
                    togol
                      ? "border-[#d1d7dc] text-[#2d2f31] hover:bg-gray-100 disabled:hover:bg-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800 disabled:hover:bg-transparent"
                  }`}
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-2 mx-4">
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page + 1)}
                      className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                        currentPage === page + 1
                          ? "bg-[#a435f0] text-white shadow-xl shadow-[#a435f0]/30 scale-110"
                          : togol
                          ? "bg-white border border-[#d1d7dc] text-[#2d2f31] hover:border-[#2d2f31]"
                          : "bg-[#1e1e2e] border border-gray-700 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === numberOfPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all shadow-sm disabled:opacity-30 ${
                    togol
                      ? "border-[#d1d7dc] text-[#2d2f31] hover:bg-gray-100 disabled:hover:bg-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800 disabled:hover:bg-transparent"
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>
              <p className={`mt-8 text-sm font-bold uppercase tracking-widest ${
                togol ? "text-[#6a6f73]" : "text-gray-400"
              }`}>
                Viewing Page{" "}
                <span className={togol ? "text-[#2d2f31]" : "text-white"}>{currentPage}</span>{" "}
                of {numberOfPages}
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
export default AllClasses;