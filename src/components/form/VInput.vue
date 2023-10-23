<template>
  <div class="w-full flex flex-col">
    <label :for="name" class="text-global1 text-[20px] font-normal">{{
      label
    }}</label>
    <vee-field
      v-if="mask"
      v-mask="'(+998)-##-###-##-##'"
      masked:true
      :type="type"
      :name="name"
      mask="mask"
      :placeholder="placeHolder"
      class="p-[20px] text-[21px] outline-none border"
    ></vee-field>
    <vee-field
      v-else
      :type="type"
      :name="name"
      :placeholder="placeHolder"
      class="p-[20px] text-[21px] outline-none border"
    ></vee-field>
    <ErrorMessage
      :name="name"
      class="text-error_color text-[20px] font-medium"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  placeHolder: {
    type: String,
  },
  label: {
    type: String,
  },
  mask: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
