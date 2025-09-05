"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export default function ProjectUploadPage() {
  // Project fields
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [manager, setManager] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  // Employees
  const [employees, setEmployees] = useState([]);

  // Tasks
  const [tasks, setTasks] = useState([
    { taskName: "", taskDesc: "", assignedTo: "", deadlineSlot: "", priority: "" },
  ]);

  // Fetch employees from Supabase
  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("user_id, emp_name, emp_designation");

      if (error) console.error("Error fetching employees:", error.message);
      else setEmployees(data);
    };
    fetchEmployees();
  }, []);

  // Add task row
  const addTask = () => {
    setTasks([
      ...tasks,
      { taskName: "", taskDesc: "", assignedTo: "", deadlineSlot: "", priority: "" },
    ]);
  };

  // Handle task field change
  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  // Save project + tasks
  const handleSaveProject = async () => {
    const projectId = uuidv4();

    // Insert project
    const { error: projectError } = await supabase.from("projects").insert([
      {
        projectid: projectId,
        projectname: projectName,
        clientname: clientName,
        manager: manager,
        deadlinedate: deadlineDate,
        tasks: [],
      },
    ]);

    if (projectError) {
      console.error("Error saving project:", projectError.message);
      return;
    }

    // Insert tasks
    const taskIds = [];
    function convertToTimestamp(slot) {
        const today = new Date();
        const [time, modifier] = slot.split(" "); // e.g., "12", "PM"
        let hours = parseInt(time);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
      
        today.setHours(hours, 0, 0, 0);
      
        // format to "YYYY-MM-DD HH:MM:SS"
        return today.toISOString().slice(0, 19).replace("T", " ");
      }
      
      // inside save logic
      for (const task of tasks) {
        const taskId = uuidv4();
        taskIds.push(taskId);
      
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
      
        const deadlineTimestamp = convertToTimestamp(task.deadlineSlot);
      
        const { error: taskError } = await supabase.from("tasks").insert([
          {
            taskid: taskId,
            taskname: task.taskName,
            taskdescription: task.taskDesc,
            assignedto: task.assignedTo, // make sure this is user_id
            taskdeadlineslot: deadlineTimestamp, // <-- using your function
            taskpriorityno: priorityMap[task.priority],
            projectid: projectId,
          },
        ]);
      
        if (taskError) {
          console.error("Error saving task:", taskError.message);
        }
      }
      

    // Update project with taskIds
    const { error: updateError } = await supabase
      .from("projects")
      .update({ tasks: taskIds })
      .eq("projectid", projectId);

    if (updateError) {
      console.error("Error updating project with tasks:", updateError.message);
    }

    alert("Project & tasks saved successfully!");
  };

  // Time slots for deadlines
  const timeSlots = [
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
    "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM"
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Create New Project</h2>

        {/* Project Info */}
        <div className="space-y-6">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Project Name"
          />

          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Client Name"
          />

          <input
            type="text"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Manager user_id"
          />

          <input
            type="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Tasks */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Project Tasks</h3>

          {tasks.map((task, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 border rounded-lg">
              {/* Task Name */}
              <input
                type="text"
                value={task.taskName}
                onChange={(e) => handleTaskChange(index, "taskName", e.target.value)}
                className="border rounded-lg px-4 py-2"
                placeholder="Task Name"
              />

              {/* Task Desc */}
              <input
                type="text"
                value={task.taskDesc}
                onChange={(e) => handleTaskChange(index, "taskDesc", e.target.value)}
                className="border rounded-lg px-4 py-2"
                placeholder="Task Description"
              />

              {/* Assign To */}
              <select
                value={task.assignedTo}
                onChange={(e) => handleTaskChange(index, "assignedTo", e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="">Assign To</option>
                {employees.map((emp) => (
                  <option key={emp.user_id} value={emp.user_id}>
                    {emp.emp_name} - {emp.emp_designation}
                  </option>
                ))}
              </select>

              {/* Deadline Slot */}
              <select
                value={task.deadlineSlot}
                onChange={(e) => handleTaskChange(index, "deadlineSlot", e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="">Deadline Slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              {/* Priority */}
              <div className="flex gap-4 items-center">
                {["High", "Medium", "Low"].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`priority-${index}`}
                      value={level}
                      checked={task.priority === level}
                      onChange={(e) => handleTaskChange(index, "priority", e.target.value)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={addTask}
            className="bg-gray-200 px-4 py-2 rounded-lg mt-2 hover:bg-gray-300"
          >
            + Add Task
          </button>
        </div>

        {/* Save Project */}
        <div className="mt-10 text-right">
          <button
            onClick={handleSaveProject}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
