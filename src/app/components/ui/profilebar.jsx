"use client";

import Image from "next/image";
import Piechart from "./barchart";
import { useAuth } from "../../../../lib/AuthProvider";


export default function ProfileBar() {
  const { user } = useAuth();

  if (!user) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-xl rounded-lg p-6">
        <div className="flex items-center justify-between">
          {/* Column 1 - Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src="/saas-profile.jpg"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          {/* Column 2 - User Info */}
          <div className="flex-grow px-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {user.emp_name}
            </h2>
            <div className="my-2 border-b border-gray-200"></div>
            <div className="flex items-center">
              <span className="mr-2">Current Status:</span>
              <span className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                Online
              </span>
            </div>
            <p className="text-gray-600 mt-1">Designation: {user.emp_designation}</p>
          </div>

          {/* Column 3 - Graph */}
          <div className="w-1/3 h-54 flex flex-col items-center justify-center">
            <Piechart />
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-700">Completed Tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm text-gray-700">Uncompleted Tasks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
