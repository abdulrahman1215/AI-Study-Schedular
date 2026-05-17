import React from "react";

// 1. Define Props interface for dynamic layout integration
interface NavbarProps {
  title: string;
  userInitials?: string;
  onAvatarClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  title, 
  userInitials = "A", 
  onAvatarClick 
}) => {
  return (
    <header className="
      h-20
      border-b
      border-slate-800
      flex
      items-center
      justify-between
      px-8
      bg-slate-900/40
      backdrop-blur-xl
      sticky
      top-0
      z-40
    ">
      {/* 2. Title updates dynamically based on what page you are viewing */}
      <h1 className="
        text-xl
        font-bold
        capitalize
        text-slate-100
        tracking-wide
      ">
        {title.replace("-", " ")}
      </h1>

      <div className="flex items-center gap-4">
        {/* 3. Interactive avatar profile hub wrapper */}
        <button 
          onClick={onAvatarClick}
          className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-tr 
            from-indigo-500 
            to-cyan-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-sm
            shadow-md
            shadow-indigo-500/10
            hover:scale-105
            active:scale-95
            transition-all
            cursor-pointer
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500/40
          "
        >
          {userInitials.toUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
