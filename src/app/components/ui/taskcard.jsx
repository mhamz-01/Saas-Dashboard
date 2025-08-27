"use client";
import React from "react";

export default function TaskCard({ id, name, assignedTo, urgency }) {
  // Define urgency colors
  const urgencyColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div className="w-60 h-40 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      {/* Task ID */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Task #{id}</span>
        <span
          className={`w-3 h-3 rounded-full ${urgencyColors[urgency]}`}
          title={urgency}
        ></span>
      </div>

      {/* Task Name */}
      <h3 className="text-lg font-semibold text-gray-800 mt-2">{name}</h3>

      {/* Assigned To */}
      <p className="text-sm text-gray-600">Assigned to: {assignedTo}</p>
    </div>
  );
}
