'use client';
import { IoSearchOutline, IoNotificationsOutline, IoLogOutOutline } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import NavButton from './buttons/navbutton';
import { supabase } from '../../../../lib/supabaseClient';



export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/tasks':
        return 'Tasks';
      case '/schedule':
        return 'Schedule';
      default:
        return 'Dashboard';
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // redirect to login after logout
  };

  return (
    <div className="px-6 py-4">
      <nav className="h-16 px-6 rounded-lg border border-gray-200 bg-white flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          <h1 className="text-xl font-semibold text-gray-800">
            {getPageTitle(pathname)}
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          <NavButton 
            icon={IoSearchOutline} 
            onClick={() => {/* Add search handler */}} 
          />
          <NavButton 
            icon={IoNotificationsOutline} 
            hasNotification={true}
            onClick={() => {/* Add notification handler */}} 
          />
          <NavButton 
            icon={IoLogOutOutline} 
            onClick={handleLogout} 
          />
        </div>
      </nav>
    </div>
  );
}
