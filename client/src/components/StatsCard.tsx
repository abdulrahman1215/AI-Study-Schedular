import React from "react";

// 1. Expanded Props interface to accept functional metrics and icons
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    text: string;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  isLoading = false,
}) => {
  // 2. Render placeholder loading skeleton state
  if (isLoading) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 animate-pulse h-32" />
    );
  }

  return (
    <div className="
      bg-slate-900/40
      backdrop-blur-xl
      p-6
      rounded-2xl
      border
      border-slate-800/80
      hover:border-slate-700/80
      hover:-translate-y-1
      transition-all
      duration-300
      group
      flex
      flex-col
      justify-between
    ">
      <div>
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="
            text-sm
            font-medium
            text-slate-400
            tracking-wide
          ">
            {title}
          </h2>
          {/* 3. Render functional icon slot wrapper */}
          {icon && (
            <div className="
              text-lg
              text-slate-400
              group-hover:text-indigo-400
              transition-colors
              duration-300
            ">
              {icon}
            </div>
          )}
        </div>

        <p className="
          text-3xl
          font-extrabold
          text-slate-50
          tracking-tight
        ">
          {value}
        </p>
      </div>

      {/* 4. Optional growth/trend indicator line */}
      {trend && (
        <div className="flex items-center gap-1.5 mt-3 text-xs font-medium">
          <span className={trend.isPositive ? "text-emerald-400" : "text-rose-400"}>
            {trend.text}
          </span>
          <span className="text-slate-500">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
