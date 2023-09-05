import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({
  iconName,
  displayText,
  active,
  targetLink,
  onClick,
  fontsize,
}) => {
  return (
    <Link to={targetLink} className="block">
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={onClick}
      >
        <div className="px-5 py-2 xs:text-xs sm:text-xs md:text-sm lg:text-lg">
          <Icon
            icon={iconName}
            color={active ? "white" : "gray"}
            fontSize={fontsize}
          />
        </div>
        <div
          className={`${
            active ? "text-white" : "text-gray-400"
          } display: flex xs:text-xs sm:text-xs md:text-sm lg:text-lg font-semibold hover:text-white`}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;