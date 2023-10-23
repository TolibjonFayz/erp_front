<template>
  <AppModal v-model="dialog">
    <div>
      <h1 class="text-center text-[30px] text-global1" v-if="!forms._id">
        Create staff
      </h1>
      <h1 class="text-center text-[30px] text-global1" v-else>Edit staff</h1>
    </div>
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms"
    >
      <VSelect
        label="Select a role"
        :options="store2?.roles"
        name="role"
        @change="handleChange($event)"
      >
      </VSelect>

      <VInput
        type="text"
        label="First name"
        name="first_name"
        placeHolder="First name"
      ></VInput>
      <VInput
        type="text"
        label="Last name"
        name="last_name"
        placeHolder="Last name"
      ></VInput>
      <VInput
        type="text"
        label="Phone number"
        name="phone"
        mask="(+998)-##-###-##-##"
        placeHolder="Phone number"
      ></VInput>
      <VSelect
        label="Select a course"
        :options="store?.courses"
        name="course"
        v-if="isActive"
      >
      </VSelect>
      <div class="flex justify-center mt-[30px]">
        <VButton type="submit" btn_type="primary" :isLoading="loading">{{
          btn_title
        }}</VButton>
      </div>
    </vee-form>
  </AppModal>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VSelect from "../../../components/form/VSelect.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import { useCourseStore } from "../../../stores/admin/course";
import { useRoleStore } from "../../../stores/director/role";
const store = useCourseStore();
const store2 = useRoleStore();
const dialog = ref(false);
const loading = ref(false);
const isActive = ref(false);
const forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
});
const roles = ref([
  { name: "admin" },
  { name: "teacher" },
  { name: "finance" },
]);
const schema = computed(() => {
  return {
    first_name: "required|min:3|max:15",
    last_name: "required|min:3|max:15",
    role: "required|min:3|:max:15",
    phone: "required|min:3|:max:15",
    course: "required|min:3|:max:30",
  };
});
const handleChange = (e) => {
  let val = JSON.parse(e.target.value);
  if (val.name == "teacher") isActive.value = true;
  else isActive.value = false;
  console.log(JSON.parse(e.target.value).name);
};
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) return "Edit staff";
    return "Create staff";
  }
});
const openModal = () => {
  dialog.value = true;
  store.getAdminCourses();
  store2.getRoles();
};

const send = (values) => {
  let payload = {
    ...values,
    role: JSON.parse(values.role)._id,
    course: values.course ? JSON.parse(values.course)._id : "",
  };
  console.log(payload, values);
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
