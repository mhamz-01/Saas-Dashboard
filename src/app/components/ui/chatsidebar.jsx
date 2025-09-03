"use client";
import Image from "next/image";

export default function ChatSidebar() {
  const employees = [
    { id: 1, name: "Alice", img: "https://i.pravatar.cc/48?img=1" },
    { id: 2, name: "Bob", img: "https://i.pravatar.cc/48?img=2" },
    { id: 3, name: "Charlie", img: "https://i.pravatar.cc/48?img=3" },
    { id: 4, name: "Dana", img: "https://i.pravatar.cc/48?img=4" },
  ];

  return (
    <div className="w-16 bg-white shadow-lg border-l border-gray-200 p-2 flex flex-col items-center space-y-4">
      {employees.map((emp) => (
        <button
          key={emp.id}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition"
          title={emp.name}
        >
          <Image
            src={emp.img}
            alt={emp.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
