<template>
  <AppModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms"
    >
      <VInput
        type="text"
        label="Name"
        name="name"
        placeHolderProps="Course Name"
      ></VInput>
      <VInput
        type="number"
        label="Price"
        name="price"
        placeHolderProps="Price"
      ></VInput>
      <VInput
        type="number"
        label="Period"
        name="period"
        placeHolderProps="Period"
      ></VInput>
      <VButton type="submit" btn_type="primary" :isLoading="loading">{{
        btn_title
      }}</VButton>
    </vee-form>
  </AppModal>

  <AppModal v-model="dialog2">
    <h1>O'chirishga ishonchingiz komilmi?</h1>
    <button
      class="bg-[blue] text-white p-1 m-1 rounded-sm"
      @click="dialog2 = false"
    >
      Cancel
    </button>
    <button
      class="bg-[crimson] text-white p-1 m-1 rounded-sm"
      @click="deleteCourse"
    >
      Delete
    </button>
  </AppModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import VButton from "../../../components/form/VButton.vue";
import { useCourseStore } from "../../../stores/admin/course";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";

const store = useCourseStore();

const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const unique_id = ref();

let forms = ref({
  name: "",
  price: "",
  period: "",
});

const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  unique_id.value = id;
  dialog2.value = true;
};

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const schema = computed(() => ({
  name: "required|min:3|max:15",
  price: "required|min:3|max:15",
  period: "required|min:1|max:20",
}));

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value._id) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});

const send = async (values) => {
  if (!forms.value._id) {
    loading.value = true;
    await store.createAdminCourse(values);
    loading.value = false;
  } else {
    loading.value = true;
    await store.updateAdminCourse(values, forms.value._id);
    loading.value = false;
  }
  // loading.value = false;
};

const deleteCourse = async () => {
  await store.deleteAdminCourse(unique_id.value);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
