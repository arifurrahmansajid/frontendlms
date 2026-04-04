import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useContexHooks from "../../useHooks/useContexHooks";

const AllClassesCard = ({ item }) => {
  const { togol } = useContexHooks(); // togol=true → light, togol=false → dark
  const originalPrice = (parseFloat(item.price) * 1.6).toFixed(0);

  return (
    <Link
      to={`/details/${item._id}`}
      className="group h-full flex no-underline"
      data-aos="fade-up"
    >
      <div
        className={`flex flex-col w-full border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden rounded-xl cursor-pointer ${
          togol
            ? "bg-white border-[#e0e0e0]"
            : "bg-[#1e1e2e] border-[#2d2d3d]"
        }`}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {item.enroll > 50 && (
            <span className="bg-[#eceb98] text-[#2d2f31] text-[9px] font-black px-2 py-0.5 uppercase tracking-widest shadow-md">
              Bestseller
            </span>
          )}
          <span className="bg-[#1c1d1f]/80 text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest backdrop-blur-sm">
            {item.enroll > 0 ? `${item.enroll} Students` : "New Course"}
          </span>
        </div>

        {/* Course Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400" />

          {/* Play Button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
              <svg
                className="w-5 h-5 text-[#a435f0] fill-current ml-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3
            className={`font-bold text-[15px] leading-[1.35] mb-1.5 line-clamp-2 min-h-[2.7rem] group-hover:text-[#a435f0] transition-colors duration-200 ${
              togol ? "text-[#2d2f31]" : "text-white"
            }`}
          >
            {item.title}
          </h3>

          {/* Instructor */}
          <p
            className={`text-xs mb-3 truncate ${
              togol ? "text-[#6a6f73]" : "text-gray-400"
            }`}
          >
            By <span className="font-semibold">{item.name}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[#b4690e] font-bold text-xs">4.8</span>
            <span className="text-[#e59819] text-[11px] leading-none">
              ★★★★★
            </span>
            <span
              className={`text-[11px] ${
                togol ? "text-[#6a6f73]" : "text-gray-500"
              }`}
            >
              (1.2k)
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Price Row */}
          <div
            className={`flex items-center gap-2 pt-3 border-t ${
              togol ? "border-gray-100" : "border-gray-700"
            }`}
          >
            <span
              className={`text-xl font-black ${
                togol ? "text-[#2d2f31]" : "text-white"
              }`}
            >
              ${item.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
            <span className="ml-auto bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded">
              -40%
            </span>
          </div>

          {/* CTA */}
          <div className="mt-3 w-full py-2.5 bg-[#a435f0] group-hover:bg-[#8710d8] text-white text-center text-[11px] font-bold uppercase tracking-[0.12em] rounded-lg transition-colors duration-200">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AllClassesCard;
AllClassesCard.propTypes = {
  item: PropTypes.object,
};
