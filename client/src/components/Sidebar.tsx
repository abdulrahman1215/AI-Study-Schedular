import React from "react";
import {
  FaHome,
  FaTasks,
  FaRobot,
  FaChartBar,
  FaCog
} from "react-icons/fa";

import { Link } from "react-router-dom";

// 1. Define a TypeScript interface for strict component props
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {

  // 2. Structured configuration array for scalable navigation
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaHome />
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: <FaTasks />
    },
    {
      id: "ai-planner",
      label: "AI Planner",
      icon: <FaRobot />,
      path: "/ai-planner"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <FaChartBar />
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog />
    },
  ];

  return (
    <div
      className="
        w-64
        min-h-screen
        bg-slate-900
        text-slate-100
        border-r
        border-slate-800
        p-6
        flex
        flex-col
      "
    >
      {/* LOGO / BRAND */}
      <h1
        className="
          text-2xl
          font-black
          tracking-wider
          mb-10
          bg-gradient-to-r
          from-indigo-400
          to-cyan-400
          bg-clip-text
          text-transparent
        "
      >
        AI Scheduler
      </h1>

      {/* NAVIGATION */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {

          const isActive = activeTab === item.id;

          const commonClasses = `
            w-full
            flex
            items-center
            gap-4
            p-3.5
            rounded-xl
            font-medium
            text-sm
            transition-all
            duration-200
            group
            ${
              isActive
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
            }
          `;

          const iconClasses = `
            text-lg
            transition-transform
            group-hover:scale-110
            ${
              isActive
                ? "text-white"
                : "text-slate-400 group-hover:text-indigo-400"
            }
          `;

          // ROUTE-BASED ITEM
          if (item.path) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className={commonClasses}
              >
                <span className={iconClasses}>
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          }

          // STATE-BASED ITEM
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={commonClasses}
            >
              <span className={iconClasses}>
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;