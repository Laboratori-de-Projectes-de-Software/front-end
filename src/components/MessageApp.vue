<script lang="ts" setup>
const props = defineProps<{ id: number; imgPath: (string | undefined)[] }>()

const isTextLeft = props.id % 2 !== 0
const bgColor = !isTextLeft ? 'bg-[#06f] text-white' : 'bg-[#e3e3e3] dark:bg-[#606060]'
const radiusClass = ['rounded-3xl', !isTextLeft ? 'rounded-br-none' : 'rounded-bl-none']
</script>

<template>
  <div class="flex items-end gap-2" :class="isTextLeft ? 'justify-start' : 'justify-end'">
    <img
      v-if="isTextLeft"
      :src="props.imgPath?.[0] ?? ''"
      alt="Profile"
      class="h-6 w-6 rounded-full bg-white object-contain sm:h-8 sm:w-8"
    />
    <div
      :class="[bgColor, radiusClass]"
      :style="{ maxWidth: 'min(3/4*100%, 36rem)' }"
      class="p-3.5 text-sm lg:text-[16px]"
    >
      <slot></slot>
    </div>
    <img
      v-if="!isTextLeft"
      :src="props.imgPath?.[1] ?? ''"
      alt="Profile"
      class="h-6 w-6 rounded-full bg-white object-contain sm:h-8 sm:w-8"
    />
  </div>
</template>
