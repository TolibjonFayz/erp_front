import { defineStore } from "pinia";
import teacherSingleGroup from "../../api/teacher/teacherSingleGroup";

export const useTeacherSingleGroupStore = defineStore({
  id: "teacher_single_group",
  state: () => ({
    teacher_students: [],
  }),
  actions: {
    async getTeacherSingleGroup(id) {
      try {
        let res = await teacherSingleGroup.getTeacherSingleGroup(id);
        this.teacher_students = res.students;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
