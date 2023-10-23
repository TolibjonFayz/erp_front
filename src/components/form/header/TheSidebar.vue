<template>
  <div class="flex bg-white">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity opacity-50 lg:hidden bg-[#00111380]"
    ></div>
    <div
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-[222px] pt-[21.5px] flex flex-col text-center bg-global1 fixed inset-y-0 left-0 z-20 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static top-0"
    >
      <h1 class="ml-[15px] text-white mb-7">Sidebar</h1>
      <router-link
        v-for="(item, index) in menu"
        :key="index"
        class="flex py-[15px] px-[30px] gap-[15px] text-white"
        :to="item.path"
        :class="{ 'bg-[#f5fccd] active': $route.meta.child === `${item.keys}` }"
      >
        <SvgIcon type="mdi" :path="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </div>
  <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"></div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { AdminMenu } from "../../menu/AdminMenu";
import { UseSaidebar } from "../../../hooks/UseSaidebar";
import { DirectorMenu } from "../../../components/menu/DirectorMenu";
import { computed } from "vue";
const isOpen = UseSaidebar();

let role = localStorage.getItem("role");
const menu = computed(() => {
  if (role == "admin") {
    return AdminMenu;
  } else if (role == "director") {
    return DirectorMenu;
  }
});
</script>

<style scoped>
.router-link-active {
  background: #984f00;
}
.router-link-active span {
  color: white;
}
</style>
