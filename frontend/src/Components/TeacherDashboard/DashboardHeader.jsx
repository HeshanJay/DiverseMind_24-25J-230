import React from "react";

const DashboardHeader = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
        <div className="flex items-center gap-2"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
