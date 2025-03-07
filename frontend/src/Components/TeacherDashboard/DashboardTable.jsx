import React from "react";

const DashboardTable = () => {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-gray-800">Student List</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">No.</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Completed Tests</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
