import PropTypes from "prop-types";
import CountUp from "react-countup";

const ComunityCard = ({ title, count }) => {
  return (
    <div className="card bg-[#E9ECEF] text-primary-content w-full">
      <div className="card-body text-[#F66B1D]">
        <h3 className="text-3xl font-bold text-gray-700 text-center">
          {title}
        </h3>
        <p className="text-4xl font-bold text-center">
          <CountUp end={count} />
        </p>
      </div>
    </div>
  );
};

export default ComunityCard;
ComunityCard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};
