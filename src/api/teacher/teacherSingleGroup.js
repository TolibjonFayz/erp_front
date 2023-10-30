import axiosClient from "../apiClient";

const teacherSingleGroup = {
  getTeacherSingleGroup(id) {
    const url = `groups/all-students/${id}`;
    return axiosClient.get(url);
  },
};

export default teacherSingleGroup;
