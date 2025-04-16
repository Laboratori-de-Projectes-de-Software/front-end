<script setup lang="ts">
import HeaderApp from '@/components/HeaderApp.vue'
import FooterApp from '@/components/FooterApp.vue'
import BotoneraModo from '@/components/BotoneraModo.vue'
import JoinLeagueModal from '@/components/BotPage/JoinLeagueModal.vue'
import { ref } from 'vue'
import type { Bot, BotLeagueSummary } from '@/types'
import { useRouter } from 'vue-router'
import HelpBotModal from '@/components/BotPage/HelpBotModal.vue'
import ResumeSection from '@/components/BotPage/ResumeSection.vue'
import ClasificationBotSection from '@/components/BotPage/ClasificationBotSection.vue'

// Para el cambio de página
const router = useRouter()

// Estado para mostrar/ocultar la ventana de elegir liga
const visibleJoinLeagueModal = ref(false)
// Estado para mostrar/ocultar la ventana de ayuda
const showHelpModal = ref(false)

// Estado para el bot seleccionado
const selectedBotId = ref<number | null>(null)

console.log(showHelpModal.value)

// TODO: Descomentar una vez tengamos conexión exitosa con la API
// // Variables para almacenar los datos de los bots:
// const botSummaries = ref<Bot[]>([])
// const botsDetails = ref<Bot[]>([])
// // Para almacenar la información de clasificación en liga de cada bot
// const botLeagueSummaries = ref<BotLeagueSummary[]>([])

// // Identificador del usuario (esto vendría del LocalStorage al hacer el login):
//const userId = localStorage.getItem('userId')

// // Para asegurar que los datos se cargan al iniciar el componente
// onMounted(() => {
//   loadBotsData()
// })

// // Función principal para cargar los datos de los bots de un usuario
// async function loadBotsData() {
//   // Se obtiene la lista de bots:
//   await loadBotSummaries()

//   // A continuación, se obtiene el resumen de clasificación de cada bot
//   await loadClasificationSection()

//   // A continuación, se obtienen los detalles de cada bot
//   await loadBotDetails()
// }

// // Función para obtener el listado de bots del usuario
// async function loadBotSummaries() {
//   // Se hace una llamada a la API para obtener el listado de bots del usuario
//   const response = await fetch(`http://localhost:8080/api/v0/bot?owner=${userId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   })

//   if (!response.ok) {
//     // Manejo de errores según el código de estado
//     handleErrorResponse(response.status)
//   } else {
//     // Si la respuesta es correcta, se parsea a JSON y se asigna a la variable botSummaries
//     const data: Bot[] = await response.json()
//     botSummaries.value = data
//   }
// }

// // Función para cargar el resumen de liga de cada bot
// async function loadClasificationSection() {
//   try {
//     // Se cargan todas las ligas:
//     const allLeagues = await loadAllLeagues()

//     const leagueInProcess = allLeagues?.filter((league) => league.state === 'EN_CURSO')

//     // Se obtiene la lista de bots que están en ligas. El key sera el id del bot, y el value el id de la liga
//     const botLeagueMap = new Map<number, number>()

//     // Se recorre cada bot en la lista
//     for (const bot of botSummaries.value) {
//       // Busca una liga en la que el bot esté inscrito y que esté en curso
//       const league = leagueInProcess?.find((league) => league.bots.some((b) => b === bot.botId))

//       if (league) {
//         // Si el bot está en una liga, se añade al mapa
//         botLeagueMap.set(bot.botId, league.id)
//       }
//     }
//     if (botLeagueMap.size !== 0) {
//       // Se recorre el mapa de bots y ligas
//       for (const [botId, leagueId] of botLeagueMap.entries()) {
//         const response = await fetch(
//           `http://localhost:8080/api/v0/league/${leagueId}/leaderboard`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         )
//         if (!response.ok) {
//           alert(
//             'Error al cargar la clasificación de la liga del bot. Por favor, intenta de nuevo más tarde.'
//           )
//         } else {
//           // Si la respuesta es correcta, se parsea a JSON y se asigna a la variable leaderboard
//           const leaderboard: Participation[] = await response.json()

//           // Se filtra la clasificación para obtener solo las posiciones superior, actual e inferior del bot
//           const filteredLeaderboard = extractPositions(leaderboard, botId)

//           // Se crea un objeto de resumen de liga para el bot
//           const leagueSummary: BotLeagueSummary = {
//             botId,
//             leagueId,
//             classification: filteredLeaderboard,
//           }

//           // Se añade el resumen de liga al array de resúmenes
//           botLeagueSummaries.value.push(leagueSummary)
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error al cargar los datos de ligas y clasificaciones:', error)
//     alert(
//       'Error al cargar los datos de ligas y clasificaciones. Por favor, intenta de nuevo más tarde.'
//     )
//   }
// }

// // Función para obtener el detalle de cada bot de la lista
// async function loadBotDetails() {
//   // Se recorre cada bot de la lista
//   for (const botsummary of botSummaries.value) {
//     // Se hace una llamada a la API para obtener el detalle de cada bot
//     const response = await fetch(`http://localhost:8080/api/v0/bot/${botsummary.botId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })

//     if (!response.ok) {
//       // Manejo de errores según el código de estado
//       handleErrorResponse(response.status)
//     } else {
//       // Si la respuesta es correcta, se parsea a JSON y se asigna a la variable botDetails
//       const data: Bot = await response.json()
//       botsDetails.value.push(data)
//     }
//   }
// }

// // Función para cargar todas las ligas
// async function loadAllLeagues() {
//   // Se hace una llamada a la API para obtener el listado de todas las ligas
//   const response = await fetch(`http://localhost:8080/api/v0/league`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   })

//   if (!response.ok) {
//     // Manejo de errores según el código de estado
//     handleErrorResponse(response.status)
//   } else {
//     // Si la respuesta es correcta, se parsea a JSON y se asigna a la variable leagues
//     const leagues: League[] = await response.json()
//     return leagues
//   }
// }

// // Función para extraer las posiciones superior, actual e inferior del bot en la clasificación
// function extractPositions(leaderboard: Participation[], botId: number) {
//   // Buscamos el índice del bot en la clasificación:
//   const index = leaderboard.findIndex((entry) => entry.botId === botId)

//   // Si no se encuentra el bot en la clasificación (aunque nunca debería pasar):
//   if (index === -1) {
//     return []
//   }

//   // Definimos el rango: buscamos desde index - 1 a index + 1.
//   const start = Math.max(index - 1, 0)
//   const end = Math.min(index + 1, leaderboard.length - 1)

//   // Devolvemos la clasificación filtrada para mostrar solo las posiciones que nos interesan:
//   return leaderboard.filter((_, i) => i >= start && i <= end)
// }

function goToCreateBots() {
  // Ajusta la ruta '/createBots' a la que hayas definido en tu router.
  router.push('/createBot')
}

// function handleErrorResponse(status: number) {
//   const errorMessages: Record<number, { title: string; text: string }> = {
//     401: { title: 'Error', text: 'No autorizado' },
//     404: { title: 'Error', text: 'Listado de bots no encontrado' },
//     408: { title: 'Error', text: 'Tiempo de espera agotado' },
//     500: { title: 'Error', text: 'Error interno del servidor. Contacta con el soporte' },
//   }

//   const error = errorMessages[status] || {
//     title: 'Error',
//     text: 'Error desconocido. Por favor, intenta de nuevo más tarde.',
//   }
//   showErrorAlert(error.title, error.text)
// }

// function showErrorAlert(title: string, text: string) {
//   Swal.fire({
//     icon: 'error',
//     title,
//     text,
//     customClass: {
//       confirmButton:
//         'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium',
//     },
//     buttonsStyling: false,
//   })
// }

// Función para apuntar un bot a una liga
async function showJoinLeagueModal(botId: number) {
  visibleJoinLeagueModal.value = true
  selectedBotId.value = botId
}

// // Funciones para abrir y cerrar el menú de edición
function openEditMenu() {
  // Se copia el bot seleccionado para editarlo
  //selectedBot.value = { ...bot }
}
// function closeEditMenu() {
//   //selectedBot.value = null
// }

//TODO: Quitar una vez tengamos conexión exitosa con la API
// Variables para almacenar los datos de los bots:
const botSummaries = ref<Bot[]>([
  {
    botId: 1,
    name: 'Bot 1',
    description: 'Amabilidad',
  },
  {
    botId: 2,
    name: 'Bot 2',
    description: 'Egoismo',
  },
  {
    botId: 3,
    name: 'Bot 3',
    description: 'Empatía',
  },
])
const botsDetails = ref<Bot[]>([
  {
    botId: 1,
    name: 'Bot 1',
    description: 'Amabilidad',
    urlImage: 'https://example.com/bot1.png',
    nWins: 10,
    nLosses: 5,
    nDraws: 2,
  },
  {
    botId: 2,
    name: 'Bot 2',
    description: 'Egoismo',
    urlImage: 'https://example.com/bot2.png',
    nWins: 8,
    nLosses: 7,
    nDraws: 2,
  },
  {
    botId: 3,
    name: 'Bot 3',
    description: 'Empatía',
    urlImage: 'https://example.com/bot3.png',
    nWins: 12,
    nLosses: 3,
    nDraws: 1,
  },
])
// Para almacenar la información de clasificación en liga de cada bot
const botLeagueSummaries = ref<BotLeagueSummary[]>([
  {
    botId: 1,
    leagueId: 1,
    classification: [
      { botId: 1, botName: 'Bot 1', points: 30, position: 0, nwins: 10, ndraws: 0, nlosses: 0 },
      { botId: 2, botName: 'Bot 2', points: 25, position: 1, nwins: 8, ndraws: 1, nlosses: 1 },
      { botId: 3, botName: 'Bot 3', points: 20, position: 2, nwins: 6, ndraws: 2, nlosses: 2 },
    ],
  },
  {
    botId: 2,
    leagueId: 1,
    classification: [
      { botId: 1, botName: 'Bot 1', points: 30, position: 0, nwins: 10, ndraws: 0, nlosses: 0 },
      { botId: 2, botName: 'Bot 2', points: 25, position: 1, nwins: 8, ndraws: 1, nlosses: 1 },
      { botId: 3, botName: 'Bot 3', points: 20, position: 2, nwins: 6, ndraws: 2, nlosses: 2 },
    ],
  },
])
</script>

<template>
  <HeaderApp title="Mis Bots" :is-heading1="true" />
  <main
    class="xs:px-8 mb-10 flex w-full flex-col items-center justify-center gap-5 px-3 sm:max-w-[860px] md:px-10 lg:w-[860px]"
  >
    <div
      class="mb-4 flex w-full max-w-full flex-col items-center gap-12 rounded-2xl bg-[#2a2a2a] px-3 py-5 sm:px-8 md:px-16"
    >
      <!-- Botón Crear Bot -->
      <div class="mt-4 -mb-8 flex w-full justify-center">
        <button
          class="flex items-center gap-x-2 rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white"
          @click="goToCreateBots"
        >
          <img src="@/assets/svg/add.svg" alt="Icono" class="h-5 w-5" />
          Crear Bot
        </button>
      </div>

      <BotoneraModo>
        <!-- Modo Clasificación -->
        <template #clasificacion>
          <ClasificationBotSection
            @showJoinLeagueModal="showJoinLeagueModal"
            :bots="botSummaries"
            :botLeagueSummaries="botLeagueSummaries"
          />
        </template>
        <!-- Modo Resumen -->
        <template #resumen>
          <ResumeSection :botsDetails="botsDetails" @openEditMenu="openEditMenu" />
        </template>
      </BotoneraModo>
    </div>
  </main>

  <!-- Menú flotante para editar -->
  <!-- TODO: Arreglar esto <EditBotModal /> -->

  <JoinLeagueModal v-if="visibleJoinLeagueModal" :selectedBotId="selectedBotId" />
  <FooterApp>
    <img
      src="@/assets/svg/ayuda.svg"
      alt="Ayuda"
      class="h-6 w-6 cursor-pointer"
      @click="showHelpModal = true"
    />
  </FooterApp>

  <HelpBotModal v-if="showHelpModal" @close-modal="showHelpModal = false" />
</template>
