"use client";
import Image from "next/image";

export default function UpcomingMeetings() {
  // Dummy meeting data
  const meetings = [
    {
      id: 1,
      title: "Sprint Planning",
      datetime: "Aug 25, 2025 - 10:00 AM",
      description: "Planning tasks and sprints for the next 2 weeks.",
      status: "Live",
      statusColor: "bg-red-500",
      participants: ["/emp1.jpg", "/emp2.jpg", "/emp3.jpg"],
    },
    {
      id: 2,
      title: "Client Review",
      datetime: "Aug 26, 2025 - 02:30 PM",
      description: "Review project progress with client.",
      status: "In 30 min",
      statusColor: "bg-yellow-500",
      participants: ["/emp2.jpg", "/emp4.jpg"],
    },
    {
      id: 3,
      title: "Design Sync",
      datetime: "Aug 27, 2025 - 11:00 AM",
      description: "UI/UX discussion for new features.",
      status: "Tomorrow",
      statusColor: "bg-blue-500",
      participants: ["/emp1.jpg", "/emp3.jpg", "/emp5.jpg"],
    },
  ];

  return (
    <div className="mt-8 p-6 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Meetings</h2>

      {/* Meeting cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="relative bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${meeting.statusColor}`}
            >
              {meeting.status}
            </span>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800">
              {meeting.title}
            </h3>

            {/* Datetime */}
            <p className="text-sm text-gray-500 mt-1">{meeting.datetime}</p>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-3">{meeting.description}</p>

            {/* Participants */}
            <div className="flex -space-x-3 mt-4 justify-end">
              {meeting.participants.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt="participant"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
