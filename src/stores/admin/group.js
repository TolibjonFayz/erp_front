import { defineStore } from "pinia";
import adminGroup from "../../api/admin/adminGroup";

export const useGroupStore = defineStore({
  id: "group",
  state: () => ({
    groups: [],
    rooms: [],
    teachers: [],
    group_id: "",
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
    async getGroupTeacher(id) {
      try {
        let res = await adminGroup.getGroupTeacher(id);
        this.teachers = res.teachers;
      } catch (err) {
        console.log(err);
      }
    },
    async addGroupTeacher(payload) {
      try {
        await adminGroup.addGroupTeacher(payload);
      } catch (err) {
        console.log(err);
      }
    },
    async createAdminGroup(payload) {
      try {
        let res = await adminGroup.createAdminGroup(payload);
        this.group_id = res.group._id;
      } catch (err) {
        console.log(err);
      }
    },
    async updateAdminGroup(payload, id) {
      try {
        let res = await adminGroup.updateAdminGroup(payload, id);
        console.log(res, "res");
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
      } catch (error) {
        console.log(error);
      }
    },
  },
});
