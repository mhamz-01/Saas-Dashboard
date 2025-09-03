"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../lib/supabaseClient";

export default function ScheduleMeetingPage() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [participants, setParticipants] = useState([]); // selected user_ids

  // Dummy employees
  const employees = [
    {
      user_id: "1",
      emp_name: "Hamza Khan",
      emp_designation: "Project Manager",
      emp_image: "/avatar1.png",
    },
    {
      user_id: "2",
      emp_name: "Sara Ali",
      emp_designation: "UI/UX Designer",
      emp_image: "/avatar2.png",
    },
    {
      user_id: "3",
      emp_name: "John Doe",
      emp_designation: "Frontend Developer",
      emp_image: "/avatar3.png",
    },
    {
      user_id: "4",
      emp_name: "Alice Smith",
      emp_designation: "Backend Developer",
      emp_image: "/avatar4.png",
    },
  ];

  // hardcoded participants
  const fixedParticipants = [
    "13e7a21f-3675-46d0-bbbd-c8842d53e737",
    "67ec6e17-5e0d-4097-88f4-680394a0c4d1",
  ];

  // Dummy meetings of the day
  const dummyMeetings = [
    {
      id: "1",
      title: "Sprint Planning",
      time: "2:00 PM",
      participants: ["Hamza", "Sara", "John"],
    },
    {
      id: "2",
      title: "Design Review",
      time: "4:00 PM",
      participants: ["Alice", "Sara"],
    },
  ];

  const toggleParticipant = (userId) => {
    setParticipants((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // remove if already selected
        : [...prev, userId] // add if not
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMeeting = {
      meetingid: uuidv4(),
      meeting_title: meetingTitle,
      meeting_date: meetingDate,
      meeting_time: meetingTime,
      meeting_description: meetingDescription,
      meeting_participants: fixedParticipants, // array of user_ids
    };

    console.log("Saving meeting:", newMeeting);

    const { error } = await supabase.from("meetings").insert([newMeeting]);

    if (error) {
      console.error("Error saving meeting:", error.message);
    } else {
      alert("Meeting saved!");
      setMeetingTitle("");
      setMeetingDate("");
      setMeetingTime("");
      setMeetingDescription("");
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Left side - Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Schedule a Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Title
            </label>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Meeting Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Date
            </label>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Meeting Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Time
            </label>
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Meeting Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              rows={3}
            />
          </div>

          {/* Participants Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Participants
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto p-2 border rounded-lg">
              {employees.map((emp) => (
                <div
                  key={emp.user_id}
                  onClick={() => toggleParticipant(emp.user_id)}
                  className={`flex items-center space-x-3 p-2 border rounded-lg cursor-pointer transition ${
                    participants.includes(emp.user_id)
                      ? "bg-blue-100 border-blue-400"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={emp.emp_image || "/default-avatar.png"}
                    alt={emp.emp_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{emp.emp_name}</p>
                    <p className="text-xs text-gray-500">
                      {emp.emp_designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 transition"
          >
            Save Meeting
          </button>
        </form>
      </div>

      {/* Right side - Meetings of the day */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today’s Meetings</h2>
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {dummyMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{meeting.title}</h3>
              <p className="text-sm text-gray-500">{meeting.time}</p>
              <p className="text-sm mt-1">
                Participants: {meeting.participants.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
