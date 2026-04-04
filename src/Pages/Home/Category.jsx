import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaGamepad,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaEllipsisH,
} from "react-icons/fa";
import Container from "../../Sharecomponent/Container";
import SectionHeader from "../../components/SectionHeader";
import useContexHooks from "../../useHooks/useContexHooks";

const categories = [
  { icon: <FaCode />, name: "Web Development", color: "from-blue-500 to-cyan-500" },
  { icon: <FaPaintBrush />, name: "Graphics Design", color: "from-purple-500 to-pink-500" },
  { icon: <FaMobileAlt />, name: "App Development", color: "from-emerald-500 to-teal-500" },
  { icon: <FaGamepad />, name: "Game Development", color: "from-orange-500 to-red-500" },
  { icon: <FaShieldAlt />, name: "Cyber Security", color: "from-amber-500 to-yellow-500" },
  { icon: <FaRobot />, name: "Artificial Intelligence", color: "from-indigo-500 to-violet-500" },
  { icon: <FaChartLine />, name: "Digital Marketing", color: "from-rose-500 to-pink-500" },
  { icon: <FaEllipsisH />, name: "More Categories", color: "from-gray-500 to-slate-500" },
];

const Category = () => {
  const { togol } = useContexHooks();

  return (
    <section className={`${togol} py-16 md:py-20 bg-white`}>
      <Container>
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Explore Categories"
            subtitle="Discover courses across diverse fields and start learning today"
            center
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-[0.98]"
              >
                {/* Icon Area with Gradient */}
                <div className={`h-48 flex items-center justify-center bg-gradient-to-br ${category.color} transition-transform duration-300 group-hover:scale-105`}>
                  <div className="text-white text-6xl drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-[#2d2f31] group-hover:text-black transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">120+ courses</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-4 bg-[#2d2f31] text-white font-semibold rounded-2xl hover:bg-black transition-all flex items-center gap-3 group">
              Browse All Categories
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Category;