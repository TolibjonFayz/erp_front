<template>
  <nav
    class="py-[17px] px-10 bg-global1 border-l-2 border=[#fff] flex items-center justify-between sticky w-full top-0 right-0"
  >
    <!-- search -->
    <div class="relative">
      <button class="p-[10px] bg-red lg:hidden" @click="isOpen = true">
        <svg-icon type="mdi" :path="mdiMenuClose"></svg-icon>
      </button>
      <input
        type="text"
        class="text-[13px] w-[400px] rounded-[20px] h-[40px] outline-none bg-white py-3 px-[15px]"
        placeholder="Qidirish"
      />
      <SearchVue class="absolute top-[-2px] right-5 translate-y-1/2" />
    </div>
    <!-- account -->
    <div class="flex items-center cursor-pointer relative account">
      <!-- content -->
      <div
        class="w-[35px] h-[35px] rounded-full flex items-center justify-center"
      >
        <UserVue />
      </div>
      <p class="text-white text-xs ml-[10px] mr-[26px]">Admin</p>
      <DownIcon />
      <!-- sub_menu -->
      <div
        class="absolute right-0 w-[160px] bg-white shadow-lg rounded-lg overflow-hidden duration-200 sub_menu"
      >
        <div
          class="py-3 px-4 hover:bg-[#12486B] hover:text-white text-[#12486B] duration-200"
        >
          Profile
        </div>
        <div
          class="py-3 px-4 hover:bg-[#12486B] hover:text-white text-[#12486B] duration-200"
        >
          Settings
        </div>
        <div
          class="py-3 px-4 hover:bg-[#12486B] hover:text-white text-[#12486B] duration-200"
        >
          Exit
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UseSaidebar } from "../../../hooks/UseSaidebar";
import SearchVue from "../../icons/Search.vue";
import UserVue from "../../icons/User.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenuClose } from "@mdi/js";

const isOpen = UseSaidebar();
</script>
<style lang="scss" scoped>
.sub_menu {
  opacity: 0;
  visibility: hidden;
  top: 50px;
}
.account:hover .sub_menu {
  opacity: 1;
  visibility: visible;
  top: 36px;
}
</style>
