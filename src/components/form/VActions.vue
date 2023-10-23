<template>
  <div class="w-full flex items-center justify-center">
    <svg-icon
      type="mdi"
      class="2-[30px] h-[30px] cursor-pointer text-[#08a8a8]"
      :path="mdiPencil"
      @click="openEditModal"
    ></svg-icon>
    <svg-icon
      type="mdi"
      class="w-[30px] h-[30px] cursor-pointer text-[crimson]"
      :path="mdiDelete"
      @click="openDeleteModal"
    >
    </svg-icon>
    <svg-icon
      type="mdi"
      class="w-[30px] h-[30px] cursor-pointer text-[aqua]"
      :path="mdiEye"
      @click="openSingleUser"
    >
    </svg-icon>
  </div>
</template>

<script setup>
import { mdiDelete, mdiEye, mdiPencil } from "@mdi/js";
import svgIcon from "@jamescoyle/vue-icon";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  item: {
    type: Object,
  },
  modal_value: {
    type: String,
  },
  path: {},
});
const openEditModal = () => {
  props.modal_value.openModal(props.item);
};

const openDeleteModal = () => {
  props.modal_value.openDeleteModal(props.item._id);
};

const openSingleUser = () => {
  router.push("");
};
</script>

<style lang="scss" scoped></style>
