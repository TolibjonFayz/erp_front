import axiosClient from "../apiClient";

const adminGroup = {
  getAdminGroups(params) {
    const url = `groups/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
  createAdminGroup(payload) {
    const url = "groups/create-group";
    return axiosClient.post(url, payload);
  },
  updateAdminGroup(payload, id) {
    const url = `groups/update/${id}`;
    return axiosClient.put(url, payload);
  },
  deleteAdminGroup(id) {
    const url = `groups/delete/${id}`;
    return axiosClient.delete(url);
  },
  async aviableAdminRooms(payload) {
    const url = `groups/available-rooms`;
    return axiosClient.post(url, payload);
  },
  async createAdminStudent(payload) {
    const url = `groups/add-student`;
    return axiosClient.post(url, payload);
  },
};

export default adminGroup;
