<!-- ProfileDropdown.vue -->
<template>
  <div>
    <button @click="toggleMenu()">
      <img src="@/assets/tempProfile.png" alt="" />
    </button>

    <nav
      v-if="isOpen"
      class="absolute right-10 mt-1 flex w-fit flex-col gap-2 rounded-md bg-[#525252] items-end px-6 py-4 text-right font-bold shadow-lg"
      aria-label="Menú de usuario"
    >
      <RouterLink to="/profile" class="w-fit rounded-md p-1">
        Mi Perfil
      </RouterLink>
      <button @click="logout()" class="cursor-pointer w-full rounded-md p-1">
        Cerrar sesión
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
