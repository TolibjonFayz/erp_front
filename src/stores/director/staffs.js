import { defineStore } from "pinia";
import directorStaffs from "../../api/director/directorStaffs";

export const useStaffStore = defineStore({
  id: "staffs",
  state: () => ({
    staffs: [],
  }),
  actions: {
    async getStaffs(params) {
      try {
        let res = await directorStaffs.getStaffs(params);
        this.staffs = res.staffs;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },
    async createDirectorStaff(payload) {
      try {
        await directorStaffs.createStaff(payload);
      } catch (err) {
        console.log(err);
      }
    },
    // async updateAdminRoom(payload, id) {
    //   try {
    //     await adminRoom.updateAdminRoom(payload, id);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async deleteAdminRoom(payload, id) {
    //   try {
    //     await adminRoom.deleteAdminRoom(payload, id);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
});
