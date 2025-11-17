
import { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { Icon } from "@iconify/react";
import Notification from "./notification";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import { useAdmin } from 'src/context/AdminContext';
import { settingsService } from 'src/services/api/settingsService';
import { removeAuthToken } from 'src/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'flowbite-react';
import user1 from "/src/assets/images/profile/user-1.jpg";

const Header = () => {
  const { admin, dispatch } = useAdmin();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const [isSticky, setIsSticky] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    dispatch({ type: 'LOGOUT' });
    navigate('/auth/login');
  };

  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      try {
        const resp = await settingsService.getProfile();
        const data = resp.data || resp;
        const name = data.name || data.fullName || data.username || data.email;
        if (mounted && name) setDisplayName(name);
      } catch (error) {
        // ignore
      }
    };
    loadProfile();
    return () => { mounted = false; };
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsSticky(window.scrollY > 50);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-4 py-2.5">
        <Navbar className="bg-white dark:bg-gray-800 px-4">
          <div className="flex gap-3 items-center justify-between w-full">
            <div className="flex gap-2 items-center">
              <span 
                onClick={() => setIsOpen(true)} 
                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
              </span>
              <Notification />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={user1}
                  alt="admin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {displayName || (admin?.email ?? 'admin@fairstakebet.com')}
                </span>
              </div>
              
              <Tooltip content="Logout" placement="top">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200"
                >
                  <Icon 
                    icon="solar:logout-2-bold-duotone" 
                    className="h-5 w-5"
                  />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </Navbar>

        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="xl:hidden"
        >
          <MobileSidebar />
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
