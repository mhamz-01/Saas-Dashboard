"use client";
import React from "react";
import TaskCard from "./taskcard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TasksSection() {
  // Dummy data for tasks
  const tasks = [
    { id: 1, name: "Fix Navbar Bug", assignedTo: "Alice", urgency: "high" },
    { id: 2, name: "Design Dashboard", assignedTo: "Bob", urgency: "medium" },
    { id: 3, name: "Write API Docs", assignedTo: "Charlie", urgency: "low" },
    { id: 4, name: "Update Login Page", assignedTo: "Dana", urgency: "high" },
  ];

  // Count urgency levels
  const urgencyCounts = {
    high: tasks.filter((t) => t.urgency === "high").length,
    medium: tasks.filter((t) => t.urgency === "medium").length,
    low: tasks.filter((t) => t.urgency === "low").length,
  };

  // Prepare data for chart
  const chartData = [
    { name: "High", count: urgencyCounts.high },
    { name: "Medium", count: urgencyCounts.medium },
    { name: "Low", count: urgencyCounts.low },
  ];

  return (
    <div className="mt-8 p-6 rounded-lg">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks</h2>

      {/* Two column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side: Tasks */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              name={task.name}
              assignedTo={task.assignedTo}
              urgency={task.urgency}
            />
          ))}
        </div>

        {/* Right side: Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
