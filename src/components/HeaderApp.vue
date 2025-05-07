<script setup lang="ts">
import MenuIcon from '@/assets/svg/menuIcon.vue'
import { useRoute } from 'vue-router'
import ProfileDropDown from './ProfileDropDown.vue'

const props = defineProps<{ isHeading1: boolean; title?: string }>()
const route = useRoute()

const isChatPage = route.path === '/chat'
</script>

<template>
  <header class="flex w-full flex-row items-center justify-between px-3 py-4 sm:px-8 md:px-10">
    <div class="flex flex-row gap-2 md:gap-8">
      <slot></slot>
      <h1 v-if="props.isHeading1" class="text-xl font-semibold md:text-3xl">{{ props.title }}</h1>
      <h2 v-else class="text-2xl font-semibold">{{ props.title }}</h2>
    </div>
    <nav class="flex flex-row items-center gap-4" :class="isChatPage ? 'lg:gap-11' : 'sm:gap-11'">
      <div class="hidden flex-row items-center gap-3" :class="isChatPage ? 'lg:flex' : 'sm:flex'">
        <!-- Muestra de botones dinámicos según actual página-->
        <RouterLink
          to="/"
          v-if="route.path != '/'"
          class="overflow-hidden rounded-full bg-[#d3d3d3] px-5 py-3 leading-none font-semibold dark:bg-[#525252]"
        >
          Mis Ligas
        </RouterLink>
        <RouterLink
          to="/myBots"
          v-if="route.path != '/myBots'"
          class="overflow-hidden rounded-full bg-[#d3d3d3] px-5 py-3 leading-none font-semibold dark:bg-[#525252]"
        >
          Mis Bots
        </RouterLink>
      </div>
      <div class="w-10 overflow-hidden rounded-full object-contain md:w-[54px]">
        <ProfileDropDown />
      </div>
      <button class="block w-8" :class="isChatPage ? 'lg:hidden' : 'sm:hidden'">
        <MenuIcon classList="stroke-black dark:stroke-white" />
      </button>
    </nav>
  </header>
</template>
