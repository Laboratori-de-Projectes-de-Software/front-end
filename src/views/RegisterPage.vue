<template>
  <header class="flex w-full flex-row items-center justify-between px-10 py-2.5">
    <h1 class="text-4xl font-bold md:text-[48px] lg:text-[64px]">Bienvenido a BotSports</h1>
    <img class="h-[150px]" src="../assets/loginicon.svg" alt="" />
  </header>

  <main class="my-10 flex w-full justify-center">
    <form
      action="post"
      @submit.prevent="handleSubmit"
      class="flex w-full flex-col items-center gap-4 rounded-md bg-white p-6 text-black md:mx-24 lg:mx-36 lg:w-[700px]"
    >
      <label for="username" class="flex w-full flex-col">
        Nombre de usuario
        <input
          v-model="username"
          class="my-2 rounded-lg border-1 border-gray-400 px-3 py-2"
          type="text"
          id="username"
          name="username"
          placeholder="Escribe tu nombre de usuario"
          required
        />
      </label>
      <label for="email" class="flex w-full flex-col">
        Email
        <input
          v-model="email"
          class="my-2 rounded-lg border-1 border-gray-400 px-3 py-2"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
      </label>

      <div class="flex w-full flex-row items-center gap-8">
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
        <label for="confirm-password" class="flex w-full flex-col">
          Confirmar Contraseña
          <input
            v-model="confirmPassword"
            class="my-2 rounded-lg border-1 border-gray-400 px-3 py-2"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirma tu contraseña"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        class="flex w-48 justify-center rounded-full bg-[#525252] py-2 text-white"
      >
        Registrarse
      </button>
    </form>
  </main>
  <FooterApp />
</template>

<script setup lang="ts">
import FooterApp from '@/components/FooterApp.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  const userData = {
    user: username.value,
    mail: email.value,
    password: password.value,
  }

  const response = await fetch('http://localhost:8080/api/v0/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    handleErrorResponse(response.status)
  } else {
    router.push('/login')
  }
}

const handleErrorResponse = (status: number) => {
  const errorMessages: Record<number, { title: string; text: string }> = {
    409: { title: 'Error', text: 'El nombre de usuario o correo electrónico ya están en uso' },
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
</script>
