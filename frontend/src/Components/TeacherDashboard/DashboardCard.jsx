import React from "react";
import PropTypes from "prop-types";

const DashboardCard = ({ title, count, icon, color }) => {
  return (
    <div
      className={`rounded-lg p-6 ${color} shadow-lg transition-all hover:shadow-xl`}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-2xl font-medium text-white opacity-90">
            {title}
          </h3>
          <p className="text-5xl font-bold text-white">{count}</p>
        </div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
};

export default DashboardCard;
