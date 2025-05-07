<template>
  <div>
    <!-- Botonera Modo Clasificación / Resumen -->
    <div class="flex justify-center mt-4 mb-6">
      <div class="flex rounded-full bg-[#3A3A3A] p-1">
        <button
          :class="{
            'bg-white text-black': selectedMode === 'clasificacion',
            'text-white': selectedMode !== 'clasificacion'
          }"
          class="rounded-full px-4 py-1 font-bold text-[16px] transition-colors"
          @click="setMode('clasificacion')"
        >
          Modo Clasificación
        </button>
        <button
          :class="{
            'bg-white text-black': selectedMode === 'resumen',
            'text-white': selectedMode !== 'resumen'
          }"
          class="rounded-full px-4 py-1 text-[16px] font-bold transition-colors"
          @click="setMode('resumen')"
        >
          Modo Resumen
        </button>
      </div>
    </div>

    <!-- Contenido dinámico según el modo seleccionado -->
    <div v-if="selectedMode === 'clasificacion'">
      <!-- Aquí va tu contenido de Clasificación (el actual que tienes implementado) -->
      <slot name="clasificacion"></slot>
    </div>

    <div v-else>
      <!-- Aquí va el contenido del Resumen -->
      <slot name="resumen"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedMode = ref('clasificacion')

function setMode(mode: string) {
  selectedMode.value = mode
}
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>

