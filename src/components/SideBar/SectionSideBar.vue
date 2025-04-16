<script setup lang="ts">
import ButtonChat from './ButtonChat.vue'
import type { Match } from '@/types'

const props = defineProps<{ title: string; matches?: Match[]; classListButtonChat?: string }>()
</script>

<template>
  <section class="flex flex-col items-start gap-2">
    <div>
      <h4 class="text-[#9b9b9b] dark:text-[#a8a8a8]">{{ props.title }}</h4>
      <div class="border-b border-[#9b9b9b]"></div>
    </div>
    <ButtonChat
      v-for="match in props.matches"
      :key="match.id"
      :classList="props.classListButtonChat"
    >
      {{ match.fighters[0] }} vs {{ match.fighters[1] }}
    </ButtonChat>
  </section>
</template>
