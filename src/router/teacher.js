export default {
  path: "/teacher",
  name: "teacher",
  component: import("../pages/teacher/Teacher.vue"),
  children: [
    {
      path: "/group",
      name: "group",
      component: import("../pages/teacher/Groups.vue"),
    },
  ],
};
