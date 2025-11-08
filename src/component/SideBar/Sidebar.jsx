

import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Users, Package, Tag } from "lucide-react";
import { TfiDashboard } from "react-icons/tfi";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdCategory } from "react-icons/md";
// import { CiSettings } from "react-icons/ci";

const Sidebar = () => {
  const menuItems = [
    { to: "/", label: "Dashboard", icon: <TfiDashboard size={20} /> },
    { to: "/users", label: "Users", icon: <FaUserCog size={20} /> },
    { to: "/products", label: "Products", icon: <MdOutlineProductionQuantityLimits size={20} /> },
    { to: "/categories", label: "Categories", icon: <MdCategory size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-200 flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
