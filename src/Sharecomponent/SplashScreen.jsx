import React, { useEffect, useState } from "react";
import logo from "../assets/3.png";
import PropTypes from "prop-types";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#2d2f31] to-[#1a1c1e] transition-all duration-800 ease-out ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="text-center relative">

        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#a435f0]/10 rounded-full blur-3xl" />

        {/* Main Logo Container */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            {/* Outer Ring */}
            <div className="absolute -inset-8 border border-[#a435f0]/20 rounded-full animate-[ping_2s_ease-out_infinite]" />

            {/* Logo with Glow */}
            <div className="relative animate-float">
              <img
                src={logo}
                alt="EduHub Logo"
                className="h-28 w-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Brand Name */}
          <div className={`mt-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-5xl font-bold text-white tracking-[-2px]">
              Edu<span className="text-[#a435f0]">Hub</span>
            </h1>

            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-8 bg-[#a435f0]" />
              <p className="text-white/70 text-sm tracking-widest font-medium">LEARNING PLATFORM</p>
              <div className="h-px w-8 bg-[#a435f0]" />
            </div>
          </div>
        </div>

        {/* Elegant Loading Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-48">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-[#a435f0] via-[#f66b1d] to-[#a435f0] rounded-full animate-loading" />
            </div>

            {/* Subtle dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-[#a435f0] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-loading {
          animation: loading 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;