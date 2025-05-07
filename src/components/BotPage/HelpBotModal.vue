<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'closeModal'): void
}>()
const closeModal = () => {
  emit('closeModal')
}
</script>

<template>
  <!-- Modal de ayuda -->
  <div class="fixed inset-0 flex items-center justify-center backdrop-blur-[3px]">
    <div class="w-[300px] scale-100 rounded-xl bg-[#525252] p-6 text-center text-white">
      <h2 class="mb-4 text-xl font-bold">Ayuda</h2>
      <ul class="mb-4 list-inside text-left">
        <li><strong>PJ</strong>: Partidas jugadas</li>
        <li><strong>G</strong>: Ganadas (3 puntos)</li>
        <li><strong>E</strong>: Empatadas (1 punto)</li>
        <li><strong>P</strong>: Perdidas (0 puntos)</li>
      </ul>
      <button
        class="mt-2 cursor-pointer rounded-md bg-[#06f] px-4 py-2 font-semibold text-white"
        @click="closeModal"
      >
        Volver
      </button>
    </div>
  </div>
</template>
