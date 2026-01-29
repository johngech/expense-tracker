"use client";

import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/users", label: "Users" },
    { path: "/expenses", label: "Expenses" },
    { path: "/about", label: "About" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
  ];

  const getNavClass = (isActive: boolean) =>
    isActive
      ? `${buttonVariants({ variant: "ghost" })} text-white font-semibold`
      : `${buttonVariants({ variant: "ghost" })} text-gray-300 hover:text-white`;

  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white font-bold text-lg">
          TrackExpense
        </NavLink>
        <ul className="flex space-x-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => getNavClass(isActive)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
