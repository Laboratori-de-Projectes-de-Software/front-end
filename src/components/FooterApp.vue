<script setup lang="ts">
import { ref } from 'vue'
const darkMode = ref(document.documentElement.classList.contains('dark'))
const props = defineProps<{ hideDarkLight?: boolean }>()

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  darkMode.value = !darkMode.value
}
</script>

<template>
  <footer class="mt-auto flex w-full items-end justify-between px-4 pb-4">
    <button
      v-if="!props.hideDarkLight"
      class="flex h-9 w-9 cursor-pointer items-center justify-center"
      @click="toggleDarkMode()"
    >
      <img class="hidden dark:block" src="@/assets/svg/lightIcon.svg" alt="Modo claro" />
      <img class="dark:hidden" src="@/assets/svg/darkIcon.svg" alt="Modo oscuro" />
    </button>
    <slot></slot>
  </footer>
</template>
