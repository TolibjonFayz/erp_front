<template>
  <div>
    <h1 class="p-3 text-3xl text-center text-[#BA8D5B] font-semibold">
      {{ store.$id.toUpperCase() }}
    </h1>
    <groupModal ref="modal_value" />
    <VButton @click="openModal" btn_type="primary" class="m-3"
      >Create group</VButton
    >
    <AppTable :headers="headers" :body="store?.groups">
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
        <span>{{ FormatDate(item?.start_date) }}</span>
      </template>
      <template #body_end_date="{ item }">
        <span>{{ FormatDate(item?.end_date) }}</span>
      </template>
      <template #body_start_time="{ item }">
        <span>{{ FormatTime(item?.start_time) }}</span>
      </template>
      <template #body_end_time="{ item }">
        <span>{{ FormatTime(item?.end_time) }}</span>
      </template>
      <template #body_course="{ item }">
        <span>{{ item?.course?.name }}</span>
      </template>
      <template #body_room="{ item }">
        <span>{{ item?.room?.name }}</span>
      </template>
      <template #body_action="{ item }">
        <VActions
          :item="item"
          :modal_value="modal_value"
          path="/single_group"
        />
      </template>
    </AppTable>

    <v-pagination
      v-model="params.page"
      :pages="params.last_page"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="store.getAdminGroups(params)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGroupStore } from "../../stores/admin/group";
import AppTable from "../../components/ui/Table.vue";
import VButton from "../../components/form/VButton.vue";
import groupModal from "./Modals/groupModal.vue";
import { FormatDate, FormatTime } from "../../hooks/FormatDate";
import VActions from "../../components/form/VActions.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
const store = useGroupStore();
const modal_value = ref();
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});

const openModal = () => {
  modal_value.value.openModal();
};

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
  { title: "Action", value: "action" },
]);

onMounted(() => {
  store.getAdminGroups(params.value);
});
</script>

<style lang="scss" scoped></style>
