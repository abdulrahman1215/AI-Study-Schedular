import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import StatsCard from "../components/StatsCard";
import { FaTasks, FaCheckCircle, FaClock, FaChartLine } from "react-icons/fa";
import { getTasks, createTask, deleteTask } from "../services/taskServices";
import type { Task } from "../types/task";

const Dashboard = () => {
  // 1. Structural Navigation Tabs Control State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tasks, setTasks] = useState<Task[]>([]);

  // 2. Optimized asynchronous fetch block
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed fetching database inventory records:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData: any) => {
    try {
      await createTask(taskData);
      fetchTasks(); // Force state re-hydration lookup
    } catch (error) {
      console.error("Create transaction aborted:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); // Force state re-hydration lookup
    } catch (error) {
      console.error("Delete transaction aborted:", error);
    }
  };

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen antialiased">
      {/* 3. Pass reactive states directly into custom modular layout wrappers */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={activeTab} userInitials="A" />

        <div className="p-8 overflow-y-auto max-w-5xl w-full mx-auto">
          
          {/* VIEWPORT 1: MAIN DASHBOARD INSIGHT OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="animate-fade-in space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Tasks" value={tasks.length} icon={<FaTasks />} />
                <StatsCard title="Completed" value="0" icon={<FaCheckCircle className="text-emerald-500" />} />
                <StatsCard title="Study Hours" value="0h" icon={<FaClock />} />
                <StatsCard title="Productivity" value="100%" icon={<FaChartLine className="text-indigo-400" />} />
              </div>

              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-200">Today's Active Focus List</h2>
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="p-4 bg-slate-900/60 border border-slate-800/60 rounded-xl text-sm text-slate-300">
                      {task.title}
                    </div>
                  ))}
                  {tasks.length === 0 && <p className="text-sm text-slate-500">No pending assignments found.</p>}
                </div>
              </div>
            </div>
          )}

          {/* VIEWPORT 2: PRODUCTION TASKS TRACKING LIST WORKSPACE */}
          {activeTab === "tasks" && (
            <div className="animate-fade-in space-y-8">
              <TaskForm onCreate={handleCreateTask} />
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-400">All Tasks ({tasks.length})</h2>
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                  />
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500">
                    Your pipeline is empty. Create a task above to begin.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PLACEHOLDERS FOR ADJACENT NAVIGATION OBJECTIVE VIEWS */}
          {activeTab === "ai-planner" && <div className="text-slate-400">AI Planner container content block</div>}
          {activeTab === "analytics" && <div className="text-slate-400">Analytics evaluation widgets container</div>}
          {activeTab === "settings" && <div className="text-slate-400">User profiles parameters container</div>}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
