<script setup lang="ts">
import Dropdown from '@/components/DropDown.vue'
import FooterApp from '@/components/FooterApp.vue'
import HeaderApp from '@/components/HeaderApp.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import type { Bot } from '@/types'



interface BotSummary {
  id: number
  name: string
  description: string
}

const options = ref<Bot[]>()

const getAllBotsSummary = async () => {
  const response = await fetch('http://localhost:3000/api/v0/bot', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    console.error('Error fetching bots:', response.statusText)
    return []
  } else {
    const data = await response.json()

    const botsDetails = await Promise.all(
      data.map(async (bot: BotSummary) => {
        const botResponse = await fetch(`http://localhost:3000/api/v0/bot/${bot.name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!botResponse.ok) {
          console.error('Error fetching bot details:', botResponse.statusText)
          return null
        }
        const botData = await botResponse.json()

        return {
          id: botData.id,
          name: botData.name,
          description: botData.description,
          urlImage: botData.urlImage,
        }
      })
    )
    options.value = botsDetails.filter((bot) => bot !== null)
  }
}

onMounted(() => {
  getAllBotsSummary()
})

const name = ref('')
const rounds = ref(0)
const matchTime = ref(0)
const selectedBots = ref<Bot[]>([])

const createLeagueRequest = async () => {
  // TODO: Implementar la selección de imagenes
  const body = {
    name: name.value,
    rounds: rounds.value,
    matchTime: matchTime.value,
    bots: selectedBots.value.map((bot) => bot.id),
    imagen: imageUrl.value,
    // urlImagen: imageUrl.value,
  }
  console.log('Body:', body)

  const response = await fetch('http://localhost:8080/api/v0/league', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    console.error('Error creating league:', response.statusText)
    return
  } else {
    const data = await response.json()
    console.log('League created successfully:', data)
    router.push('/')
  }
}

const externalUrl = ref('')
const imageUrl = ref<string | null>(null)

const onExternalUrlSubmit = () => {
  const url = externalUrl.value.trim()

  // Crea una imagen de prueba para verificar que la URL carga correctamente
  const testImg = new Image()
  testImg.onload = () => {
    imageUrl.value = url
    externalUrl.value = '' // Limpia el campo tras una carga exitosa
  }
  testImg.onerror = () => {
    Swal.fire({
      icon: 'error',
      title: 'Error de carga de imagen',
      text: 'La URL proporcionada no es válida.',
      customClass: {
        confirmButton:
          'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium',
      },
      buttonsStyling: false,
    })
    externalUrl.value = ''
    imageUrl.value = null
  }
  testImg.src = url
}

const imageClass = ref('')
const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.naturalWidth > img.naturalHeight) {
    imageClass.value = 'w-full h-auto' // Imagen más ancha que alta
  } else {
    imageClass.value = 'h-full w-auto' // Imagen más alta que ancha
  }
}
</script>

<template>
  <HeaderApp :isHeading1="false" />

  <main
    class="xs:px-8 mb-10 flex w-full flex-col items-center justify-center px-3 sm:max-w-[860px] md:px-10 lg:w-[860px]"
  >
    <header class="m-3 flex w-full flex-col gap-2">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-4xl font-bold">Nueva Liga</h1>
      </div>
      <div class="h-0 w-full border"></div>
    </header>

    <div className="bg-[#2a2a2a] rounded-2xl mb-4 flex flex-col items-center gap-12 py-5">
      <form
        action="post"
        @submit.prevent="createLeagueRequest()"
        class="flex w-full flex-col items-center gap-8 rounded-md px-18 font-bold lg:w-[700px] dark:text-white"
      >
        <div class="flex w-full flex-col items-center gap-2">
          <div
            class="flex h-37.5 w-45 cursor-pointer items-center justify-center rounded-2xl bg-white p-6"
          >
            <div
              class="flex h-full w-full items-center justify-center p-2 text-center text-2xl text-black"
              v-if="!imageUrl || imageUrl === ''"
            >
              Añadir imagen
            </div>
            <img
              v-else
              :src="imageUrl"
              alt="League Image"
              :class="`object-cover ${imageClass}`"
              @load="onImageLoad"
            />
          </div>
          <label for="external-url" class="mt-2 -mb-2 flex w-full flex-col">
            URL Imagen (Opcional)
            <div class="flex w-full items-center gap-2">
              <input
                id="external-url"
                v-model="externalUrl"
                type="text"
                placeholder="Introduce la URL..."
                class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              />
              <button
                type="button"
                @click="onExternalUrlSubmit()"
                class="rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white"
              >
                Aplicar
              </button>
            </div>
          </label>
        </div>

        <fieldset class="mb-8 grid w-full grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
          <!-- Nombre -->
          <label for="name">
            Nombre
            <input
              v-model="name"
              id="name"
              type="text"
              class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              placeholder="Introduce tu nombre"
              required
          /></label>

          <!-- Nº de rondas -->
          <label for="rounds">
            Rondas
            <input
              v-model="rounds"
              id="rounds"
              type="text"
              class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              placeholder="Introduce el número de rondas"
              required
          /></label>

          <!-- Tiempo de partida -->
          <label for="matchTime">
            Tiempo de partida (segundos)
            <input
              v-model="matchTime"
              id="matchTime"
              type="text"
              class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              placeholder="Introduce un número"
              required
          /></label>
        </fieldset>

        <fieldset class="flex w-full flex-col">
          <legend class="mb-6 w-full text-2xl font-semibold">
            Bots
            <div class="mt-2 w-2/7 border dark:border-white"></div>
          </legend>
          <!-- Selección de Bots -->
          <Dropdown
            :options="options"
            @update:selected="
              (value) => {
                selectedBots = value
              }
            "
          />
        </fieldset>
        <!-- Botón Crear Liga -->
        <button
          type="submit"
          class="mt-6 cursor-pointer rounded-full bg-[#06f] px-6 py-3 text-lg text-white"
          aria-label="Guardar cambios"
        >
          Crear Liga
        </button>
      </form>
    </div>
  </main>
  <FooterApp />
</template>
