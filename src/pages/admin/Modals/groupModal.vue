<template>
  <AppModal v-model="dialog">
    <div class="my-[5px]">
      <h1 v-if="!forms._id" class="text-center text-[30px] text-global1">
        Add Group
      </h1>
      <h1 v-else class="text-center text-[30px] text-global1">Edit Group</h1>
    </div>

    <Form @submit="save">
      <!-- Group name -->
      <label for="name" class="text-global1 text-[20px] font-normal"
        >Name</label
      >
      <Field
        rules="required"
        :model-value="forms.name"
        v-slot="{ errors }"
        name="Name"
      >
        <input
          type="text"
          v-model="forms.name"
          id="name"
          placeholder="Enter group name"
          class="w-full px-[15px] py-[12px] text-[21px] outline-none border-[1px] border-global1 rounded-md"
        />
        <p
          class="text-error_color mt-2 text-[18px] font-medium"
          v-if="errors && errors.length"
        >
          {{ errors[0] }}
        </p>
      </Field>

      <!-- Start date -->
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal"
          >Select date</label
        >
        <Field
          rules="required"
          :model-value="forms.start_date"
          v-slot="{ errors }"
          name="Date"
        >
          <el-date-picker
            v-model="date_time_picker.date"
            type="date"
            placeholder="Start a date"
            :default-value="
              forms.start_date ? new Date(forms.start_date) : null
            "
            @change="handleChangeDate($event)"
            style="
              width: 100%;
              height: 50px;
              border: 1px solid #ba8d5b;
              border-radius: 5px;
              otline: none;
              font-size: 21px;
            "
          />
          <p
            class="text-error_color mt-2 text-[18px] font-medium"
            v-if="errors && errors.length"
          >
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <!-- Select days -->
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal"
          >Select days</label
        >
        <Field
          rules="day_active"
          :modelValue="forms.days"
          v-slot="{ errors }"
          name="Days"
        >
          <select
            @change="handleChangeDays($event)"
            class="w-full py-[12px] px-[10px] outline-none border-[1px] border-global1 rounded-md text-[21px]"
          >
            <option value="" selected hidden>Select days</option>
            <option value="even">Even days</option>
            <option value="odd">Odd days</option>
          </select>
          <p
            class="text-error_color mt-2 text-[20px] font-medium"
            v-if="errors && errors.length"
          >
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <!-- Start and end time -->
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal">
          Select time
        </label>
        <Field
          rules="required"
          :modelValue="forms.start_time"
          v-slot="{ errors }"
          name="Time"
        >
          <el-time-picker
            v-model="date_time_picker.time"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
            @change="handleChangeTime($event)"
            style="
              width: 100%;
              height: 50px;
              border: 1px solid #ba8d5b;
              border-radius: 5px;
              otline: none;
              font-size: 21px;
            "
          />
          <p
            class="text-error_color mt-2 text-[20px] font-medium"
            v-if="errors && errors.length"
          >
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <!-- Aviable group -->
      <div v-if="group_store?.rooms.length" class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal">
          Select Room
        </label>
        <Field
          rules="required"
          :model-value="forms.room"
          v-slot="{ errors }"
          name="Room"
        >
          <select
            class="w-full py-[12px] px-[10px] outline-none border-[1px] border-global1 rounded-md text-[21px]"
            v-model="forms.room"
          >
            <option value="" selected hidden>Select rooms</option>
            <option
              :value="item._id"
              v-for="(item, index) in group_store?.rooms"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
          <p
            class="text-error_color mt-2 text-[20px] font-medium"
            v-if="errors && errors.length"
          >
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <!-- Select course -->
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal">
          Select Course
        </label>
        <Field
          rules="required"
          :modelValue="forms.course._id"
          v-slot="{ errors }"
          name="Course"
        >
          <select
            v-model="forms.course._id"
            @change="handlechangeCourse($event)"
            class="w-full py-[12px] px-[10px] outline-none border-[1px] border-global1 rounded-md text-[21px]"
          >
            <!-- <option value="" selected hidden>Select course</option> -->
            <option
              :value="item._id"
              v-for="(item, index) in course_store?.courses"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
          <p
            class="text-error_color mt-2 text-[20px] font-medium"
            v-if="errors && errors.length"
          >
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <!-- Select teacher -->
      <div class="flex flex-col">
        <label
          v-if="forms._id || group_store?.teachers.length"
          for="name"
          class="text-global1 text-[20px] font-normal"
        >
          Select Teacher
        </label>
        <Field
          rules="required"
          :modelValue="forms.teacher"
          v-slot="{ errors }"
          name="Teacher"
        >
          <select
            v-model="forms.teacher"
            class="w-full py-[12px] px-[10px] outline-none border-[1px] border-global1 rounded-md text-[21px]"
          >
            <option value="" selected hidden>Select teacher</option>
            <option
              :value="item._id"
              v-for="(item, index) in group_store?.teachers"
              :key="index"
            >
              {{ item.first_name }}
            </option>
          </select>
          <p
            class="text-error_color mt-2 text-[20px] font-medium"
            v-if="errors && errors.length && group_store?.teachers.length"
          >
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <!-- Button -->
      <div class="flex justify-center mt-[30px]">
        <VButton @click="save" btn_type="primary">{{ btn_title }}</VButton>
      </div>
    </Form>
  </AppModal>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VButton from "../../../components/form/VButton.vue";
import moment from "moment";
import { useGroupStore } from "../../../stores/admin/group";
import { useCourseStore } from "../../../stores/admin/course";
import { Form, Field } from "vee-validate";
const group_store = useGroupStore();
const course_store = useCourseStore();
const dialog = ref(false);
const loading = ref(false);
const course_name = ref();
const forms = reactive({
  name: "",
  start_date: "",
  start_time: "",
  end_time: "",
  room: "",
  course: {
    _id: "",
  },
  days: null,
  status: true,
  teacher: "",
});
const date_time_picker = reactive({
  date: "",
  time: [new Date(), new Date()],
});

const handleChangeDays = (e) => {
  if (e.target.value == "even") {
    forms.days = false;
  } else {
    forms.days = true;
  }
};

const handleChangeDate = (e) => {
  forms.start_date = moment(e).format("YYYY-MM-DD");
};

const handleChangeTime = async (e) => {
  let get_h0 = e[0].getHours();
  let get_m0 = e[0].getMinutes();
  let get_h1 = e[1].getHours();
  let get_m1 = e[1].getMinutes();

  forms.start_time = get_h0 * 60 + get_m0;
  forms.end_time = get_h1 * 60 + get_m1;
  let payload = {
    start_date: forms.start_date,
    start_time: forms.start_time,
    end_time: forms.end_time,
    days: forms.days,
  };
  await group_store.aviableAdminRooms(payload);
};

const handlechangeCourse = async (e) => {
  // course_name = e.target.value;
  await group_store.getGroupTeacher(e.target.value);
};

const openModal = async (item) => {
  if (item) {
    forms = { ...item };
    date_time_picker.date = item.start_date;
    await group_store.getGroupTeacher(item.course._id);
  }
  dialog.value = true;
  course_store.getAdminCourses({
    page: 1,
    limit: 10,
    last_page: null,
  });
};

const save = async () => {
  await group_store.createAdminGroup({
    ...forms,
    teacher: null,
    course: forms.course._id,
  });
  let result = {
    group: group_store?.group_id,
    teacher: forms.teacher,
  };
  await group_store.addGroupTeacher(result);
};

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms._id) return "Edit group";
    return "Create group";
  }
});

defineExpose({ openModal });
</script>

<style scoped>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>
