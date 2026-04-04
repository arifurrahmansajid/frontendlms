import PropTypes from "prop-types";
import useContexHooks from "../useHooks/useContexHooks";

const SectionHeader = ({ title }) => {
  const { togol } = useContexHooks();
  return (
    <div>
      <h2
        className={`text-3xl font-bold text-center mb-8 ${
          !togol && "text-black dark:text-white"
        }`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
SectionHeader.propTypes = {
  title: PropTypes.string,
};
