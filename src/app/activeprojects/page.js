"use client";

import { useState } from "react";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ActiveProjectsPage() {
  const [expandedProject, setExpandedProject] = useState(null);

  const [projects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      deadline: "Oct 20, 2025",
      manager: { name: "Hamza", img: "/saas-profile.jpg" },
      clientId: "CL-2025-001",
      team: "Design Team",
      participants: ["/saas-profile.jpg", "/saas-profile.jpg", "/saas-profile.jpg"],
      completion: 65,
      gradient: ["#1f2937", "#111827"],
      description:
        "Redesigning the corporate website with a modern UI/UX approach. Scope includes responsive layouts, SEO optimization, and accessibility improvements.",
      docs: [
        { label: "UI Design Docs", link: "#" },
        { label: "SEO Checklist", link: "#" },
        { label: "Accessibility Guide", link: "#" },
      ],
    },
    {
      id: 2,
      name: "Mobile App Development",
      deadline: "Nov 5, 2025",
      manager: { name: "Sara", img: "/saas-profile.jpg" },
      clientId: "CL-2025-002",
      team: "Dev Team",
      participants: [
        "/saas-profile.jpg",
        "/saas-profile.jpg",
        "/saas-profile.jpg",
        "/saas-profile.jpg",
      ],
      completion: 40,
      gradient: ["#374151", "#1f2937"],
      description:
        "Developing a cross-platform mobile application for managing tasks and communication. Includes push notifications and offline support.",
      docs: [
        { label: "API Reference", link: "#" },
        { label: "Mobile UI Kit", link: "#" },
      ],
    },
  ]);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Active Projects</h2>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl p-6 shadow-md hover:shadow-lg transition text-white w-full"
            style={{
              background: `linear-gradient(to bottom right, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                <h3 className="text-2xl font-semibold italic mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                  Deadline: {project.deadline}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src={project.manager.img}
                    alt={project.manager.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-200">
                    Manager: {project.manager.name}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Client ID: {project.clientId}
                </p>

                {/* Expand/Collapse button */}
                <button
                  className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold"
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )
                  }
                >
                  {expandedProject === project.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Right column */}
              <div className="flex flex-col items-center justify-between">
                <div className="w-full">
                  <p className="text-sm text-gray-300 mb-2">
                    Team: {project.team}
                  </p>
                  <div className="flex -space-x-3">
                    {project.participants.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt="participant"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white/20 object-cover"
                      />
                    ))}
                  </div>
                </div>

                {/* Pie chart */}
                <div className="w-full h-32 mt-4">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Completed", value: project.completion },
                          { name: "Remaining", value: 100 - project.completion },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={50}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#9ca3af" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-center mt-2 text-sm">
                    {project.completion}% Completed
                  </p>
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {expandedProject === project.id && (
              <div className="mt-6 border-t border-gray-500 pt-4">
                <p className="italic text-sm mb-3">{project.description}</p>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Documents</h4>
                  <ul className="space-y-2">
                    {project.docs.map((doc, idx) => (
                      <li key={idx}>
                        <a
                          href={doc.link}
                          className="text-blue-300 underline hover:text-blue-400 transition"
                        >
                          {doc.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
