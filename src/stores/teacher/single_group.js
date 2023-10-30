import { defineStore } from "pinia";
import teacherSingleGroup from "../../api/teacher/teacherSingleGroup";

export const useTeacherSingleGroupStore = defineStore({
  id: "teacher_single_group",
  state: () => ({
    teacher_students: [],
    lessons: [],
  }),
  actions: {
    async getTeacherSingleLesson(group_id, date) {
      try {
        let res = await teacherSingleGroup.getTeacherSingleLesson(
          group_id,
          date
        );
        this.lessons = res;
      } catch (err) {
        console.log(err);
      }
    },
    async getAllStudentsAttendance(id, params) {
      try {
        let res = await teacherSingleGroup.getAllStudentsAttendance(id, params);
        this.teacher_students = res;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
