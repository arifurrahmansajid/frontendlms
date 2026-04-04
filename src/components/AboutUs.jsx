import Marquee from "react-fast-marquee";
import { FaBookReader, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import useContexHooks from "../useHooks/useContexHooks";

const AboutUs = () => {
  const { togol } = useContexHooks();
  return (
    <div className=" py-12 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col items-center gap-10">
        {/* Marquee Section */}
        <div className="w-full md:w-1/2">
          <Marquee speed={50} pauseOnHover>
            <div className="text-primary text-2xl font-bold mx-4">
              Interactive Learning
            </div>
            <div className="text-secondary text-2xl font-bold mx-4">
              Skill Development
            </div>
            <div className="text-accent text-2xl font-bold mx-4">
              Expert Mentorship
            </div>
          </Marquee>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2
            className={`text-4xl font-bold  ${
              togol ? "text-black" : "text-white"
            }`}
          >
            About EduHub
          </h2>
          <p className="text-lg text-gray-600">
            EduHub is a revolutionary platform dedicated to enhancing
            education through interactive and engaging learning experiences. We
            aim to bridge the gap between traditional learning methods and
            modern technology.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-lg">
              <FaBookReader className="text-4xl text-primary" />
              <div>
                <h3 className="text-xl font-semibold">Innovative Learning</h3>
                <p className="text-sm text-gray-500">
                  Explore a vast range of resources designed to make learning
                  enjoyable.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-lg">
              <FaChalkboardTeacher className="text-4xl text-primary" />
              <div>
                <h3 className="text-xl font-semibold">Expert Guidance</h3>
                <p className="text-sm text-gray-500">
                  Learn from top educators and professionals in various fields.
                </p>
              </div>
            </div>
          </div>
          <Link to={"/allclasses"}>
            <button className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center mt-4">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
