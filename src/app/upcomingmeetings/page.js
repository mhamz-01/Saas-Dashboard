"use client";

import { useState } from "react";

export default function MeetingsPage() {
  // Dummy meetings data
  const meetings = [
    {
      id: 1,
      title: "Project Kickoff",
      time: "Today, 3:00 PM",
      host: { name: "Hamza", img: "/host1.jpg" },
      description: "Kickoff meeting for the new SaaS dashboard project.",
      participants: [
        { id: 1, name: "Sara", img: "/p1.jpg" },
        { id: 2, name: "Ali", img: "/p2.jpg" },
      ],
      duration: "45 mins",
    },
    {
      id: 2,
      title: "Design Review",
      time: "Tomorrow, 11:00 AM",
      host: { name: "Sara", img: "/host2.jpg" },
      description: "Review of the new UI/UX design and feedback session.",
      participants: [
        { id: 3, name: "Hamza", img: "/p3.jpg" },
        { id: 4, name: "Ali", img: "/p2.jpg" },
      ],
      duration: "1 hour",
    },
  ];

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "Team", text: "In case of any problem you can text here." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column - Upcoming Meetings */}
 {/* Left Column - Upcoming Meetings */}
<div className="space-y-6">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">
    Upcoming Meetings
  </h2>
  {meetings.map((meeting) => (
    <div
      key={meeting.id}
      className="relative bg-gradient-to-r from-gray-800 to-black p-6 rounded-xl shadow-lg text-white"
    >
      {/* Duration top-right */}
      <span className="absolute top-4 right-4 text-xs text-gray-400">
        {meeting.duration}
      </span>

      {/* Meeting Title */}
      <h3 className="text-xl italic font-semibold">{meeting.title}</h3>
      <p className="text-sm text-gray-300 mt-2">{meeting.time}</p>
      <p className="text-sm text-gray-400">Hosted by {meeting.host.name}</p>

      {/* Participants - horizontal stacked */}
      <div className="flex -space-x-3 mt-4 justify-end">
        {meeting.participants.map((p, idx) => (
          <img
            key={p.id}
            src={p.img}
            alt={p.name}
            className="w-8 h-8 rounded-full border-2 border-gray-700 object-cover"
          />
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setSelectedMeeting(meeting)}
        className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        View Details
      </button>
    </div>
  ))}
</div>



      {/* Right Column - Meeting Details */}
      <div className="bg-gradient-to-b from-gray-800 to-black text-white shadow-lg rounded-xl p-6">
        {selectedMeeting ? (
          <div>
            {/* Title */}
            <h2 className="text-3xl italic font-bold mb-2">
              {selectedMeeting.title}
            </h2>
            {/* Description */}
            <p className="italic text-gray-300 mb-6">
              {selectedMeeting.description}
            </p>

            {/* Host Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedMeeting.host.img}
                alt={selectedMeeting.host.name}
                className="w-10 h-10 rounded-full border-2 border-gray-500"
              />
              <span className="text-sm text-gray-300">
                Host: {selectedMeeting.host.name}
              </span>
            </div>

            {/* Participants */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-400">Participants:</span>
              {selectedMeeting.participants.map((p) => (
                <img
                  key={p.id}
                  src={p.img}
                  alt={p.name}
                  className="w-8 h-8 rounded-full border border-gray-500"
                />
              ))}
            </div>

            {/* Duration */}
            <p className="text-sm text-gray-400 mb-6">
              Expected Duration: {selectedMeeting.duration}
            </p>

            {/* Join Meeting Button (locked for now) */}
            <button
              disabled
              className="bg-gray-600 text-gray-300 cursor-not-allowed px-6 py-2 rounded-lg font-semibold mb-6"
            >
              Join Meeting (Locked until scheduled time)
            </button>

            {/* Chat Section */}
            <div className="bg-gray-900 p-4 rounded-lg h-48 flex flex-col">
              <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                {messages.map((msg, idx) => (
                  <p
                    key={idx}
                    className={`text-sm ${
                      msg.sender === "You" ? "text-blue-400" : "text-green-400"
                    }`}
                  >
                    <strong>{msg.sender}: </strong>
                    {msg.text}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Select a meeting from the left to see details.
          </p>
        )}
      </div>
    </div>
  );
}
