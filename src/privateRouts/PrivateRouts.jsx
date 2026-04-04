import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useContexHooks from "../useHooks/useContexHooks";
import PreLoader from "../components/PreLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContexHooks();
  const location = useLocation();
  if (loading) {
    return <PreLoader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signIn" state={location.pathname}></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.element,
};
