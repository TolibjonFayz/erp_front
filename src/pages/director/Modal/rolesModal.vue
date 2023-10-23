<template>
  <AppModal v-model="dialog">
    <div>
      <h1 class="text-center text-[30px] text-global1" v-if="!forms._id">
        Create role
      </h1>
      <h1 class="text-center text-[30px] text-global1" v-else>Edit role</h1>
    </div>
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms"
    >
      <VInput
        type="text"
        label="Role name"
        name="name"
        placeHolder="Role name"
      ></VInput>

      <VTextarea
        name="description"
        label="Description"
        placeHolderProps="Description"
      ></VTextarea>

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
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import VTextarea from "../../../components/form/VTextarea.vue";
import { useRoleStore } from "../../../stores/director/role";
const store = useRoleStore();
const dialog = ref(false);
const loading = ref(false);
const forms = ref({
  name: "",
  description: "",
});

const schema = computed(() => {
  return {
    name: "required|min:3|max:25",
    description: "required|min:3|max:50",
  };
});
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value._id) return "Edit role";
    return "Create role";
  }
});
const openModal = () => {
  dialog.value = true;
};

const send = async (values) => {
  await store.createRole(values);
  console.log(values);
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
