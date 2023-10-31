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
      class="relative focus:outline-none border-paragraph-default border-[2px]"
      :placeholder="placeHolderProps"
      as="textarea"
      rows="4"
      cols="50"
    />
    <slot name="prepend__icon"></slot>
    <div class="append_icon"></div>
    <slot name="append__icon"></slot>
  </div>
  <ErrorMessage class="text-danger text-sm" :name="name" />
</template>

<script setup>
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

<style lang="scss" scoped></style>
