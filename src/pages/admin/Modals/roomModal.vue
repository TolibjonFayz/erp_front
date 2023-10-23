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
        place-holder="Room Name"
      ></VInput>
      <VInput
        type="number"
        label="Size"
        name="size"
        place-holder="Room size"
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
      @click="deleteRoom"
    >
      Delete
    </button>
  </AppModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import VButton from "../../../components/form/VButton.vue";
import { useRoomStore } from "../../../stores/admin/room";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";

const store = useRoomStore();

const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const unique_id = ref();

let forms = ref({
  name: "",
  size: "",
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
  size: "required|min:1|max:15",
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
    await store.createAdminRoom(values);
    loading.value = false;
  } else {
    loading.value = true;
    await store.updateAdminRoom(values, forms.value._id);
    loading.value = false;
  }
  // loading.value = false;
};

const deleteRoom = async () => {
  await store.deleteAdminRoom(unique_id.value);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
