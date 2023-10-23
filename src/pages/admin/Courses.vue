<template>
  <div>
    <h1 class="p-3 text-3xl text-center text-cyan-700 font-semibold">
      Courses
    </h1>
    <courseModal ref="modal_value" />
    <VButton
      btn_type="primary"
      @click="openModal"
      class="m-3"
      :isLoading="loading"
      >Create course</VButton
    >
    <appTable :headers="headers" :body="store?.courses">
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value" />
      </template>
    </appTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCourseStore } from "../../stores/admin/course";
import appTable from "../../components/ui/Table.vue";
import VButton from "../../components/form/VButton.vue";
import courseModal from "./Modals/courseModal.vue";
import VActions from "../../components/form/VActions.vue";
const store = useCourseStore();

const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});
const modal_value = ref();

const headers = ref([
  { title: "Course name", value: "name" },
  { title: "Course cost", value: "price" },
  { title: "Course period", value: "period" },
  { title: "Action", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};

onMounted(() => {
  store.getAdminCourses(params.value);
});
</script>

<style lang="scss" scoped></style>
