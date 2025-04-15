<script setup lang="ts">
import type { League } from '@/types'
import { computed } from 'vue'
const props = defineProps<{ liga: League }>()
const liga = props.liga

const imageClass = computed(() => {
  const img = new Image()
  img.src = props.liga.urlImagen
  return img.width > img.height ? 'w-full' : 'h-full'
})
</script>

<template>
  <RouterLink to="/myLeague">
    <div
      class="xs:w-48 xs:h-28 flex h-[90px] w-38.5 items-center justify-center rounded-t-xl border-t-2 border-r-2 border-l-2 border-[#d3d3d3] bg-white px-[40px] py-[12px] sm:h-[145px] sm:w-[250px]"
    >
      <!-- TODO: Cambiar cuando se siga el Contrato de LeagueResponse (ABB-142)
    <img :src="liga.urlImagen" :alt="liga.name" :class="imageClass" class="object-contain" /> -->
      <img :src="liga.urlImagen" :alt="liga.nombre" :class="imageClass" class="object-contain" />
    </div>
    <h3
      class="flex w-full justify-center rounded-b-xl bg-[#d3d3d3] px-2 py-3 text-sm font-semibold sm:text-xl dark:bg-[#525252]"
    >
      <!-- TODO: Cambiar cuando se siga el Contrato de LeagueResponse (ABB-142)
    {{ liga.name }} -->
      {{ liga.nombre }}
    </h3>
  </RouterLink>
</template>
