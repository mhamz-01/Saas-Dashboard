"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import ProtectedRoute from "../protectedroute";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define auth-related pages where Sidebar & Navbar should be hidden
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

  if (isAuthPage) {
    return <div className="w-full min-h-screen bg-white">{children}</div>;
  }

  return (
    <ProtectedRoute>
    <div className="flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-[72px]">
        <Navbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
