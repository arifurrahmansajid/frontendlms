import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";

const PreLoader = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "min-h-[80vh]"}
      flex 
      flex-col 
      justify-center 
      items-center 
      bg-transparent
      relative`}
    >
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-8 bg-[#a435f0]/15 rounded-full blur-3xl group-hover:bg-[#a435f0]/25 transition-all duration-700"></div>
        
        <div className="relative flex flex-col items-center">
            <HashLoader 
                size={80} 
                color="#a435f0" 
                speedMultiplier={1.2}
            />
            
            <div className="mt-8 text-center animate-pulse">
                <span className="text-sm font-black uppercase tracking-[0.3em] text-[#2d2f31] dark:text-gray-200">
                    EduHub
                </span>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Loading Excellence...
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

PreLoader.propTypes = {
  smallHeight: PropTypes.bool,
};

export default PreLoader;
