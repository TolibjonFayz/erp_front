<template>
  <div>
    <h1>Single group</h1>
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" style="--el-collapse-bg-color: green">
        <el-collapse-item
          :title="item?.first_name"
          :name="item?._id"
          v-for="(item, index) in store?.teacher_students"
          :key="index"
        >
          <div>
            <h1>{{ item?.first_name }}</h1>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const store = useTeacherSingleGroupStore();
const route = useRoute();

onMounted(() => {
  store.getTeacherSingleGroup(route.params.id);
});
</script>

<style lang="scss" scoped></style>
