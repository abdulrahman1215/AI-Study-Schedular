import React from "react";
import type { Task } from "../types/task";
import { FaTrash } from "react-icons/fa";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onDelete }: Props) => {
  // Simple helper to assign text colors to priorities dynamically
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high": return "text-rose-400";
      case "medium": return "text-amber-400";
      case "low": return "text-emerald-400";
      default: return "text-blue-400";
    }
  };

  return (
    <div className="
      bg-slate-800/50
      border
      border-slate-700
      rounded-2xl
      p-5
      backdrop-blur-lg
      flex
      justify-between
      items-center
      hover:border-slate-600
      transition-colors
      duration-200
    ">
      <div className="min-w-0 flex-1 pr-4">
        <h2 className="
          text-xl
          font-bold
          text-slate-100
          truncate
        ">
          {task.title}
        </h2>

        {task.description && (
          <p className="
            text-slate-400
            mt-2
            text-sm
            line-clamp-2
          ">
            {task.description}
          </p>
        )}

        <div className={`
          mt-3
          text-sm
          font-semibold
          capitalize
          ${getPriorityColor(task.priority)}
        `}>
          Priority: {task.priority}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="
          text-slate-400
          hover:text-rose-500
          p-2
          rounded-xl
          hover:bg-rose-500/10
          transition-all
          duration-200
          shrink-0
        "
        title="Delete task"
      >
        <FaTrash size={18} />
      </button>
    </div>
  );
};

export default TaskCard;
