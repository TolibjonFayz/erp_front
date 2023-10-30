<template>
  <div class="p-[20px]">
    <h1>Single group</h1>
    <checkStudents ref="modal_value" />
    <VButton btn_type="primary" @click="openModal">Davomat</VButton>
    <div class="demo-collapse">
      <el-collapse>
        <el-collapse-item
          :title="item.student.first_name + ' ' + item.student.last_name"
          :name="item._id"
          v-for="(item, index) in store?.teacher_students"
          :key="index"
        >
          <div class="w-full flex gap-2 flex-wrap">
            <div v-for="(item2, index2) in item.attendance" :key="index2">
              <el-popover
                placement="top-start"
                :title="FormatDate(item2.date)"
                :width="200"
                trigger="hover"
                transition="100 linear"
                :content="item2?.comment"
              >
                <template #reference>
                  <div
                    class="w-[40px] h-[40px] border-[1px] px-[5px] text-global1 border-global1 flex items-center"
                    :class="
                      item2.participated
                        ? ''
                        : 'bg-[crimson] text-[#fff] border-none'
                    "
                  >
                    {{ FormatDateAttendence(item2.date) }}
                  </div>
                </template>
              </el-popover>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { FormatDate, FormatDateAttendence } from "../../hooks/FormatDate";
import VButton from "../../components/form/VButton.vue";
import checkStudents from "./Modals/checkStudents.vue";
const store = useTeacherSingleGroupStore();
const route = useRoute();
const modal_value = ref();
const params = ref({
  page: 1,
  limit: 10,
  per_page: null,
});

const openModal = async () => {
  await store.getTeacherSingleLesson(route.params.id, "2023-10-31");
  modal_value.value.openModal();
  let date = FormatDate(new Date());
};

onMounted(async () => {
  // await store.getTeacherSingleGroup(route.params.id);
  store.getAllStudentsAttendance(route.params.id, params.value);
});
</script>

<style lang="scss" scoped>
.el-collapse-item {
  color: #ba8d5b;
  padding: 20px;
  border: 1px solid #ba8d5b;
  margin: 5px 0;
}
</style>
