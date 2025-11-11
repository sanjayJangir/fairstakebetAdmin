export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "DASHBOARD",
    children: [
      {
        name: "Dashboard",
        icon: "solar:home-2-bold-duotone",
        id: uniqueId(),
        url: "/dashboard",
      },
    ],
  },
  {
    heading: "MANAGEMENT",
    children: [
      {
        name: "User Management",
        icon: "solar:users-group-rounded-bold-duotone",
        id: uniqueId(),
        url: "/users",
      },
      {
        name: "Chat Management",
        icon: "solar:chat-round-dots-bold-duotone",
        id: uniqueId(),
        url: "/chats",
      },
    ],
  },
  {
    heading: "SETTINGS",
    children: [
      {
        name: "Profile Settings",
        icon: "solar:user-id-bold-duotone",
        id: uniqueId(),
        url: "/settings/profile",
      },
      {
        name: "System Settings",
        icon: "solar:settings-bold-duotone",
        id: uniqueId(),
        url: "/settings/system",
      },
    ],
  },
];

export default SidebarContent;
