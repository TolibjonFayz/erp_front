import { defineStore } from "pinia";
import teacherSingleGroup from "../../api/teacher/teacherSingleGroup";

export const useTeacherSingleGroupStore = defineStore({
  id: "teacher_single_group",
  state: () => ({
    teacher_students: [],
    lessons: [],
    group_lessons: [],
    pass_lessons: [],
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
    async updateTeacherLessonAttendence(id, title) {
      try {
        let res = await teacherSingleGroup.updateTeacherLessonAttendence(
          id,
          title
        );
      } catch (err) {
        console.log(err);
      }
    },
    async updateTeacherSingleLesson(payload) {
      try {
        let res = await teacherSingleGroup.updateTeacherSingleLesson(payload);
        // this.lessons = res;
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
    async getAllGroupLessons(id) {
      try {
        let res = await teacherSingleGroup.getAllGroupLessons(id);
        this.group_lessons = res.lessons;
        this.pass_lessons = res.lessons.filter((item) => item.pass == true);
      } catch (err) {
        console.log(err);
      }
    },
    async uploadTeacherVideo(payload) {
      try {
        let res = await teacherSingleGroup.uploadTeacherVideo(payload);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
