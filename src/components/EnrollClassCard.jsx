import PropTypes from "prop-types";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const EnrollClassCard = ({ item }) => {
  const { title, name, image } = item;
  return (
    <div className="card w-full bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 shadow-xl">
      {/* Image Section */}
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        {/* Posted By */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaUserCircle size={20} />
          <span>{name}</span>
        </div>
        {/* Continue Button */}
        <div className="card-actions mt-4">
          <Link
            to={`/dashboard/myenroll-class/${item._id}`}
            className="flex gap-2 justify-center items-center bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 rounded-lg text-lg font-bold transition-all text-center "
          >
            Continue <AiOutlineArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollClassCard;
EnrollClassCard.propTypes = {
  item: PropTypes.object,
};
