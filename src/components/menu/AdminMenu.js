import {
  mdiAccount,
  mdiAccountGroupOutline,
  mdiBook,
  mdiDoorSliding,
  mdiCog,
} from "@mdi/js";
export const AdminMenu = [
  {
    path: "/students",
    label: "Students",
    name: "students",
    icon: mdiAccount,
  },
  {
    path: "/courses",
    label: "Courses",
    name: "courses",
    icon: mdiBook,
  },
  {
    path: "/groups",
    label: "Group",
    name: "group",
    keys: "single_group",
    icon: mdiAccountGroupOutline,
  },
  {
    path: "/rooms",
    label: "Rooms",
    name: "rooms",
    icon: mdiDoorSliding,
  },
  {
    path: "/profile",
    label: "Profile",
    name: "profile",
    icon: mdiCog,
  },
];
