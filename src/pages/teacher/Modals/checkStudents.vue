<template>
  <AppModal v-model="dialog">
    <h1 class="text-center">Check Students</h1>
    <div
      v-for="(item, index) in store?.lessons"
      :key="index"
      class="flex items-center justify-between my-3"
    >
      <span>{{
        item?.student?.first_name + " " + item?.student?.last_name
      }}</span>
      <div>
        <span @click="handleChange(item?.participated)">{{
          participated ? "participated" : "absent"
        }}</span>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
const dialog = ref(false);
import { useTeacherSingleGroupStore } from "../../../stores/teacher/single_group";
const store = useTeacherSingleGroupStore();
const participated = ref(true);
const openModal = () => {
  dialog.value = true;
};

const handleChange = () => {
  participated.value = !participated.value;
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
