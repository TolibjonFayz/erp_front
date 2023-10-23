import { defineStore } from "pinia";
import adminCourse from "../../api/admin/adminCourse";

export const useCourseStore = defineStore({
  id: "course",
  state: () => ({
    courses: [],
  }),
  actions: {
    async getAdminCourses(params) {
      try {
        let res = await adminCourse.getAdminCourses(params);
        this.courses = res.courses;
      } catch (err) {
        console.log(err);
      }
    },
    async createAdminCourse(payload) {
      try {
        await adminCourse.createAdminCourse(payload);
      } catch (err) {
        console.log(err);
      }
    },
    async updateAdminCourse(payload, id) {
      try {
        await adminCourse.updateAdminCourse(payload, id);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAdminCourse(payload, id) {
      try {
        await adminCourse.deleteAdminCourse(payload, id);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
