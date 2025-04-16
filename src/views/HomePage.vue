<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AddIcon from '@/assets/svg/AddIcon.vue'
import ButtonLeague from '@/components/ButtonLeague.vue'
import FooterApp from '@/components/FooterApp.vue'
import HeaderApp from '@/components/HeaderApp.vue'
import type { League } from '@/types'

const welcomeMessage = '¡Hola, ' + localStorage.getItem('user') + '!'
const token = localStorage.getItem('token')

const ligasPendientes = ref<League[]>([])
const ligasEnJuego = ref<League[]>([])
const ligasFinalizadas = ref<League[]>([])

async function loadLeagues() {
  const response = await fetch(`http://localhost:8080/api/v0/league`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    handleErrorResponse(response.status)
  } else {
    const data: League[] = await response.json()
    console.log('Ligas:', data)
    ligasPendientes.value = data.filter((l) => l.state === 'PENDIENTE')
    ligasEnJuego.value = data.filter((l) => l.state === 'EN_CURSO')
    ligasFinalizadas.value = data.filter((l) => l.state === 'FINALIZADO')
  }
}

function handleErrorResponse(status: number) {
  if (status === 401) alert('No autorizado')
  else alert('Error al obtener las ligas')
}

onMounted(() => {
  loadLeagues()
})
</script>

<template>
  <HeaderApp :title="welcomeMessage" :isHeading1="false" />

  <main
    class="xs:px-8 mb-10 flex w-full flex-col items-center justify-center px-3 sm:max-w-[860px] md:px-10 lg:w-[860px]"
  >
    <header class="m-3 flex w-full flex-col gap-2">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-4xl font-bold">Mis Ligas</h1>
        <button
          class="flex flex-row items-center gap-2 rounded-full bg-[#06f] px-3 py-2 text-white"
        >
          Ordenar
          <img src="@/assets/svg/orderIcon.svg" alt="" class="w-7" />
        </button>
      </div>

      <div class="h-0 w-full border"></div>
    </header>

    <section class="mb-6 flex w-full flex-col items-center gap-4 font-semibold">
      <div v-if="ligasPendientes.length == 0" class="mt-8 text-2xl">
        No se ha creado ninguna liga aún
      </div>
      <div v-else class="flex w-full flex-col gap-1 text-[#9b9b9b]">
        <h2 class="text-xl">Pendientes</h2>
        <div class="h-0 w-[120px] border"></div>
      </div>

      <ul class="flex flex-wrap justify-center gap-x-8 gap-y-5">
        <!-- TODO: (ABB-145) Cambiar cuando LeagueResponse devuelva leagueId
        <li v-for="liga in ligasPendientes" :key="liga.leagueId" class="w-fit"> -->
        <li v-for="liga in ligasPendientes" :key="liga.id" class="w-fit">
          <ButtonLeague :liga="liga" />
        </li>
      </ul>

      <RouterLink
        to="/createLeague"
        class="xs:w-fit xs:gap-4 xs:text-md flex w-38.5 flex-row items-center gap-2 rounded-2xl border-2 border-dashed bg-[#d3d3d3] px-5 py-3 text-sm sm:px-10 sm:py-6 sm:text-xl dark:bg-[#3b3b3b]"
      >
        <AddIcon classList="h-6 w-6 sm:h-8 sm:w-8 fill-black dark:fill-white" />
        Añadir Liga
      </RouterLink>
    </section>
    <section
      v-if="ligasEnJuego.length > 0"
      class="mb-6 flex w-full flex-col items-center gap-4 font-semibold"
    >
      <div class="flex w-full flex-col gap-1 text-[#9b9b9b]">
        <h2 class="text-xl">En vivo</h2>
        <div class="h-0 w-[120px] border"></div>
      </div>

      <ul class="flex flex-wrap justify-center gap-x-8 gap-y-5">
        <!-- TODO: (ABB-145) Cambiar cuando LeagueResponse devuelva leagueId
        <li v-for="liga in ligasEnJuego" :key="liga.leagueId" class="w-fit"> -->
        <li v-for="liga in ligasEnJuego" :key="liga.id" class="w-fit">
          <ButtonLeague :liga="liga" />
        </li>
      </ul>
    </section>
    <section
      v-if="ligasFinalizadas.length > 0"
      class="flex w-full flex-col items-center gap-4 font-semibold"
    >
      <div class="flex w-full flex-col gap-1 text-[#9b9b9b]">
        <h2 class="text-xl">Finalizadas</h2>
        <div class="h-0 w-[120px] border"></div>
      </div>

      <ul class="flex flex-wrap justify-center gap-8">
        <!-- TODO: (ABB-145) Cambiar cuando LeagueResponse devuelva leagueId
        <li v-for="liga in ligasFinalizadas" :key="liga.leagueId" class="w-fit"> -->
        <li v-for="liga in ligasFinalizadas" :key="liga.id" class="w-fit">
          <ButtonLeague :liga="liga" />
        </li>
      </ul>
    </section>
  </main>
  <FooterApp />
</template>
