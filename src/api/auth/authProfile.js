import axiosClient from "../apiClient";

const authProfile = {
  getProfile() {
    const url = "profile/info";
    return axiosClient.get(url);
  },
  updateImage(payload) {
    const url = "profile/upload-image";
    return axiosClient.post(url, payload);
  },
  updateProfile(payload) {
    const url = "profile/update";
    return axiosClient.put(url, payload);
  },
  updateProfilePassword(payload) {
    const url = "profile/change-password";
    console.log(url);
    return axiosClient.post(url, payload);
  },
};

export default authProfile;
