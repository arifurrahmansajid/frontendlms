import { Outlet } from "react-router-dom";
import Navbar from "../Sharecomponent/Navbar";
import Footer from "../Sharecomponent/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import useContexHooks from "../useHooks/useContexHooks";
import SplashScreen from "../Sharecomponent/SplashScreen";

const Layout = () => {
  AOS.init();
  const { togol } = useContexHooks();

  return (
    <div className={`${togol ? "bg-transparent" : "bg-[#111827]"} transition-colors duration-500`}>
      {/* Intro Animation */}
      <SplashScreen />

      <Navbar />
      <div className="min-h-[calc(100vh-360px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

