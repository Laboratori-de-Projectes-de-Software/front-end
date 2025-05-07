<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { League } from '@/types'

const emit = defineEmits<{
  (e: 'closeJoinLeagueModal'): void
}>()

// Estado para almacenar la liga seleccionada
const ligaSeleccionada = ref<League | null>(null)
const ligas = ref<League[]>([])

const props = defineProps<{
  selectedBotId: number | null
}>()

// Función para registrar el bot en la liga seleccionada
async function registerBotToSelectedLeague() {
  // Si no hay liga seleccionada o no hay bot seleccionado, no hacemos nada
  if (!ligaSeleccionada.value || !props.selectedBotId) return

  // Se hace una llamada a la API para registrar el bot en la liga seleccionada
  const response = await fetch(
    `http://localhost:8080/api/v0/league/${ligaSeleccionada.value.id}/bot`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify([props.selectedBotId]),
    }
  )

  if (!response.ok) {
    // Manejo de errores según el código de estado
    alert('Error al inscribir el bot en la liga')
  }

  emit('closeJoinLeagueModal')
}

const loadLeagues = async () => {
  const response = await fetch('http://localhost:8080/api/v0/league', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    alert('Error al cargar las ligas')
  } else {
    // Si la respuesta es correcta, se parsea a JSON y se asigna a la variable leagues
    const leagues: League[] = await response.json()
    ligas.value = leagues
  }
}

onMounted(() => {
  // Se carga la lista de ligas al montar el componente
  loadLeagues()
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center backdrop-blur-[3px]">
    <div class="w-[570px] rounded-xl bg-[#1D1D1D] p-6 text-center text-white">
      <h2 class="mb-2 text-center text-2xl font-bold">Seleccionar Liga</h2>
      <div class="mx-0 mt-0 mb-4 h-[1px] w-full bg-[#FFFFFF]"></div>

      <!-- Lista de ligas -->
      <ul class="mx-auto rounded-lg bg-[#DDDDDD] p-2 dark:bg-[#353535]">
        <li
          v-for="liga in ligas"
          :key="liga.id"
          :class="[
            'flex cursor-pointer items-center rounded-md p-2',
            ligaSeleccionada?.id === liga.id
              ? 'border-2 border-blue-500'
              : 'border border-transparent',
          ]"
          @click="ligaSeleccionada = liga"
        >
          <div class="flex w-full items-center">
            <img
              :src="liga.imageUrl"
              alt="Liga"
              class="mr-2 h-16 w-16 rounded-md bg-white object-contain p-2"
            />
            <span class="text-lg font-semibold text-black dark:text-white">{{ liga.name }}</span>
          </div>
        </li>
      </ul>

      <!-- Botón Apuntarse -->
      <button
        class="mt-2 rounded-md bg-[#06f] px-4 py-2 font-semibold text-white"
        @click="registerBotToSelectedLeague"
      >
        Apuntarse
      </button>
    </div>
  </div>
</template>
