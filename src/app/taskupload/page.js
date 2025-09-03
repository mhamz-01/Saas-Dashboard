"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";



export default function TaskUploadPage() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [priority, setPriority] = useState("");
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // Dummy team members list (replace later with data from Supabase)
  const teamMembers = [
    { id: 1, name: "Hamza", designation: "Frontend Developer", avatar: "/saas-profile.jpg", online: true },
    { id: 2, name: "Ali", designation: "Backend Developer", avatar: "/saas-profile.jpg", online: false },
    { id: 3, name: "Sara", designation: "UI/UX Designer", avatar: "/saas-profile.jpg", online: true },
  ];

  // Dummy time slots
  const timeSlots = [
    "12 PM","1 PM","2 PM","3 PM","4 PM","5 PM",
    "6 PM","7 PM","8 PM","9 PM","10 PM","11 PM","12 AM"
  ];

  // Dummy active tasks
  const activeTasks = [
    { id: 1, title: "Fix login bug", deadline: "2 PM", assigned: "Hamza", priority: "High" },
    { id: 2, title: "Design new landing page", deadline: "5 PM", assigned: "Sara", priority: "Medium" },
    { id: 3, title: "API endpoint cleanup", deadline: "7 PM", assigned: "Ali", priority: "Low" },
    { id: 4, title: "Prepare client report", deadline: "9 PM", assigned: "Sara", priority: "High" },
  ];

  const newTask = uuidv4();
 
  // Priority mapping
const priorityMap = { High: 3, Medium: 2, Low: 1 };

const handleSaveTask = async () => {
  if (!taskName || !taskDescription || !timeFrame || !priority) {
    setMessage("⚠️ Please fill all fields before saving.");
    return;
  }

  setLoading(true);
  setMessage("");

  // For now hardcode to your own user_id
  // Replace "123" with actual user_id of mhamz.01 from employees table
  const assignedUserId = 'b42bc248-089c-43f4-b7f9-2c030d049c97';

  const { error } = await supabase.from("tasks").insert([
    {
      taskid: newTask,
      taskname: taskName,
      taskdescription: taskDescription,
      assignedto: assignedUserId,  // ✅ references employees.user_id
      taskdeadlineslot: convertToTimestamp(timeFrame),
      taskpriorityno: priorityMap[priority],
    },
  ]);

  if (error) {
    console.error("Error saving task:", error);
    setMessage("❌ Failed to save task. Check console for details.");
  } else {
    setMessage("✅ Task saved successfully!");
    setTaskName("");
    setTaskDescription("");
    setTimeFrame("");
    setPriority("");
  }

  setLoading(false);
};


function convertToTimestamp(slot) {
  const today = new Date();
  const [time, modifier] = slot.split(" "); // "12", "PM"
  let hours = parseInt(time);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  today.setHours(hours, 0, 0, 0);
  return today.toISOString(); // "2025-08-29T12:00:00.000Z"
}


  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        
        {/* LEFT - Create Task */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Create New Task</h2>
          
          <div className="space-y-6">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
              <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task name"
            />
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Description</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter task description"
                rows="4"
              />
            </div>

            {/* Assign To */}
            <div className="relative w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
              <div
                className="flex items-center justify-between w-full border rounded-lg px-4 py-2 bg-white cursor-pointer hover:border-gray-400"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selected ? (
                  <div className="flex items-center gap-3">
                    <Image src={selected.avatar} alt={selected.name} width={32} height={32} className="rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{selected.name}</p>
                      <p className="text-xs text-gray-500">{selected.designation}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">Select a team member</span>
                )}
                <span className="text-gray-500">▼</span>
              </div>
              {isOpen && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => { setSelected(member); setIsOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Image src={member.avatar} alt={member.name} width={36} height={36} className="rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.designation}</p>
                      </div>
                      <span className={`h-3 w-3 rounded-full ${member.online ? "bg-green-500" : "bg-orange-400"}`}></span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deadline Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline Slot</label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeFrame(slot)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition shadow-sm ${
                      timeFrame === slot
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                    }`}
                  >
                    ⏰ {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="High" checked={priority==="High"} onChange={(e) => setPriority(e.target.value)} />
                <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span> High
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="Medium" checked={priority==="Medium"} onChange={(e) => setPriority(e.target.value)} />
                <span className="w-4 h-4 bg-orange-500 rounded-full inline-block"></span> Medium
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="Low" checked={priority==="Low"} onChange={(e) => setPriority(e.target.value)} />
                <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span> Low
              </label>
            </div>
          </div>
        </div>

          <div className="mt-10 text-right">
          <button
            onClick={handleSaveTask}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Task"}
          </button>
          </div>
          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>

        {/* RIGHT - Active Tasks */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Active Tasks Today</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border rounded-xl hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">Assigned to: {task.assigned}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
