import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "./Container";
import logo3 from "../assets/3.png";
import useContexHooks from "../useHooks/useContexHooks";
import { FaBars, FaTimes, FaUserAlt, FaSearch, FaChevronDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logOut, togol, setTogol } = useContexHooks();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleThemeChange = (e) => {
    const isChecked = e.target.checked;
    localStorage.setItem("EduHubTheme", isChecked);
    setTogol(isChecked);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allclasses?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // NavLink component with consistent styling
  const CustomNavLink = ({ to, children }) => (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => `
        px-4 py-2 rounded-lg transition-all duration-200 font-medium
        ${isActive
          ? "text-white bg-gradient-to-r from-[#F66B1D] to-[#F99D1C] shadow-md"
          : "text-gray-200 hover:text-white hover:bg-gray-700"
        }
      `}
    >
      {children}
    </NavLink>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isSticky
          ? "bg-[#0f172a] shadow-2xl border-b border-white/10 backdrop-blur-md"
          : "bg-[#111827]/95"
      }`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* ─── Search Overlay (slide down) ─── */}
      <div
        className={`absolute inset-x-0 top-0 bg-[#111111] z-[70] transition-all duration-300 overflow-hidden ${
          isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="h-16 flex items-center px-4 gap-3">
          <FaSearch className="text-[#a435f0] text-lg flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses, topics, teachers..."
            className="flex-1 bg-transparent text-white text-base placeholder-gray-500 outline-none border-b border-white/20 focus:border-[#a435f0] transition-colors pb-1"
          />
          <button
            type="submit"
            className="px-5 py-1.5 bg-[#a435f0] text-white text-sm font-bold rounded hover:bg-[#8710d8] transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </form>
      </div>

      <Container>
        <div className="flex items-center justify-between h-16">

          {/* ─── LEFT: mobile toggle + nav links ─── */}
          <div className="flex items-center gap-1">
            {/* Mobile hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-300 hover:text-white focus:outline-none mr-2 p-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-0">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-1 px-4 py-5 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? "text-white border-[#a435f0]"
                      : "text-gray-300 hover:text-white border-transparent hover:border-gray-500"
                  }`
                }
              >
                Home <FaChevronDown className="text-[10px] opacity-60 mt-0.5" />
              </NavLink>

              <NavLink
                to="/allclasses"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-4 py-5 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? "text-white border-[#a435f0]"
                      : "text-gray-300 hover:text-white border-transparent hover:border-gray-500"
                  }`
                }
              >
                All Classes <FaChevronDown className="text-[10px] opacity-60 mt-0.5" />
              </NavLink>

              <NavLink
                to="/techon"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-4 py-5 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? "text-white border-[#a435f0]"
                      : "text-gray-300 hover:text-white border-transparent hover:border-gray-500"
                  }`
                }
              >
                Teach on EduHub <FaChevronDown className="text-[10px] opacity-60 mt-0.5" />
              </NavLink>
            </nav>
          </div>

          {/* ─── CENTER: Brand Logo ─── */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo3}
                alt="EduHub Logo"
                className="h-10 hidden md:block drop-shadow-lg"
              />
              <span className="text-xl font-extrabold text-white tracking-tight">
                Edu<span className="text-[#a435f0]">Hub</span>
                <span className="text-white text-2xl leading-none">.</span>
              </span>
            </Link>
          </div>

          {/* ─── RIGHT: CTA + User controls ─── */}
          <div className="flex items-center gap-2">

            {/* "Teach Now" CTA pill */}
            <NavLink
              to="/techon"
              className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold text-white bg-[#3a8a3a] hover:bg-[#2d7a2d] transition-colors"
            >
              Teach Now
            </NavLink>

            {/* Search icon — toggles search overlay */}
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`p-2 transition-colors rounded hover:bg-white/10 ${
                isSearchOpen ? "text-[#a435f0]" : "text-gray-300 hover:text-white"
              }`}
              aria-label="Toggle search"
            >
              <FaSearch className="w-4 h-4" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => handleThemeChange({ target: { checked: !togol } })}
              className="p-2 text-gray-300 hover:text-white transition-colors rounded hover:bg-white/10 text-base"
            >
              {togol ? "☀️" : "🌙"}
            </button>

            {/* User section */}
            {user ? (
              <div className="relative group ml-1">
                {/* Avatar */}
                <div className="relative flex items-center gap-1 cursor-pointer">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#a435f0] transition-all duration-200 flex items-center justify-center bg-[#2d2f31]">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUserAlt className="text-gray-300 text-sm" />
                    )}
                  </div>
                  <FaChevronDown className="text-gray-400 text-[10px]" />
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#1e1e1e] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/10 z-[60] overflow-hidden">

                  {/* User Info Header */}
                  <div className="p-4 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-[#a435f0] p-0.5 flex-shrink-0">
                        <img
                          src={user.photoURL || "https://i.ibb.co.com/8mPyLrB/user.png"}
                          className="w-full h-full object-cover rounded-full"
                          alt="Avatar"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate text-sm">{user.displayName || "EduHub Member"}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="p-2">
                    <NavLink
                      to="/dashboard/profile"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all rounded-lg"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                        <FaUserAlt className="text-xs text-gray-300" />
                      </div>
                      My Profile
                    </NavLink>

                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all rounded-lg"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      Dashboard
                    </NavLink>
                  </div>

                  {/* Logout Section */}
                  <div className="p-2 bg-white/5 border-t border-white/10">
                    <button
                      onClick={logOut}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all rounded-lg"
                    >
                      <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Link
                  to="/signIn"
                  className="px-4 py-1.5 border border-white/30 text-gray-200 font-semibold text-sm hover:bg-white/10 hover:border-white/60 transition-all rounded"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 bg-[#a435f0] text-white font-semibold text-sm hover:bg-[#8710d8] transition-all rounded"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ─── Mobile menu ─── */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#1a1a1a] border-t border-white/10 py-4 fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto px-5">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full bg-white/10 text-white placeholder-gray-500 text-sm pl-9 pr-4 py-2.5 rounded-lg outline-none border border-white/10 focus:border-[#a435f0] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#a435f0] text-white text-sm font-bold rounded-lg hover:bg-[#8710d8] transition-colors"
              >
                Go
              </button>
            </form>

            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                onClick={toggleMenu}
                end
                className={({ isActive }) =>
                  `text-base font-semibold px-3 py-3 rounded-lg transition-colors ${
                    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/allclasses"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `text-base font-semibold px-3 py-3 rounded-lg transition-colors ${
                    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                All Classes
              </NavLink>
              <NavLink
                to="/techon"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `text-base font-semibold px-3 py-3 rounded-lg transition-colors ${
                    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Teach on EduHub
              </NavLink>

              <div className="h-px bg-white/10 my-3" />

              {!user && (
                <>
                  <Link
                    to="/signIn"
                    onClick={toggleMenu}
                    className="text-base font-bold text-[#a435f0] px-3 py-3 hover:underline"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="text-base font-bold text-[#a435f0] px-3 py-3 hover:underline"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;