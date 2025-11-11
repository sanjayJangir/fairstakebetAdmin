import React from "react";
import { ChildItem } from "../Sidebaritems";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";



interface NavItemsProps {
  item: ChildItem;
}
const NavItems: React.FC<NavItemsProps> = ({ item }) => {
  const { pathname } = useLocation();
  const isActive = item.url === pathname;

  return (
    <div 
      className={`
        rounded-[5px] transition-all duration-200 
        ${isActive 
          ? 'bg-[rgba(203,215,255,0.03)] shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]' 
          : 'hover:bg-[rgba(203,215,255,0.03)] hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]'
        }
        transform hover:-translate-y-[2px] hover:scale-[1.01]
      `}
    >
      <Link
        to={item.url}
        className={`
          flex items-center px-4 py-3
          transition-all duration-200
          ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200'}
        `}
      >
        {item.icon && (
          <Icon 
            icon={item.icon} 
            className={`text-xl mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`}
          />
        )}
        <span className="text-sm font-medium">
          {item.name}
        </span>
      </Link>
    </div>
  );
};

export default NavItems;
