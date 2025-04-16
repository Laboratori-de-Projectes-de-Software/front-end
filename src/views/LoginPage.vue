<template>
  <header class="flex w-full flex-row items-center justify-between px-10 py-2.5">
    <h1 class="text-4xl font-bold md:text-[48px] lg:text-[64px]">Bienvenido a BotSports</h1>
    <img class="h-[150px]" src="../assets/loginicon.svg" alt="" />
  </header>

  <main class="my-18 flex w-full justify-center">
    <form
      action="post"
      @submit.prevent="handleLogin()"
      class="flex w-full flex-col items-center gap-4 rounded-md bg-white p-6 text-black md:mx-24 lg:mx-36 lg:w-[700px]"
    >
      <label for="user" class="flex w-full flex-col">
        Nombre de usuario
        <input
          v-model="user"
          class="my-2 rounded-lg border-1 border-gray-400 px-3 py-2"
          type="text"
          id="user"
          name="user"
          placeholder="Escribe aquí tu nombre de usuario"
          required
        />
      </label>

      <label for="password" class="flex w-full flex-col">
        Contraseña
        <input
          v-model="password"
          class="my-2 rounded-lg border-1 border-gray-400 px-3 py-2"
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          required
        />
      </label>

      <a href="http://" class="self-start underline">Forgot Password?</a>

      <button
        type="submit"
        class="mx-3 box-border w-full rounded-full bg-[#06f] py-2 text-white md:w-xs lg:w-2xs"
      >
        Iniciar Sesión
      </button>

      <a href="register" class="flex w-48 justify-center rounded-full bg-[#525252] py-2 text-white">
        Registrarse
      </a>
    </form>
  </main>
  <FooterApp />
</template>

<script setup lang="ts">
import FooterApp from '@/components/FooterApp.vue'
import { useAuthStore } from '@/store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const router = useRouter()

const user = ref('')
const password = ref('')

const handleLogin = async () => {
  const userData = {
    user: user.value,
    password: password.value,
  }

  const response = await fetch('http://localhost:8080/api/v0/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    handleErrorResponse(response.status)
  } else {
    const data = await response.json()

    const authStore = useAuthStore()
    authStore.login(data.token, data.expiresIn)

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.id)
    localStorage.setItem('user', data.user)
    redirectHome()
  }
}

const handleErrorResponse = (status: number) => {
  const errorMessages: Record<number, { title: string; text: string }> = {
    401: { title: 'Error', text: 'Usuario o contraseña incorrectos' },
    403: { title: 'Error', text: 'Acceso denegado. Contacta con el soporte' },
    500: {
      title: 'Error',
      text: 'Error interno del servidor. Contacta con el soporte',
    },
  }

  const error = errorMessages[status] || {
    title: 'Error',
    text: 'Error desconocido. Por favor, intenta de nuevo más tarde.',
  }

  showErrorAlert(error.title, error.text)
}

const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    customClass: {
      confirmButton:
        'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium transition-shadow duration-150 hover:shadow-lg',
    },
    buttonsStyling: false,
  })
}

function redirectHome() {
  const redirectPath = localStorage.getItem('redirectPath')
  // Redirecciona en caso de que haya una ruta guardada, de lo contrario redirecciona a la raíz
  router.push(redirectPath || '/')
  localStorage.removeItem('redirectPath')
}
</script>
