"use client";

import { useState } from "react";
import Image from "next/image";
import ProtectedRoute from "../components/protectedroute";


export default function ChatPage() {
  
    const [activeTab, setActiveTab] = useState("all");
const [searchQuery, setSearchQuery] = useState("");

  // Dummy People
  const people = [
    { id: 1, name: "Alice", img: "/user1.jpg", lastMsg: "See you soon!" },
    { id: 2, name: "Bob", img: "/user2.jpg", lastMsg: "Got it, thanks!" },
    { id: 3, name: "Charlie", img: "/user3.jpg", lastMsg: "Let’s catch up" },
  ];

  // State for selected person
  const [selected, setSelected] = useState(people[0]);

  // Dummy messages
  const messages = [
    { id: 1, sender: "Alice", text: "Hey, how’s the project going?" },
    { id: 2, sender: "You", text: "Pretty good! Almost done with UI." },
    { id: 3, sender: "Alice", text: "Awesome 👌 can’t wait to see it." },
  ];

  return (
    <ProtectedRoute>
    <div className="flex h-screen gap-4">
      {/* Left Sidebar - People */}
      <div className="w-1/3 border-r border-gray-200 bg-white rounded-lg shadow-sm flex flex-col">
  {/* Header */}
  <h2 className="text-lg font-bold p-4 border-b">Chats</h2>

  {/* Tabs */}
  <div className="flex border-b">
    <button
      className={`flex-1 text-center py-2 font-medium ${
        activeTab === "all"
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab("all")}
    >
      All Messages
    </button>
    <button
      className={`flex-1 text-center py-2 font-medium ${
        activeTab === "team"
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab("team")}
    >
      Team
    </button>
  </div>

  {/* Search Bar */}
  <div className="p-3">
    <input
      type="text"
      placeholder="Search chats..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* People List */}
  <div className="flex-1 overflow-y-auto">
    {people
      .filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((person) =>
        activeTab === "team" ? person.isTeam === true : true
      )
      .map((person) => (
        <div
          key={person.id}
          onClick={() => setSelected(person)}
          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
            selected.id === person.id ? "bg-gray-200" : ""
          }`}
        >
          <Image
            src={person.img}
            alt={person.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{person.name}</p>
            <p className="text-sm text-gray-500 truncate w-40">
              {person.lastMsg}
            </p>
          </div>
        </div>
      ))}
  </div>
</div>


      {/* Right Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-50 rounded-lg shadow-sm">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <Image
              src={selected.img}
              alt={selected.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Send
          </button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
