import { Navigate, useLocation } from "react-router-dom";
import PreLoader from "../components/PreLoader";
import useContexHooks from "../useHooks/useContexHooks";
import useTeacher from "./useTeacher";
import PropTypes from "prop-types";

const TeacherRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContexHooks();
  const [isTeacher, isTeacherLoading] = useTeacher();
  if (loading || isTeacherLoading) {
    return <PreLoader />;
  }
  if (user && isTeacher) {
    return children;
  }
  console.log(user, isTeacher);
  return <Navigate to="/" state={location.pathname}></Navigate>;
};

export default TeacherRoute;
TeacherRoute.propTypes = {
  children: PropTypes.element,
};
