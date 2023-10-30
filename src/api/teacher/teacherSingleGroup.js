import axiosClient from "../apiClient";

const teacherSingleGroup = {
  getTeacherSingleLesson(group_id, date) {
    const url = `groups/attendance/${group_id}`;
    return axiosClient.post(url, { date: date });
  },
  getAllStudentsAttendance(id, params) {
    const url = `groups/attendance/${id}/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
};

export default teacherSingleGroup;
