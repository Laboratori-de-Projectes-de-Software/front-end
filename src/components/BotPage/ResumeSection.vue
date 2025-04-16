<script lang="ts" setup>
import type { Bot } from '@/types'

const props = defineProps<{
  botsDetails: Bot[]
}>()

const emit = defineEmits<{
  (e: 'openEditMenu', bot: Bot): void
}>()

const openEditMenu = (bot: Bot) => {
  emit('openEditMenu', bot)
}
</script>

<template>
  <div class="w-full">
    <section v-for="bot in props.botsDetails" :key="bot.botId" class="mb-4 w-full px-4 pt-4 pb-4">
      <!-- Contenedor principal -->
      <div class="flex flex-col gap-4 rounded-lg p-4 sm:flex-row">
        <!-- Contenedor del texto (nombre y cualidad) -->
        <div class="flex flex-col justify-center text-center sm:text-left">
          <h2 class="text-center text-[32px] font-bold text-white">
            {{ bot.name.toUpperCase() }}
          </h2>
          <h3 class="text-center text-[24px] font-semibold text-white">({{ bot.description }})</h3>
        </div>

        <!-- Contenedor de la imagen -->
        <div class="flex cursor-pointer items-center justify-center" @click="openEditMenu(bot)">
          <img
            :src="bot.urlImage"
            alt="Imagen del Bot"
            class="h-[200px] w-[200px] rounded-lg border-2 border-gray-500 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      <!-- Línea separadora -->
      <div class="mx-auto mt-1 mb-4 h-[2px] w-full bg-gray-500"></div>

      <!-- Contenedor de estadísticas -->
      <div class="mt-2 flex flex-row items-center justify-center gap-12 text-white">
        <!-- Empates -->
        <div class="flex flex-col items-center">
          <div class="mt-4 text-[32px] font-bold">
            {{ bot.nDraws }}
          </div>
          <div class="mb-1 h-[1px] w-8 bg-white"></div>
          <div class="text-[20px] font-semibold">Empates</div>
        </div>

        <!-- Victorias -->
        <div class="-mt-4 flex flex-col items-center">
          <div class="text-[48px] font-bold">
            {{ bot.nWins }}
          </div>
          <div class="-mt-2 mb-1 h-[1px] w-8 bg-white"></div>
          <div class="text-[24px] font-semibold">Victorias</div>
        </div>

        <!-- Derrotas -->
        <div class="flex flex-col items-center">
          <div class="mt-4 text-[32px] font-bold">
            {{ bot.nLosses }}
          </div>
          <div class="mb-1 h-[1px] w-8 bg-white"></div>
          <div class="text-[20px] font-semibold">Derrotas</div>
        </div>
      </div>
    </section>
  </div>
</template>
