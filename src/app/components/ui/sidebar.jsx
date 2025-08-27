import { FaTasks, FaHome,FaRocketchat } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import NavItem from "./buttons/dashboardButton";

export default function Sidebar() {
  const navItems = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/chats", icon: FaRocketchat, label: "Chats" },
    { href: "/tasks", icon: FaTasks, label: "Tasks" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-white border-r border-gray-200 shadow-sm flex flex-col py-4">
      <div className="flex justify-center items-center mb-48">
        <MdDashboard className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}