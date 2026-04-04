import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="text-center p-8 bg-white shadow-2xl rounded-3xl transform hover:scale-105 transition duration-300 ease-in-out">
        {/* Animated 404 */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 animate-pulse">
          404
        </h1>

        {/* Error Message */}
        <p className="text-lg text-gray-600 mb-8 font-medium">
          We can&apos;t seem to find the page you&apos;re looking for.
        </p>

        {/* Decorative Animation */}
        <div className="mb-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute w-full h-full rounded-full border-4 border-purple-300 animate-ping"></div>
            <div className="absolute w-full h-full rounded-full border-4 border-pink-300 animate-ping"></div>
            <div className="absolute w-full h-full rounded-full bg-pink-500 opacity-50"></div>
          </div>
        </div>

        {/* Home Button */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out"
        >
          <FaHome size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
