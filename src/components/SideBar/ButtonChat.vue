<script setup lang="ts">
const props = defineProps<{ classList?: string }>()
</script>

<template>
  <button
    class="max-w-full overflow-hidden rounded-2xl px-3 py-1 text-lg overflow-ellipsis whitespace-nowrap transition-[background-color] delay-75 ease-in-out hover:bg-[#dcdcdc] dark:hover:bg-[#4a4a4a]"
    :class="props.classList"
  >
    <slot></slot>
  </button>
</template>
