export default {
  path: "/admin",
  name: "admin",
  component: import("../pages/admin/Admin.vue"),
  children: [
    {
      path: "/students",
      name: "students",
      meta: {
        child: "students",
      },
      component: import("../pages/admin/Students.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      meta: {
        child: "courses",
      },
      component: import("../pages/admin/Courses.vue"),
    },
    {
      path: "/groups",
      name: "groups",
      meta: {
        child: "groups",
      },
      component: import("../pages/admin/Group.vue"),
    },
    {
      path: "/rooms",
      name: "rooms",
      meta: {
        child: "rooms",
      },
      component: import("../pages/admin/Rooms.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        child: "profile",
      },
      component: import("../pages/global/Profile.vue"),
    },
  ],
};
