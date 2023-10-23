import { defineStore } from "pinia";
import adminStudent from "../../api/admin/adminStudent";

export const useStudentStore = defineStore({
  id: "student",
  state: () => ({
    students: [],
  }),
  actions: {
    async getStudents(params) {
      try {
        let res = await adminStudent.getStudents(params);
        this.students = res.students;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },
    async createStudent(payload) {
      try {
        await adminStudent.createStudent(payload);
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
    async updateStudent(payload, studentId) {
      try {
        await adminStudent.updateStudent(payload, studentId);
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    },
    async deleteStudent(id) {
      try {
        await adminStudent.deleteStudent(id);
        setTimeout(() => {
          location.reload();
        }, 500);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
