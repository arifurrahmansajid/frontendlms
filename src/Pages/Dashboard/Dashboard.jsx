import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Footer from "../../Sharecomponent/Footer";

const Dashboard = () => {
  return (
    <div>
      <div className="relative min-h-[calc(100vh-292px)] md:flex bg-white">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="w-full md:flex-1 min-h-[calc(100vh-360px)]">
          <div>
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
