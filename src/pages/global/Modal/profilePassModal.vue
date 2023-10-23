<template>
  <AppModal v-model="dialog">
    <h1>Profile password</h1>
    <div>
      <vee-form
        :validation-schema="schema"
        @submit="editProfilePassword"
        :initial-values="forms"
      >
        <VInput
          type="text"
          label="Old password"
          name="old_password"
          place-holder="Old password"
        >
        </VInput>
        <VInput
          type="text"
          label="New password"
          name="new_password"
          place-holder="New password"
        >
        </VInput>
        <VInput
          type="text"
          label="Confirm password"
          name="confirm_password"
          place-holder="Confirm password"
        >
        </VInput>
        <VButton btn_type="primary" type="submit" class="mt-3"
          >Edit profile password</VButton
        >
      </vee-form>
    </div>
  </AppModal>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import { useAuthStore } from "../../../stores/auth";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
const store = useAuthStore();
const dialog = ref(false);
const forms = ref({
  old_password: "",
  new_password: "",
  confirm_password: "",
});

const openModal = () => {
  dialog.value = true;
  forms.value = store?.user;
};

const schema = computed(() => ({
  old_password: "required|min:3|max:15",
  new_password: "required|min:3|max:15",
  confirm_password: "required|min:3|max:15",
}));

const editProfilePassword = async (values) => {
  let payload = {
    old_password: values.old_password,
    new_password: values.new_password,
    confirm_password: values.confirm_password,
  };
  await store.updateProfilePassword(payload);
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
