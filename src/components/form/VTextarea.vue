<template>
  <div class="flex-col flex relative my-3">
    <label
      :for="name"
      class="block mb-2 text-base font-medium text-paragraph-default"
      >{{ label }}</label
    >
    <vee-field
      :type="type"
      :name="name"
      class="relative focus:outline-none border-paragraph-deafult border-[2px]"
      as="textarea"
      rows="4"
      cols="50"
    />
    <slot name="prepend__icon"></slot>
    <div class="apppend_icon">
      <slot name="append__icon"></slot>
    </div>
    <ErrorMessage class="text-danger text-sm" :name="name" />
  </div>
</template>

<script setup>
import { ErrorMessage } from "vee-validate";

const props = defineProps({
  label: {
    type: String,
  },
  name: {
    type: String,
  },
  placeHolderProps: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.append_icon {
  position: absolute;
  right: 0;
  padding: 0 10px;
  top: 30%;
  transform: translate(-5%, 65%);
  cursor: pointer;
}
</style>
