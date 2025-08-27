"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ActiveProjects = () => {
  // Dummy project data
  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      client: "ABC Corp",
      manager: "Alice",
      deadline: "2025-09-15",
      progress: 70,
      color: "#4F46E5", // Indigo
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "XYZ Bank",
      manager: "Bob",
      deadline: "2025-10-01",
      progress: 45,
      color: "#F59E0B", // Amber
    },
    {
      id: 3,
      name: "AI Chatbot",
      client: "Tech Solutions",
      manager: "Charlie",
      deadline: "2025-11-20",
      progress: 85,
      color: "#10B981", // Green
    },
  ];

  return (
    <div className="mt-10 p-6 ">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Active Projects
      </h2>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const chartData = [
            { name: "Completed", value: project.progress },
            { name: "Remaining", value: 100 - project.progress },
          ];

          return (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-gray-50 border hover:shadow-lg transition"
            >
              {/* Project Info */}
              <h3 className="text-lg font-semibold text-gray-800">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600">
                Client: <span className="font-medium">{project.client}</span>
              </p>
              <p className="text-sm text-gray-600">
                Manager: <span className="font-medium">{project.manager}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Deadline:{" "}
                <span className="font-medium">{project.deadline}</span>
              </p>

              {/* Donut Chart */}
              <div className="flex items-center justify-center h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? project.color : "#E5E7EB"} // gray for remaining
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* % inside circle */}
                <span className="absolute text-xl font-bold text-gray-700">
                  {project.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveProjects;
