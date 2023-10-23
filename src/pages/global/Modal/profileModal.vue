<template>
  <AppModal v-model="dialog">
    <h1>Profile</h1>
    <input
      type="file"
      placeholder="Select yourr file"
      @change="handleChange($event)"
    />
    <img
      v-if="image"
      :src="image"
      class="w-[100px] h-[100px] rounded-full"
      alt="image"
    />
    <div>
      <vee-form
        :validation-schema="schema"
        @submit="editProfile"
        :initial-values="forms"
      >
        <VInput
          type="text"
          label="First name"
          name="first_name"
          place-holder="First Name"
        >
        </VInput>
        <VInput
          type="text"
          label="Last name"
          name="last_name"
          place-holder="Last Name"
        >
        </VInput>
        <VInput
          type="text"
          label="Phone number"
          name="phone"
          mask="(+998)-##-###-##-##"
          place-holder="(+998)-93-102-06-36"
        >
        </VInput>
        <VButton btn_type="edit" type="submit">Edit profile</VButton>
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
const image = ref("");
const forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
});

const openModal = () => {
  dialog.value = true;
  forms.value = store?.user;
};

const schema = computed(() => ({
  first_name: "required|min:3|max:15",
  last_name: "required|min:3|max:15",
  phone: "required|min:3|max:20",
}));
const handleChange = async (e) => {
  const form = new FormData();
  form.append("image", e.target.files[0]);
  await store.updateImage(form);
  image.value = `${store?.image}`;
};

const editProfile = async (values) => {
  console.log(values);
  let a = values.phone.split("");
  let b = a.filter((item) => !isNaN(+item));
  let c = "+" + b.join("");
  let payload = {
    ...values,
    image: store.image,
    phone: c,
  };
  await store.updateProfile(payload);
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
