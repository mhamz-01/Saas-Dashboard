"use client";
import { useState } from "react";
import Image from "next/image";
import ProtectedRoute from "../components/protectedroute";

const tasks = [
  {
    id: 1,
    title: "Complete UI Design",
    time: "10-12pm",
    members: ["/emp1.jpg", "/emp2.jpg"],
    urgency: "high",
    status: "active",
  },
  {
    id: 2,
    title: "Backend API Setup",
    time: "12-2pm",
    members: ["/emp3.jpg"],
    urgency: "medium",
    status: "todo",
  },
  {
    id: 3,
    title: "Write Documentation",
    time: "2-4pm",
    members: ["/emp1.jpg", "/emp4.jpg"],
    urgency: "low",
    status: "todo",
  },
  {
    id: 4,
    title: "Client Review Meeting",
    time: "4-6pm",
    members: ["/emp2.jpg"],
    urgency: "high",
    status: "done",
  },
];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("active");

  const urgencyColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <ProtectedRoute>  

    <div className="flex gap-6 h-screen bg-gray-50">
      {/* Left Column - Tabs */}
      <div className="w-1/4  bg-white shadow-sm flex flex-col rounded-lg">
        <h2 className="text-xl font-bold p-4 border-b">Tasks</h2>
        {["active", "todo", "done"].map((tab) => (
          <button
            key={tab}
            className={`text-left px-6 py-3 font-medium capitalize hover:bg-gray-100 ${
              activeTab === tab ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Tasks
          </button>
        ))}
      </div>

      {/* Right Column - Timeline */}
      <div className="w-3/4 p-6 shadow-lg  overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {activeTab} Tasks
        </h2>

        <div className="space-y-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-5 rounded-xl shadow-md transition ${
                task.status === activeTab
                  ? "bg-white scale-105 border-l-4 border-blue-500"
                  : "bg-gray-100 opacity-50"
              }`}
            >
              {/* Time + Task Details */}
              <div>
                <p className="text-sm text-gray-500">{task.time}</p>
                <h3 className="text-lg font-semibold">{task.title}</h3>
              </div>

              {/* Assigned Members */}
              <div className="flex -space-x-2">
                {task.members.map((member, idx) => (
                  <Image
                    key={idx}
                    src={member}
                    alt="member"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>

              {/* Urgency */}
              <div
                className={`w-4 h-4 rounded-full ${urgencyColors[task.urgency]}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
