import { MdAssignmentAdd } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { NavLink } from "react-router-dom";

const TeacherMenu = ({ activeStyle, normalStyle }) => {
  return (
    <>
      <NavLink 
        to="/dashboard/addclass" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <MdAssignmentAdd className="text-xl" />
        Add Class
      </NavLink>

      <NavLink 
        to="/dashboard/myclass" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        <SiGoogleclassroom className="text-xl" />
        My Class
      </NavLink>
    </>
  );
};

export default TeacherMenu;
