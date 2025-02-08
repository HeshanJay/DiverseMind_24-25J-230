import React from "react";

const DashboardTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Student</th>
            <th className="px-4 py-2 text-left">Subject</th>
            <th className="px-4 py-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="px-4 py-2 border-t">John Doe</td>
            <td className="px-4 py-2 border-t">Mathematics</td>
            <td className="px-4 py-2 border-t">85</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="px-4 py-2 border-t">Jane Smith</td>
            <td className="px-4 py-2 border-t">English</td>
            <td className="px-4 py-2 border-t">90</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
