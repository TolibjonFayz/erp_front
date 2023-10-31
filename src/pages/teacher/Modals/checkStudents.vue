<template>
  <AppModal v-model="dialog">
    <h1 class="text-center">Check Students</h1>
    <vee-form @submit="save" :validation-schema="schema">
      <VInput type="text" name="title" placeHolder="Mavzuni kiriting"> </VInput>
    </vee-form>
    <div
      v-for="(item, index) in store?.lessons"
      :key="index"
      class="flex items-center justify-between my-3"
    >
      <span>{{
        item?.student?.first_name + " " + item?.student?.last_name
      }}</span>
      <div>
        <button
          type="button"
          @click="handleChange(index)"
          class="border-[1px] cursor-pointer bg-[green]"
        >
          {{ store.lessons[index].participated ? "participated" : "absent" }}
        </button>
      </div>
    </div>
    <VButton btn_type="primary" type="submit">SAVE</VButton>
  </AppModal>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
const dialog = ref(false);
import { useTeacherSingleGroupStore } from "../../../stores/teacher/single_group";
import VButton from "../../../components/form/VButton.vue";
import VInput from "../../../components/form/VInput.vue";
const store = useTeacherSingleGroupStore();
const openModal = () => {
  dialog.value = true;
};

const handleChange = (index) => {
  store.lessons[index].participated = !store.lessons[index].participated;
};

const schema = computed(() => {
  return {
    title: "required|min:3|max:50",
  };
});

const save = async (value) => {
  let id = store.lessons[0].lesson._id;
  await store.updateTeacherSingleLesson(store.lessons);
  store.updateTeacherLessonAttendence(id, value.title);
  console.log(store.lessons[0], "id");
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  margin: 0 10px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
}
</style>
