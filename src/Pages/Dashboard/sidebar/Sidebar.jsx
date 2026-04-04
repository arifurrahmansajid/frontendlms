import { FaHome, FaUser, FaSignOutAlt, FaRocket } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../privateRouts/useAdmin";
import AdminMenu from "../menus/AdminMenu";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import useTeacher from "../../../privateRouts/useTeacher";
import { LuChartNoAxesCombined } from "react-icons/lu";
import useContexHooks from "../../../useHooks/useContexHooks";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  const { user, logOut } = useContexHooks();

  const activeLink = "flex items-center gap-3 px-6 py-4 bg-[#a435f0] text-white font-bold transition-all duration-300 border-r-4 border-white shadow-lg";
  const normalLink = "flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-white font-medium transition-all duration-300";

  return (
    <div className="w-full md:w-72 h-full min-h-screen bg-[#2d2f31] flex flex-col shadow-2xl relative z-10">
      {/* Brand & Logo */}
      <div className="p-8 pb-10 border-b border-white/5">
        <NavLink to="/" className="flex items-center gap-2 group transition-all">
          <div className="bg-[#a435f0] p-2 rounded-xl group-hover:scale-110 transition-transform">
            <FaRocket className="text-white text-xl" />
          </div>
          <div>
            <span className="text-2xl font-black text-white tracking-tighter">EduHub</span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-0.5">Control Center</p>
          </div>
        </NavLink>
      </div>

      {/* User Quick Info */}
      <div className="px-8 py-8 flex items-center gap-4 border-b border-white/5">
        <img 
            src={user?.photoURL || "https://i.ibb.co.com/8mPyLrB/user.png"} 
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10" 
            alt="User"
        />
        <div className="overflow-hidden">
          <p className="text-white font-bold truncate text-sm">{user?.displayName || "Admin User"}</p>
          <span className="text-[10px] font-black uppercase text-[#a435f0] bg-[#a435f0]/10 px-2 py-0.5 rounded-md mt-1 inline-block">
            {isAdmin ? "Administrator" : isTeacher ? "Instructor" : "Student"}
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 mt-6">
        <p className="px-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-4">Main Dashboard</p>
        <div className="flex flex-col space-y-1">
          {isAdmin ? (
            <AdminMenu activeStyle={activeLink} normalStyle={normalLink} />
          ) : isTeacher ? (
            <TeacherMenu activeStyle={activeLink} normalStyle={normalLink} />
          ) : (
            <StudentMenu activeStyle={activeLink} normalStyle={normalLink} />
          )}

          {isAdmin && (
            <NavLink to="/dashboard/graphchart" className={({ isActive }) => isActive ? activeLink : normalLink}>
              <LuChartNoAxesCombined className="text-xl" />
              Progress Chart
            </NavLink>
          )}
        </div>

        {/* Global Links */}
        <p className="px-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mt-10 mb-4">Account & Site</p>
        <div className="flex flex-col space-y-1">
          <NavLink to={"/dashboard/profile"} className={({ isActive }) => isActive ? activeLink : normalLink}>
            <FaUser className="text-xl" /> Profile
          </NavLink>
          <NavLink to={"/"} className={normalLink}>
            <FaHome className="text-xl" /> View Website
          </NavLink>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="p-6 mt-auto border-t border-white/5 bg-black/10">
        <button 
            onClick={logOut}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 font-bold rounded-2xl transition-all active:scale-95 border border-white/5"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
