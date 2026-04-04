import { FaUsers } from "react-icons/fa";
import { MdClass, MdPendingActions } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminMenu = ({ activeStyle, normalStyle }) => {
  return (
    <>
      <NavLink
        to="/dashboard/teacherRq"
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <MdPendingActions className="text-xl" />
        Teacher Request
      </NavLink>

      <NavLink
        to="/dashboard/allusers"
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <FaUsers className="text-xl" />
        Users
      </NavLink>

      <NavLink
        to="/dashboard/allclasses"
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <MdClass className="text-xl" />
        All Classes
      </NavLink>

      <NavLink 
        to="/dashboard/addclass" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <MdClass className="text-xl" />
        Add Class
      </NavLink>

      <NavLink 
        to="/dashboard/myclass" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <MdClass className="text-xl" />
        My Created Classes
      </NavLink>

      <NavLink 
        to="/dashboard/enrollclass" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <MdClass className="text-xl" />
        My Enrolled Classes
      </NavLink>
    </>
  );
};

export default AdminMenu;
