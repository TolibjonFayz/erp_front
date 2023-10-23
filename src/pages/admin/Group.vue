<template>
  <div>
    <h1>Groups</h1>
    <groupModal ref="group_modal" />
    <VButton @click="openModal" btn_type="primary">Create group</VButton>
    <appTable :headers="headers" :body="store?.groups">
      <template #body_days="{ item }">
        <div v-if="item.days" class="flex gap-2">
          <span>Mon</span>
          <span>Wen</span>
          <span>Fr</span>
        </div>
        <div v-else class="flex gap-2">
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>
      </template>
      <template #body_start_date="{ item }">
        <span>{{ formatDate(item?.start_date) }}</span>
      </template>
      <template #body_end_date="{ item }">
        <span>{{ formatDate(item?.end_date) }}</span>
      </template>
      <template #body_start_time="{ item }">
        <span>{{ formatTime(item?.start_time) }}</span>
      </template>
      <template #body_end_time="{ item }">
        <span>{{ formatTime(item?.end_time) }}</span>
      </template>
      <template #body_course="{ item }">
        <span>{{ item?.course?.name }}</span>
      </template>
      <template #body_room="{ item }">
        <span>{{ item?.room?.name }}</span>
      </template>
      <!-- <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value" :path=""></VActions>
      </template> -->
    </appTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGroupStore } from "../../stores/admin/group";
import { useCourseStore } from "../../stores/admin/course";
import appTable from "../../components/ui/Table.vue";
import VButton from "../../components/form/VButton.vue";
import groupModal from "./Modals/groupModal.vue";
import moment from "moment";
import VActions from "../../components/form/VActions.vue";
const store = useGroupStore();
const store2 = useCourseStore();

const params = ref({
  page: 1,
  limit: 50,
  last_page: null,
});
const formatDate = (data) => {
  return moment(data).format("YYYY-MM-DD");
};

const formatTime = (time) => {
  let hour = `${parseInt(time / 60)}`.padStart(2, 0);
  let minute = `${time % 60}`.padStart(2, 0);
  let result = `${hour}:${minute}`;
  return result;
};
const group_modal = ref();

const headers = ref([
  { title: "Group name", value: "name" },
  { title: "Course name", value: "course" },
  { title: "Start date", value: "start_date" },
  { title: "End date", value: "end_date" },
  { title: "Days", value: "days" },
  { title: "Start time", value: "start_time" },
  { title: "End time", value: "end_time" },
  { title: "Status", value: "status" },
  { title: "Room", value: "room" },
  { title: "Action", value: "actions" },
]);

const openModal = () => {
  group_modal.value.openModal();
};

onMounted(() => {
  store.getAdminGroups(params.value);
  store2.getAdminCourses(params.value);
});
</script>

<style lang="scss" scoped></style>
