<script setup lang="ts">
import type { Match } from '@/types'
import SectionSideBar from './SectionSideBar.vue'
import ToggleSideBarIcon from '@/assets/svg/ToggleSideBarIcon.vue'
import { ref } from 'vue'
// TODO: Descomentar cuando se tenga la API de mensajes
// import { onMounted } from 'vue'

// const matches = ref<Match[]>([])

// const loadMatches = async () => {
//   const response = await fetch(
//     `http://localhost:8080/api/v0/league/${localStorage.getItem('league')}/match`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     }
//   )

//   if (!response.ok) {
//     alert('Error al cargar los mensajes. Por favor, inténtalo de nuevo.')
//   } else {
//     const data = await response.json()
//     matches.value = data
//   }
// }

// onMounted(() => {
//   loadMatches()
// })

const matches: Match[] = [
  {
    id: 1,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'COMPLETED',
    result: 0,
    roundNumber: 24,
  },
  {
    id: 2,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'COMPLETED',
    result: 0,
    roundNumber: 24,
  },
  {
    id: 3,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 4,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 5,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 6,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 7,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 8,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 9,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 10,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
  {
    id: 11,
    fighters: [
      {
        id: 1,
        name: 'Carlos',
        quality: 'Soberbia',
        imageUrl: 'https://example.com/soberbia.png',
        apiUrl: 'https://example.com/api/soberbia',
      },
      {
        id: 2,
        name: 'Juan',
        quality: 'Empatía',
        imageUrl: 'https://example.com/empatía.png',
        apiUrl: 'https://example.com/api/empatía',
      },
    ],
    state: 'IN_PROGRESS',
    result: -1,
    roundNumber: 24,
  },
]

const props = defineProps<{ isHidden: boolean }>()

const darkMode = ref(document.documentElement.classList.contains('dark'))

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  darkMode.value = !darkMode.value
}
</script>

<template>
  <aside
    class="z-10 flex min-h-screen w-full flex-col gap-10 bg-[#eee] px-8 py-4 transition-transform duration-300 ease-in-out sm:w-[20rem] sm:px-6 dark:bg-[#3b3b3b]"
    :class="props.isHidden ? 'fixed -translate-x-full' : 'translate-x-0'"
  >
    <header class="flex flex-row items-center justify-between">
      <div class="font-bold">
        <h3 class="text-xs text-[#a8a8a8]">LaLiga EA Sports</h3>
        <h2 class="text-2xl">Jornada 24</h2>
      </div>
      <button @click="$emit('toggle-sidebar')" class="h-8 w-8 cursor-pointer object-contain">
        <ToggleSideBarIcon classList="w-8 h-8" />
      </button>
    </header>
    <div class="flex flex-col gap-2.5 overflow-y-auto">
      <SectionSideBar
        title="COMPLETED"
        :matches="matches.filter((match) => match.state === 'COMPLETED')"
        classListButtonChat="w-full sm:w-fit text-[24px] sm:text-[20px]"
      />
      <SectionSideBar
        title="En Progreso"
        :matches="matches.filter((match) => match.state !== 'COMPLETED')"
        classListButtonChat="w-full sm:w-fit text-[24px] sm:text-[20px]"
      />
    </div>
    <button
      class="fixed bottom-5 left-5 flex h-9 w-9 items-center justify-center"
      @click="toggleDarkMode()"
    >
      <img class="hidden dark:block" src="@/assets/svg/lightIcon.svg" alt="Modo claro" />
      <img class="dark:hidden" src="@/assets/svg/darkIcon.svg" alt="Modo oscuro" />
    </button>
  </aside>
</template>
