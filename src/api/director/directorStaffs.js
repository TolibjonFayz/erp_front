import axiosClient from "../apiClient";

const directorStaffs = {
  getStaffs(params) {
    const url = `director/get-staffs/q?page=${params.page}&limit=${params.limits}`;
    return axiosClient.get(url, params);
  },
};

export default directorStaffs;
