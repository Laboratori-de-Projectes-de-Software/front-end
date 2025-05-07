<script setup lang="ts">
const props = defineProps<{ classList?: string }>()
</script>

<template>
  <svg :class="props.classList" class="stroke-black dark:stroke-white" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 4H8a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4ZM12 5.33v21.34"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
