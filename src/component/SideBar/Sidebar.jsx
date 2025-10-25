// import React from 'react'
// import { TfiDashboard } from "react-icons/tfi";
// import { FaUserCog } from "react-icons/fa";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
// import { MdCategory } from "react-icons/md";
// import { CiSettings } from "react-icons/ci";
// // import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'

// const Sidebar = () => {
//   // const navigate = useNavigate()
//   // const usermanage = () =>{
//   //   navigate("/usermanage")
//   // }
//   return (
//     <div className='w-[325px] h-[130vh] bg-blue-400 shadow-[5px_0px_10px_rgba(0,0,0,0.8)] items-start'>
// <div className='bg-gray-300 py-3 px-3 font-extrabold font-mono text-2xl'>ADMIN PANEL</div>
// <div className='bg-white py-7 px-2 mt-0.5 '>
// <div className=' bg-white py-7 align-middle text-1xl font-extrabold flex justify-center mr-[10%] gap-3 hover:bg-gray-400 rounded-2xl'><TfiDashboard className='text-2xl'/>DashBoard</div><hr className='w-65'/>
// <div className='py-7 align-middle text-1xl font-extrabold flex justify-center mr-[10%] gap-3 hover:bg-gray-400 rounded-2xl'><FaUserCog className='text-2xl'  />User Management</div><hr className='w-65'/>
// <div className='py-7 align-middle text-1xl font-extrabold flex justify-center mr-[10%] gap-3 hover:bg-gray-400 rounded-2xl'><MdOutlineProductionQuantityLimits className='text-2xl' />
// Product Management</div><hr className='w-65'/>
// <div className='py-7 align-middle text-1xl font-extrabold flex justify-center  mr-[10%] gap-3 hover:bg-gray-400 rounded-2xl'><MdCategory className='text-2xl' /><a href='http://localhost:5173/category' >Category</a></div>

// </div>
// <div className='w-full py-4 mt-85.5 bg-gray-300   text-1xl font-extrabold flex   '>
//  <div className='flex justify-center items-start ml-[10%] gap-3'> <CiSettings className='text-2xl'/><h3>Settings</h3></div>
// </div>
//     </div>
//   )
// }

// export default Sidebar

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
