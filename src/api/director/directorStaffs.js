import axiosClient from "../apiClient";

const directorStaffs = {
  getStaffs(params) {
    const url = `director/get-staffs/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url, params);
  },
  createStaff(payload) {
    const url = "director/add-staff";
    return axiosClient.post(url, payload);
  },
};

export default directorStaffs;
