<template>
  <div class="p-[20px]">
    <VButton btn_type="primary" @click="active = !active">Change</VButton>
    <div v-if="active">
      <checkStudents ref="modal_value" />
      <div class="w-full flex items-center justify-between gap-5">
        <div class="w-full">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="All lessons">
              <div class="w-full flex gap-2 flex-wrap">
                <div v-for="(item, index) in store?.group_lessons" :key="index">
                  <el-popover
                    placement="top-start"
                    :title="
                      FormatDate(item.date) + ' ' + `Lesson${item?.number}`
                    "
                    :width="200"
                    trigger="hover"
                    transition="100 linear"
                    :content="item?.description"
                  >
                    <template #reference>
                      <div
                        class="w-[40px] h-[40px] border-[1px] px-[5px] text-global1 border-global1 flex items-center"
                        :class="
                          !item.pass
                            ? 'text-global1'
                            : 'bg-[crimson] text-[#fff] border-none'
                        "
                      >
                        {{ FormatDateAttendence(item.date) }}
                      </div>
                    </template>
                  </el-popover>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <VButton btn_type="primary" @click="openModal">
          <svgIcon type="mdi" :path="mdiMenu"></svgIcon>
        </VButton>
      </div>
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
                          ? 'text-global1'
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
    <div v-else>
      <h1>Video yuklash</h1>
      <select v-model="form.lesson">
        <option value="" selected hidden>Select a lesson</option>
        <option
          :value="item._id"
          v-for="(item, index) in store?.pass_lessons"
          :key="index"
        >
          {{ item.title }}
        </option>
      </select>
      <input type="file" @change="handleChange($event)" />
      <input
        type="text"
        v-model="form.video_name"
        class="border border-[#000]"
      />
      <VButton btn_type="primary" @click="save">Dars qo'shish</VButton>
      <h1>{{ status }}</h1>
      <h1>{{ progress }}</h1>
    </div>
  </div>
</template>

<script setup>
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { FormatDate, FormatDateAttendence } from "../../hooks/FormatDate";
import VButton from "../../components/form/VButton.vue";
import checkStudents from "./Modals/checkStudents.vue";
import svgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";
import { Loading } from "element-plus/es/components/loading/src/service";
const store = useTeacherSingleGroupStore();
const route = useRoute();
const active = ref(false);
const modal_value = ref();
const form = ref({
  video: "",
  lesson: "",
  video_name: "",
});
const params = ref({
  page: 1,
  limit: 10,
  per_page: null,
});

const openModal = async () => {
  await store.getTeacherSingleLesson(route.params.id, "2023-11-04");
  modal_value.value.openModal();
  let date = FormatDate(new Date());
};

const progress = ref("");
const handleChange = (e) => {
  form.value.video = e.target.files[0];
};

const loading = ref(null);
const status = computed(() => {
  if (loading.value === null) {
    return "";
  } else if (loading.value) {
    return "Yuklanmoqda";
  } else {
    return "Tayyor";
  }
});
const save = async () => {
  loading.value = true;
  let token = localStorage.getItem("token");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://34.125.211.64:3300/api/lesson-videos/upload", true);
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      var percentComputable = (e.loaded / e.total) * 100;
      progress.value = Math.round(percentComputable) + "% uploaded";
      if (Math.round(percentComputable) == 100) {
        loading.value = false;
      }
    }
  };
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("File uploaded successfully");
    } else {
      alert("File upload failed");
    }
  };
  let forms = new FormData();
  forms.append("video", form.value.video);
  forms.append("title", form.value.video_name);
  forms.append("lesson", form.value.lesson);
  xhr.send(forms);
};

onMounted(async () => {
  // await store.getTeacherSingleGroup(route.params.id);
  store.getAllStudentsAttendance(route.params.id, params.value);
  store.getAllGroupLessons(route.params.id);
});
</script>

<style lang="scss" scoped>
.el-collapse-item {
  color: #ba8d5b;
  padding: 10px;
  border: 1px solid #ba8d5b;
  margin: 5px 0;
}
</style>
