
import ProfileBar from "./components/ui/profilebar";
import TasksSection from "./components/ui/tasksection";
import ChatSidebar from "./components/ui/chatsidebar";
import UpcomingMeetings from "./components/ui/upcomingmeeting";
import ActiveProjects from "./components/ui/activeprojects";
import { useAuth } from "../../lib/AuthProvider";
import ProtectedRoute from "./components/protectedroute";

export default function Home() {

  return (
    <ProtectedRoute>
    <div className="flex">
      {/* Main content */}
      <div className="flex-1">
        <ProfileBar />
        <TasksSection />
        <UpcomingMeetings />
        <ActiveProjects/>
      </div>

      {/* Right sidebar */}
      <ChatSidebar />
    </div>
    </ProtectedRoute>
  );
}
