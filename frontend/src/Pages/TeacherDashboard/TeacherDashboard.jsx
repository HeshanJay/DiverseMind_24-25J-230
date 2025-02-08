import React from "react";
import DashboardHeader from "../../Components/TeacherDashboard/DashboardHeader";
import DashboardCard from "../../Components/TeacherDashboard/DashboardCard";
import DashboardTable from "../../Components/TeacherDashboard/DashboardTable";
import Sidebar from "../../Components/TeacherDashboard/Sidebar";

const routes = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/students", name: "Students" },
  { path: "/classes", name: "Classes" },
  { path: "/assignments", name: "Assignments" },
  { path: "/settings", name: "Settings" },
];

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar routes={routes} />
      <div className="flex-grow p-6 ml-64 space-y-6">
        <DashboardHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Students" count="120" color="bg-blue-500" />
          <DashboardCard title="Classes" count="8" color="bg-green-500" />
          <DashboardCard title="Assignments" count="15" color="bg-yellow-500" />
          <DashboardCard title="Completed" count="50" color="bg-red-500" />
        </div>
        <DashboardTable />
      </div>
    </div>
  );
};

export default TeacherDashboard;
