<script setup lang="ts">
import DrawIcon from '@/assets/svg/clasificacion/DrawIcon.vue'
import WinIcon from '@/assets/svg/clasificacion/WinIcon.vue'
import FooterApp from '@/components/FooterApp.vue'
import HeaderApp from '@/components/HeaderApp.vue'
import router from '@/router'
import type { Participation, Match, League, Bot } from '@/types'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const leagueId = Number(route.params.leagueId)
const token = localStorage.getItem('token')
const userId = parseInt(localStorage.getItem('userId') || '0')

const league = ref<League | null>(null)
const matches = ref<Match[]>([])
const leaderboard = ref<Participation[]>([])
const misBots = ref<string[]>([])

async function loadLeague() {
  const response = await fetch(`http://localhost:8080/api/v0/league/${leagueId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    alert('Error al cargar la liga. Por favor, inténtalo de nuevo.')
  } else {
    league.value = await response.json()
    if (league.value && league.value.state !== 'PENDIENTE') {
      await loadMatches()
    }
    loadLeaderboard()
  }
}

const loadMatches = async () => {
  const response = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/match`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    alert('Error al cargar los partidos. Por favor, inténtalo de nuevo.')
  } else {
    const data = await response.json()
    matches.value = data
  }
}

// Función para obtener la clasificación completa de una liga en base a su ID
async function loadLeaderboard() {
  const response = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/leaderboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    alert('Error al cargar la clasificación. Por favor, inténtalo de nuevo.')
  } else {
    leaderboard.value = await response.json()
    console.log('Clasificación:', leaderboard)
  }
}

onMounted(() => {
  loadLeague()
  loadMyBots()
})

async function startLeague() {
  if (!league.value) return

  const response = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    alert('Error al iniciar la liga. Por favor, inténtalo de nuevo.')
  } else {
    alert('¡Liga iniciada correctamente!')
    loadLeague()
  }
}

const loadMyBots = async () => {
  const response = await fetch(
    `http://localhost:8080/api/v0/bot?owner=${localStorage.getItem('userId')}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    alert('Error al cargar los bots. Por favor, inténtalo de nuevo.')
  } else {
    const data = await response.json()
    misBots.value = data.map((bot: Bot) => bot.botId)
  }
}

const jornadas = matches.value.reduce(
  (acc, combate) => {
    const round = combate.roundNumber
    if (!acc[round]) {
      acc[round] = []
    }
    acc[round].push(combate)
    return acc
  },
  {} as Record<number, Match[]>
)

const esMiBot = (nombreEquipo: string) => {
  return misBots.value.includes(nombreEquipo)
}

// TODO: Verificar si vamos a hacer por jornadas
// const jornadaNum = ref(1)
// const jornadaMax = 12

// const incrementJornada = () => {
//   if (jornadaNum.value < jornadaMax) {
//     jornadaNum.value++
//   }
// }

// const decrementJornada = () => {
//   if (jornadaNum.value > 1) {
//     jornadaNum.value--
//   }
// }

const titleHeader = '¡Hola, ' + localStorage.getItem('user') + '!'
</script>

<template>
  <HeaderApp :title="titleHeader" :is-heading1="false" />
  <main
    class="mb-15 flex w-full flex-col items-center justify-center gap-5 px-4 sm:px-10 lg:w-[960px]"
  >
    <!-- Contenedor pequeño que incluye solo el header -->
    <header class="m-3 flex w-full flex-col gap-3">
      <div class="flex flex-row justify-between">
        <h1 class="text-left text-4xl font-bold">{{ league?.name }}</h1>

        <!-- Mostrar botones solo si el user es el owner -->
        <div class="flex flex-row gap-4 text-xl font-bold" v-if="userId === league?.user">
          <!-- Mostrar botón solo si la liga está PENDIENTE -->
          <button
            v-if="league?.state === 'PENDIENTE'"
            class="cursor-pointer rounded-3xl bg-[#06f] px-4.5 py-3 text-white"
            @click="startLeague"
          >
            Empezar Liga
          </button>

          <!-- Redirigir a configuración (puedes cambiar la ruta) -->
          <button class="cursor-pointer rounded-3xl bg-[#06f] px-4.5 py-3 text-white">
            Configuración
          </button>
        </div>
      </div>

      <div class="mt-0 h-0 w-full dark:border dark:border-[#525252]"></div>
    </header>

    <div v-if="league?.state !== 'PENDIENTE'" class="flex w-full flex-col gap-5">
      <div class="w-full bg-[#BBBBBB] p-4 dark:bg-[#525252]">
        <div class="flex items-center justify-center">
          <!--
          <button @click="decrementJornada">
            <img
              src="@/assets/svg/izquierdaicon.svg"
              alt="Izquierda"
              class="mr-3 h-6 w-6 dark:brightness-0 dark:invert dark:filter"
            />
          </button>
          <img
            src="@/assets/svg/calendaricon.svg"
            alt="calendar"
            class="mr-2 w-7 dark:brightness-0 dark:invert dark:filter"
          />
          <div class="font-bold sm:text-xl">JORNADA {{ jornadaNum }}</div>
          <button @click="incrementJornada">
            <img
              src="@/assets/svg/derechaicon.svg"
              alt="Derecha"
              class="ml-2 h-6 w-6 dark:brightness-0 dark:invert dark:filter"
            />
          </button>
          -->
          <div class="font-bold sm:text-xl">ENCUENTROS</div>
        </div>
      </div>

      <!-- Container de los encuentros -->
      <div class="-mt-5 w-full bg-[#DDDDDD] p-4 dark:bg-[#2D2D2D]">
        <table class="w-full">
          <tbody>
            <!-- Itera sobre todas las jornadas -->
            <!-- elminar siguiente linea para poner encuentros por jornada
                  y no todos los encuentros a la vez    -->
            <template v-for="[numJornada, jornada] of Object.entries(jornadas)" :key="numJornada">
              <!-- Itera sobre los encuentros de la jornada -->
              <!-- TODO: Cambiar el 1 del router push a un matchId-->
              <tr
                v-for="(encuentro, index) in jornada"
                class="flex h-12 w-full cursor-pointer items-center justify-center gap-8"
                :key="Number(numJornada) * 100 + index"
                @click="router.push('/match/1')"
              >
                <!-- Equipo 1 -->
                <td class="mr-10 flex w-75 justify-end gap-2.5 sm:text-xl">
                  <WinIcon
                    v-if="encuentro.result === 1 && encuentro.state === 'FINALIZADO'"
                    classList="h-[27px] w-[27px]"
                  />
                  <div class="text-center">{{ encuentro.fighters[0] }}</div>
                </td>
                <!-- Icono del ganador -->
                <td>
                  <DrawIcon
                    v-if="encuentro.result === 2 && encuentro.state === 'FINALIZADO'"
                    classList="h-5 w-5 sm:h-10 sm:w-21"
                  />
                  <div
                    v-else-if="encuentro.state === 'EN_CURSO'"
                    class="flex w-21 justify-center rounded-lg bg-red-500 px-2 py-1 text-sm font-bold"
                  >
                    EN VIVO
                  </div>
                  <div
                    class="flex h-5 w-5 items-center justify-center text-xl sm:h-10 sm:w-21"
                    v-else
                  >
                    vs
                  </div>
                </td>
                <!-- Equipo 2 -->
                <td class="ml-10 flex w-75 justify-start gap-2.5 sm:text-xl">
                  <div>{{ encuentro.fighters[1] }}</div>
                  <WinIcon
                    v-if="encuentro.result === 3 && encuentro.state === 'FINALIZADO'"
                    classList="h-5 w-5 sm:h-10 sm:w-10"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Contenedor para la clasificación -->
    <div class="flex w-full flex-col gap-5">
      <!-- Header de la clasificación -->
      <header class="m-3 flex w-full flex-col gap-3">
        <div class="flex flex-row items-center justify-between">
          <h1 class="text-left text-2xl font-bold text-[#9B9B9B] dark:text-[#FFFFFF]">
            Clasificación
          </h1>
        </div>
        <div class="mt-0 h-0 w-40 border border-[#9B9B9B] dark:border-[#FFFFFF]"></div>
      </header>

      <!-- Cuadro de clasificación -->
      <div class="mx-auto rounded-lg bg-[#DDDDDD] p-2 dark:bg-[#2D2D2D]">
        <table class="w-full">
          <!-- Encabezados -->
          <thead class="sticky top-0 bg-[#DDDDDD] dark:bg-[#2D2D2D]">
            <tr class="gap-8 sm:text-2xl">
              <th class="w-16 px-1 py-2 font-bold sm:px-3 md:px-6">Pos</th>
              <th class="w-72 p-2 text-left font-bold">Nombre</th>
              <th class="w-8 px-1 py-2 font-bold sm:px-3 md:px-6">PJ</th>
              <th class="w-8 px-1 py-2 font-bold sm:px-3 md:px-6">G</th>
              <th class="w-8 px-1 py-2 font-bold sm:px-3 md:px-6">E</th>
              <th class="w-8 px-1 py-2 font-bold sm:px-3 md:px-6">P</th>
              <th class="w-16 px-1 py-2 font-bold sm:px-3 md:px-6">Ptos</th>
            </tr>
          </thead>

          <!-- Cuerpo de la tabla -->
          <tbody>
            <tr v-for="(equipo, index) in leaderboard" :key="index" class="border-t sm:text-xl">
              <td
                :class="[
                  'w-16 px-1 text-center sm:px-3 md:px-6',
                  esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '',
                ]"
              >
                {{ equipo.position + 1 }}
              </td>
              <td :class="['w-72 p-2', esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '']">
                <!--<img :src="equipo.imagen" alt=" " class="h-6 w-6 lg:h-8 lg:w-8" />-->
                {{ equipo.botName }}
              </td>
              <td
                :class="[
                  'w-8 px-1 py-2 text-center sm:px-3 md:px-6',
                  esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '',
                ]"
              >
                {{ equipo.nwins + equipo.ndraws + equipo.nlosses }}
              </td>
              <td
                :class="[
                  'w-8 px-1 py-2 text-center sm:px-3 md:px-6',
                  esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '',
                ]"
              >
                {{ equipo.nwins }}
              </td>
              <td
                :class="[
                  'w-8 px-1 py-2 text-center sm:px-3 md:px-6',
                  esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '',
                ]"
              >
                {{ equipo.ndraws }}
              </td>
              <td
                :class="[
                  'w-8 px-1 py-2 text-center sm:px-3 md:px-6',
                  esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '',
                ]"
              >
                {{ equipo.nlosses }}
              </td>
              <td
                :class="[
                  'w-8 px-1 py-2 text-center sm:px-3 md:px-6',
                  esMiBot(equipo.botName) ? 'font-bold text-[#FADA5E]' : '',
                ]"
              >
                {{ equipo.points }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
  <FooterApp />
</template>
