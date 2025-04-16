<script setup lang="ts">
import type { BotLeagueSummary, Bot } from '@/types'

const props = defineProps<{
  botLeagueSummaries: BotLeagueSummary[]
  bots: Bot[]
}>()

const botInLeagueId = props.botLeagueSummaries.map((summary) => summary.botId)
const botInLeague = props.bots.filter((bot) => botInLeagueId.includes(bot.botId))
const botsNotInLeague = props.bots.filter((bot) => !botInLeagueId.includes(bot.botId))

const emit = defineEmits(['showJoinLeagueModal'])

function handleJoinLeague(botId?: number) {
  emit('showJoinLeagueModal', botId)
}
</script>

<template>
  <div class="w-full">
    <!-- Sección para bots que participan en una liga -->
    <section
      v-for="bot in botInLeague"
      :key="bot.botId"
      class="mb-4 w-full rounded-2xl bg-[#2a2a2a] px-4 pt-4 pb-4"
    >
      <!-- Nombre del Bot y su Cualidad -->
      <h2 class="text-center text-[32px] font-bold text-white">
        {{ bot.name }}
      </h2>
      <h3 class="text-center text-[32px] font-semibold text-white">({{ bot.description }})</h3>

      <!-- Línea separadora -->
      <div class="mx-auto mt-1 mb-4 h-[2px] w-2/3 bg-gray-500"></div>

      <p class="mb-2 text-center text-[16px] font-bold text-white">Posición en la Liga Actual</p>

      <!-- Tabla de clasificación -->
      <table class="mx-auto w-full table-auto border-collapse text-white">
        <thead>
          <tr class="border-b border-gray-600 text-left">
            <th class="px-3 py-2 text-center text-[18px]">Pos</th>
            <th class="px-4 py-2 text-left text-[18px]">Nombre</th>
            <th class="px-4 py-2 text-left text-[18px]">Cualidad</th>
            <th class="px-2 py-2 text-center text-[18px]">PJ</th>
            <th class="px-2 py-2 text-center text-[18px]">G</th>
            <th class="px-2 py-2 text-center text-[18px]">E</th>
            <th class="px-2 py-2 text-center text-[18px]">P</th>
            <th class="px-3 py-2 text-center text-[18px]">Ptos</th>
          </tr>
        </thead>
        <tbody>
          <!-- Se itera sobre la clasificación filtrada (por ejemplo: posición superior, actual e inferior) -->
          <tr
            v-for="(entry, index) in botLeagueSummaries.find(
              (summary) => summary.botId === bot.botId
            )?.classification"
            :key="index"
            class="border-b border-gray-500"
            :class="{
              'font-bold text-[#FADA5E]': entry.botId === bot.botId,
            }"
          >
            <td class="px-3 py-2 text-center text-[16px]">
              {{ entry.position }}
            </td>
            <td class="flex items-center px-4 py-2 text-left text-[16px]">
              <!--<img :src="getBotById(entry.botId)?.urlImage" alt="Imagen del bot" class="mr-2 h-6 w-6" />-->
              {{ entry.botName }}
            </td>
            <td class="px-4 py-2 text-left text-[16px]">
              {{ bots.find((b) => b.botId === entry.botId)?.description }}
            </td>
            <td class="px-2 py-2 text-center text-[16px]">
              {{ entry.nwins + entry.ndraws + entry.nlosses }}
            </td>
            <td class="px-2 py-2 text-center text-[16px]">
              {{ entry.nwins }}
            </td>
            <td class="px-2 py-2 text-center text-[16px]">
              {{ entry.ndraws }}
            </td>
            <td class="px-2 py-2 text-center text-[16px]">
              {{ entry.nlosses }}
            </td>
            <td class="px-3 py-2 text-center text-[16px]">
              {{ entry.points }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Botones para ver la liga actual y el historial de ligas -->
      <div class="mt-6 flex flex-wrap justify-center gap-x-4">
        <button
          class="cursor-pointer rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white"
        >
          Ver Liga Actual
        </button>
        <button
          class="cursor-pointer rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white"
        >
          Ver Historial de Ligas
        </button>
      </div>
    </section>

    <!-- Sección para bots que NO están en ninguna liga -->
    <section
      v-for="bot in botsNotInLeague"
      :key="bot.botId"
      class="mb-4 w-full rounded-2xl bg-[#2a2a2a] px-4 pt-4 pb-4 text-center"
    >
      <!-- Nombre del Bot y su Cualidad -->
      <h2 class="text-center text-[32px] font-bold text-white">
        {{ bot.name }}
      </h2>
      <h3 class="text-center text-[32px] font-semibold text-white">
        {{ bot.description }}
      </h3>

      <!-- Línea separadora -->
      <div class="mx-auto mt-1 mb-4 h-[2px] w-2/3 bg-gray-500"></div>

      <p class="mt-6 mb-6 text-[16px] font-bold text-[#8D8D8D]">
        En ninguna liga en curso actualmente...
      </p>
      <div class="flex flex-col items-center gap-y-4">
        <button
          class="cursor-pointer rounded-full bg-white px-6 py-2 text-[16px] font-bold text-black"
          @click="handleJoinLeague(bot.id)"
        >
          Apuntarse
        </button>
        <button
          class="cursor-pointer rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white"
        >
          Ver Historial de Ligas
        </button>
      </div>
    </section>
  </div>
</template>
