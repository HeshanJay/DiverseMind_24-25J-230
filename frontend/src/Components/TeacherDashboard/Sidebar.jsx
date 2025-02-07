import React from "react";
import PropTypes from "prop-types";
import Logo from "../../assets/logo/DiverseMind_logo.png";

const Sidebar = ({ routes }) => {
  return (
    <div className="fixed w-64 h-full bg-gray-800 text-white shadow-lg">
      <div className="flex items-center p-4">
        <img src={Logo} alt="Diverse Mind Logo" className="w-20 h-20 mr-2" />
        <span className="text-2xl font-semibold">DiverseMind</span>
      </div>

      <nav className="mt-2">
        {routes.map((route, index) => (
          <a
            key={index}
            href={route.path}
            className="block px-4 py-2 mt-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-lg"
          >
            {route.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default Sidebar;
