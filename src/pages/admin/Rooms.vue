<template>
  <div>
    <h1 class="p-3 text-3xl text-center text-[#BA8D5B] font-semibold">
      {{ store.$id.toUpperCase() }}
    </h1>
    <roomModal ref="modal_value" />
    <VButton btn_type="primary" @click="openModal" class="m-3"
      >Create room</VButton
    >
    <appTable :headers="headers" :body="store?.rooms">
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value" />
      </template>
    </appTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoomStore } from "../../stores/admin/room";
import appTable from "../../components/ui/Table.vue";
import VButton from "../../components/form/VButton.vue";
import roomModal from "./Modals/roomModal.vue";
import VActions from "../../components/form/VActions.vue";
const store = useRoomStore();

const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});
const modal_value = ref();

const headers = ref([
  { title: "Room name", value: "name" },
  { title: "Room size", value: "size" },
  { title: "Action", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};

onMounted(() => {
  store.getAdminRooms(params.value);
});
</script>

<style lang="scss" scoped></style>
