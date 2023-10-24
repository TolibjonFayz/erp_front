import { defineStore } from "pinia";
import adminGroup from "../../api/admin/adminGroup";

export const useGroupStore = defineStore({
  id: "group",
  state: () => ({
    groups: [],
    rooms: [],
  }),
  actions: {
    async getAdminGroups(params) {
      try {
        let res = await adminGroup.getAdminGroups(params);
        this.groups = res.groups;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },
    async createAdminGroup(payload) {
      try {
        await adminGroup.createAdminGroup(payload);
      } catch (err) {
        console.log(err);
      }
    },
    async updateAdminGroup(payload, id) {
      try {
        await adminGroup.updateAdminGroup(payload, id);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAdminGroup(payload, id) {
      try {
        await adminGroup.deleteAdminGroup(payload, id);
      } catch (err) {
        console.log(err);
      }
    },

    async aviableAdminRooms(payload) {
      try {
        let res = await adminGroup.aviableAdminRooms(payload);
        this.rooms = res;
      } catch (error) {
        console.log(error);
      }
    },

    async createAdminStudent(payload) {
      try {
        let res = await adminGroup.createAdminStudent(payload);
        // this.rooms = res;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
