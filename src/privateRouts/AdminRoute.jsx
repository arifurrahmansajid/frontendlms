import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useContexHooks from "../useHooks/useContexHooks";
import useAdmin from "./useAdmin";
import PreLoader from "../components/PreLoader";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContexHooks();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loading || isAdminLoading) {
    return <PreLoader />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={location.pathname}></Navigate>;
};

export default AdminRoute;
AdminRoute.propTypes = {
  children: PropTypes.element,
};
