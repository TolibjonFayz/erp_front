<template>
  <div>
    <studentModal ref="modal_value" />
    <h1 class="p-3 text-3xl text-center text-[#BA8D5B] font-semibold">
      {{ store.$id.toUpperCase() }}
    </h1>
    <div class="flex gap-[40px]">
      <VButton
        type="submit"
        btn_type="primary"
        :isLoading="loading"
        @click="openModal"
        class="m-3"
      >
        Create student
      </VButton>
      <div class="w-[500px]">
        <input
          type="text"
          v-model="search"
          placeholder="Search"
          @change="handleChange($event)"
          class="w-full px-[15px] py-[12px] text-[21px] mt-1 outline-none border-[1px] border-global1 rounded-md"
        />
      </div>
    </div>
    <AppTable :headers="headers" :body="store?.students">
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value" />
      </template>
    </AppTable>

    <v-pagination
      v-model="params.page"
      :pages="params.last_page"
      :range-size="1"
      active-color="#EAF5FF"
      @update:modelValue="store.getStudents(params)"
    />
  </div>
</template>

<script setup>
import { useStudentStore } from "../../stores/admin/student";
import { onMounted, ref, watch } from "vue";
import VButton from "../../components/form/VButton.vue";
import studentModal from "../../pages/admin/Modals/studentModal.vue";
import AppTable from "../../components/ui/Table.vue";
import VPagination from "@hennge/vue3-pagination";
import VInput from "../../components/form/VInput.vue";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VActions from "../../components/form/VActions.vue";

const loading = ref(false);
const modal_value = ref("");
const store = useStudentStore();
const search = ref("");

const params = {
  page: 1,
  limit: 10,
  last_page: null,
};

const openModal = () => {
  modal_value.value.openModal();
};

const handleChange = async (e) => {
  // console.log(e.target.value);
  search.value = e.target.value;
  if (e.target.value == "") {
    window.location.reload();
  }
  await store.getStudentSearch(search.value);
};

watch(search, (value) => {
  if (value == "") {
    window.location.reload();
  }
});

const headers = ref([
  { title: "First name", value: "first_name" },
  { title: "Last name", value: "last_name" },
  { title: "Phone number", value: "phone" },
  { title: "Action", value: "action" },
]);

onMounted(() => {
  store.getStudents(params);
});
</script>

<style lang="scss" scoped></style>
