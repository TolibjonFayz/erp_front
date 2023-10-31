<template>
  <AppModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="save"
      :initial-values="forms"
    >
      <VTextarea
        name="description"
        placeHolderProps="Sababini kiriting"
      ></VTextarea>
      <VButton btn_type="primary" type="submit">Save</VButton>
    </vee-form>
  </AppModal>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VTextarea from "../../../components/form/VTextarea.vue";
import VButton from "../../../components/form/VButton.vue";
import { useGroupStore } from "../../../stores/admin/group";
const store = useGroupStore();
const forms = ref({});
const dialog = ref(false);

const openModal = (item) => {
  if (item) {
    forms.value = { ...item };
  }
  dialog.value = true;
};

const schema = computed(() => {
  return {
    description: "required|min:3|max:50",
  };
});

const save = async (value) => {
  if (value.number) {
    await store.updateLessonSingleGroup(forms.value._id, {
      ...value,
      paid: false,
    });
  } else {
    let payload = {
      comment: value.description,
      participated: false,
    };
    await store.updateStudentsSingleGroup(forms.value.lesson, payload);
  }
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
