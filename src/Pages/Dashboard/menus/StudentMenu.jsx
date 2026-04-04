import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const StudentMenu = ({ activeStyle, normalStyle }) => {
  return (
    <>
      <NavLink 
        to="/dashboard/enrollclass" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <FaHome className="text-xl" />
        My Enroll Classes
      </NavLink>
    </>
  );
};

export default StudentMenu;
