<template>
  <div>
    <input
      type="text"
      v-model="phone_number"
      label="First name"
      class="border-2"
    />
    <button @click="save">save</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "../../stores/admin/group";
const store = useGroupStore();
const route = useRoute();
const phone_number = ref("");

const save = async () => {
  let payload = {
    group: `${route.params.id}`,
    student_phone: phone_number.value,
  };
  await store.createAdminStudent(payload);
};
</script>

<style lang="scss" scoped></style>
