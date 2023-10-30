<template>
  <AppModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms"
    >
      <VInput
        type="text"
        label="First Name"
        name="first_name"
        placeHolderProps="First Name"
      ></VInput>
      <VInput
        type="text"
        label="Last Name"
        name="last_name"
        placeHolderProps="Last Name"
      ></VInput>
      <VInput
        type="text"
        label="Phone number"
        name="phone"
        :placeHolderProps="getPhonePlaceholder"
        :mask="phoneMask"
      ></VInput>
      <VButton type="submit" btn_type="primary" :isLoading="loading">{{
        btn_title
      }}</VButton>
    </vee-form>
  </AppModal>

  <AppModal v-model="dialog2">
    <Vdelete v-model="dialog2" :deleteUser="deleteStudent" />
  </AppModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VButton from "../../../components/form/VButton.vue";
import VInput from "../../../components/form/VInput.vue";
import Vdelete from "../../../components/form/Vdelete.vue";
import { useStudentStore } from "../../../stores/admin/student";

const store = useStudentStore();

const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const unique_id = ref();

let forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
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
  first_name: "required|min:3|max:15",
  last_name: "required|min:3|max:15",
  phone: "required|min:3|max:20",
}));

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});

const send = async (values) => {
  let a = values.phone.split("");
  let b = a.filter((item) => !isNaN(+item));
  let c = "+" + b.join("");

  let payload = {
    first_name: values.first_name,
    last_name: values.last_name,
    phone: values.phone,
  };

  if (!forms.value._id) {
    await store.createStudent({ ...values, phone: c });
  } else {
    await store.updateStudent(payload, forms.value._id);
  }

  loading.value = false;
};

const deleteStudent = async () => {
  await store.deleteStudent(unique_id.value);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
