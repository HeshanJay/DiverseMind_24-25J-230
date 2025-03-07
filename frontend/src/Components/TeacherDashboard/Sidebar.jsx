import React from "react";
import PropTypes from "prop-types";
import {
  FiHome,
  FiFileText,
  FiActivity,
  FiKey,
  FiLogOut,
} from "react-icons/fi";
import Logo from "../../assets/logo/DiverseMind_logo.png";

const Sidebar = ({ routes }) => {
  return (
    <div className="fixed h-full w-64 bg-gray-800 text-white shadow-xl">
      <div className="flex items-center gap-3 p-6 border-b border-gray-700">
        <img src={Logo} alt="DiverseMind Logo" className="w-12 h-12" />
        <h2 className="text-xl font-semibold">DiverseMind</h2>
      </div>

      <nav className="p-4">
        {routes.map((route, index) => (
          <div key={index} className="mb-2">
            {route.path ? (
              <a
                href={route.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {route.name === "Dashboard" && <FiHome className="w-5 h-5" />}
                {route.name === "Screening Test" && (
                  <FiFileText className="w-5 h-5" />
                )}
                {route.name === "Interventions" && (
                  <FiActivity className="w-5 h-5" />
                )}
                <span>{route.name}</span>
              </a>
            ) : (
              <button
                onClick={route.onClick}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {route.name === "Reset Password" && (
                  <FiKey className="w-5 h-5" />
                )}
                {route.name === "Logout" && <FiLogOut className="w-5 h-5" />}
                <span>{route.name}</span>
              </button>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

export default Sidebar;
