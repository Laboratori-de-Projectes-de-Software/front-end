<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Bot } from '@/types'

const isOpen = ref(false)
const selectedOptions = ref<Bot[]>([])
const search = ref('')
const dropdownContainer = ref()

const props = defineProps<{
  options: Bot[] | undefined
}>()
const emit = defineEmits(['update:selected'])

const options = ref<Bot[] | undefined>(props.options)

const toggleDropdown = () => {
  if (!isOpen.value) {
    isOpen.value = true
  }
}

const closeDropdown = (event: FocusEvent) => {
  const nextFocusedElement = event.relatedTarget as HTMLElement
  if (!dropdownContainer.value.contains(nextFocusedElement)) {
    isOpen.value = false
  }
}

const toggleOption = (option: Bot) => {
  const index = selectedOptions.value.findIndex((item) => item.name === option.name)
  if (index === -1) {
    selectedOptions.value.push(option)
  } else {
    selectedOptions.value.splice(index, 1)
  }
  emit('update:selected', selectedOptions.value)
}

const isSelected = (option: Bot) => {
  return selectedOptions.value.some((item) => item.name === option.name)
}

const hasFilteredOptions = computed(() => {
  return filteredOptions.value.length > 0
})

const filteredOptions = computed(() => {
  return (options.value ?? []).filter((option) =>
    option.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div
    class="rounded-lg border border-[#666] bg-[#353535]"
    tabindex="0"
    @focusin="toggleDropdown"
    @focusout="closeDropdown"
    ref="dropdownContainer"
  >
    <div
      class="selected relative flex flex-wrap gap-x-2 gap-y-1 px-3 py-1.5"
      :class="isOpen ? 'border-b border-[#666]' : ''"
    >
      <div
        v-for="option in selectedOptions"
        :key="option.name"
        class="flex flex-row gap-1 rounded-lg bg-[#4e4e4e] px-2 py-1 text-sm"
      >
        <img :src="option.imageUrl" alt="" srcset="" /> {{ option.quality }} ({{ option.name }})
        <button class="" @click.stop="toggleOption(option)">X</button>
      </div>
      <input
        type="text"
        class="w-full focus-visible:outline-0"
        v-model="search"
        placeholder="Buscar..."
      />
      <span class="absolute right-2">{{ isOpen ? '▲' : '▼' }}</span>
    </div>

    <div v-show="isOpen" class="flex flex-col gap-1 px-3 py-1.5">
      <template v-if="hasFilteredOptions">
        <div v-for="(option, index) in filteredOptions" :key="option.name">
          <div class="flex flex-row gap-2">
            <input type="checkbox" :checked="isSelected(option)" @change="toggleOption(option)" />
            <img :src="option.imageUrl" alt="" srcset="" /> {{ option.quality }} ({{
              option.name
            }})
          </div>

          <div
            v-if="index !== filteredOptions.length - 1"
            class="mt-1 w-full border-b border-[#666]"
          ></div>
        </div>
      </template>
      <div v-else class="py-2 text-center text-gray-400">No se ha encontrado ningún bot</div>
    </div>
  </div>
</template>
