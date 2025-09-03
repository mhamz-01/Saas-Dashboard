"use client";

import { useEffect, useState } from "react";
import { FaTasks, FaHome, FaRocketchat } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdDashboard,MdOutlineUpcoming } from "react-icons/md";
import NavItem from "./buttons/dashboardButton";
import { supabase } from "../../../../lib/supabaseClient";
import { MdMeetingRoom } from "react-icons/md";

export default function Sidebar() {
  const [canUploadTask, setCanUploadTask] = useState(false);
  const [canScheduleMeeting, setCanScheduleMeeting] = useState(false);

  useEffect(() => {
    const checkHierarchy = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: employee } = await supabase
        .from("employees")
        .select("emp_hierarchylevel")
        .eq("user_id", user.id)
        .single();

      if (employee?.emp_hierarchylevel === 1) {
        setCanUploadTask(true);
        setCanScheduleMeeting(true);
      }
    };

    checkHierarchy();
  }, []);

  const navItems = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/chats", icon: FaRocketchat, label: "Chats" },
    { href: "/tasks", icon: FaTasks, label: "Tasks" },
    { href: "/upcomingmeetings", icon: MdOutlineUpcoming, label: "Upcoming Meetings" },
    {
      href: canUploadTask ? "/taskupload" : "/error",
      icon: AiOutlineSchedule,
      label: "Task Upload",
      disabled: !canUploadTask,
    },
    {
      href: canScheduleMeeting ? "/schedulemeeting" : "/error2",
      icon: MdMeetingRoom,
      label: "Schedule Meeting",
      disabled: !canScheduleMeeting,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-white border-r border-gray-200 shadow-sm flex flex-col py-4">
      {/* Dashboard Icon */}
      <div className="flex justify-center items-center mb-48">
        <MdDashboard className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
      </div>

      {/* Nav Items */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              disabled={item.disabled}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
