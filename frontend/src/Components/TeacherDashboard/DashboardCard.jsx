import React from "react";

const DashboardCard = ({ title, count, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg ${color}`}>
      <h2 className="text-lg font-medium text-white">{title}</h2>
      <p className="text-3xl font-bold text-white">{count}</p>
    </div>
  );
};

export default DashboardCard;
