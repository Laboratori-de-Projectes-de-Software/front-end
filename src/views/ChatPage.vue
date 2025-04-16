<script setup lang="ts">
import ToggleSideBarIcon from '@/assets/svg/ToggleSideBarIcon.vue'
import FooterApp from '@/components/FooterApp.vue'
import HeaderApp from '@/components/HeaderApp.vue'
import MessageApp from '@/components/MessageApp.vue'
import SideBar from '@/components/SideBar/SideBar.vue'
import type { Bot, Message } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const matchId = route.params.matchId as string

const mensajes = ref<Message[]>([])
const bots = ref<(Bot | null)[]>([])

const loadMessages = async () => {
  // TODO: Descomentar cuando este el endpoint bien hecho
  // const response = await fetch(`http://localhost:8080/api/v0/match/${matchId}/message`, {
  const response = await fetch(`http://localhost:8080/api/v0/match/${matchId}/messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    alert('Error al cargar los mensajes. Por favor, inténtalo de nuevo.')
  } else {
    const data = await response.json()
    mensajes.value = data
    obtenerImgsPath(data)
  }
}

onMounted(() => {
  loadMessages()
})

const obtenerImgsPath = async (mensajes: Message[]) => {
  const ids = new Set(mensajes.map((mensaje) => Number(mensaje.idBot)))
  bots.value = await Promise.all(
    Array.from(ids).map(async (id) => {
      const response = await fetch(`http://localhost:8080/api/v0/bot/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        return data as Bot
      } else {
        console.error(`Failed to fetch image for botId ${id}`)
        return null
      }
    })
  )
}

const sideBarHidden = ref(false)
const toggleSideBar = () => {
  sideBarHidden.value = !sideBarHidden.value
}
</script>

<template>
  <div class="flex h-screen w-full flex-row">
    <SideBar @toggle-sidebar="toggleSideBar" :isHidden="sideBarHidden" />
    <div class="w-full flex-col sm:flex" :class="sideBarHidden ? 'flex' : 'hidden'">
      <HeaderApp :isHeading1="true" :title="bots[0]?.name + ` (${bots[0]?.description}) ` + ' vs ' + bots[1]?.name + ` (${bots[1]?.description}) `">
        <button
          @click="toggleSideBar()"
          :class="sideBarHidden ? 'block' : 'hidden'"
          class="h-8 w-8 cursor-pointer object-contain"
        >
          <ToggleSideBarIcon classList="h-8 w-8" />
        </button>
      </HeaderApp>
      <main class="mr-1 mb-6 overflow-y-auto">
        <div
          class="mx-auto mb-12 flex max-w-5xl flex-col justify-center gap-3 px-2 sm:gap-6 md:px-8"
        >
          <div v-for="(mensaje, index) in mensajes" :key="index">
            <MessageApp :id="index" :imgPath="bots.map((bot) => bot?.urlImage)">{{
              mensaje.mensaje
            }}</MessageApp>
          </div>
        </div>
      </main>
      <FooterApp :hideDarkLight="true" />
    </div>
  </div>
</template>
