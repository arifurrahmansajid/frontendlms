import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../Sharecomponent/ErrorPage";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/signIn/SignIn";
import Register from "../Pages/register/Register";
import AllClasses from "../Pages/AllClasses/AllClasses";
import PrivateRoute from "../PrivateRouts/PrivateRouts";
import TeachOn from "../Pages/TechOn/TechOn";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Details from "../Pages/Details/Details";
import Payment from "../Pages/Payment/Payment";
import Profile from "../Pages/Profile/Profile";
import AddClass from "../Pages/Dashboard/dashboardPages/AddClass";
import TeacherRoute from "../privateRouts/TeacherRoute";
import MyClass from "../Pages/Dashboard/dashboardPages/MyClass";
import AdminRoute from "../privateRouts/AdminRoute";
import Allusers from "../Pages/Dashboard/dashboardPages/Allusers";
import AllAdimClasses from "../Pages/Dashboard/dashboardPages/AllAdimClasses";
import TeacherRq from "../Pages/Dashboard/dashboardPages/TeacherRq";
import StudentEnrollClass from "../Pages/Dashboard/dashboardPages/StudentEnrollClass";
import SeeProgressByAdmin from "../Pages/Dashboard/dashboardPages/SeeProgressByAdmin";
import TeacherSeeDetails from "../Pages/Dashboard/dashboardPages/TeacherSeeDetails";
import EnrollAssignmentTable from "../components/EnrollAssignmentTable";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import GraphCart from "../Pages/Dashboard/dashboardPages/GraphCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allclasses",
        element: <AllClasses />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/techon",
        element: (
          <PrivateRoute>
            <TeachOn />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // dashbaord student route
      {
        path: `enrollclass`,
        element: (
          <PrivateRoute>
            <StudentEnrollClass />
          </PrivateRoute>
        ),
      },
      {
        path: "myenroll-class/:id",
        element: (
          <PrivateRoute>
            <EnrollAssignmentTable />
          </PrivateRoute>
        ),
      },
      // dashboard teacher route
      {
        path: "addclass",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
      },
      {
        path: "myclass",
        element: (
          <TeacherRoute>
            <MyClass />
          </TeacherRoute>
        ),
      },
      {
        path: "teacherSeeDetails/:id",
        element: (
          <PrivateRoute>
            <TeacherSeeDetails />
          </PrivateRoute>
        ),
      },
      // dashboard admin route
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "allclasses",
        element: (
          <AdminRoute>
            <AllAdimClasses />
          </AdminRoute>
        ),
      },
      {
        path: "seeprogress/:id",
        element: (
          <AdminRoute>
            <SeeProgressByAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "teacherRq",
        element: (
          <AdminRoute>
            <TeacherRq />
          </AdminRoute>
        ),
      },
      {
        path: "graphchart",
        element: (
          <AdminRoute>
            <GraphCart />
          </AdminRoute>
        ),
      },
      // dashboard common route
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
