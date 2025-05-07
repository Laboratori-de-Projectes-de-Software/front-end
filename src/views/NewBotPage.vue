<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import HeaderApp from '@/components/HeaderApp.vue'
import FooterApp from '@/components/FooterApp.vue'
import addPhoto from '@/assets/svg/addPhoto.svg'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// Para el cambio de página
const router = useRouter()
function goToMyBots() {
  router.push('/myBots')
}

// Estados para los campos del formulario
const nombre = ref('')
const cualidad = ref('')
const apiUrl = ref('')

// Estado y referencias para la imagen
const imageUrl = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

// Nueva variable reactiva para almacenar las dimensiones originales de la imagen
const imageDimensions = ref({ width: 0, height: 0 })
const maxDimension = 200

// Nuevo estado: URL externa introducida por el usuario (opcional)
const externalUrl = ref('')

// Watcher para actualizar las dimensiones cuando imageUrl cambie
watch(imageUrl, (newUrl) => {
  if (newUrl) {
    const img = new Image()
    img.src = newUrl
    img.onload = () => {
      imageDimensions.value = { width: img.width, height: img.height }
    }
  } else {
    imageDimensions.value = { width: 0, height: 0 }
  }
})

// Computed para calcular el estilo del contenedor según las dimensiones escaladas
const containerStyle = computed(() => {
  if (!imageUrl.value) return { width: `${maxDimension}px`, height: `${maxDimension}px` }

  const { width, height } = imageDimensions.value
  const scaleFactor = Math.min(maxDimension / width, maxDimension / height)
  const finalWidth = Math.round(width * scaleFactor)
  const finalHeight = Math.round(height * scaleFactor)

  return {
    width: `${finalWidth}px`,
    height: `${finalHeight}px`
  }
})

// Función para actualizar la imagen desde la URL externa
function onExternalUrlSubmit() {

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
        confirmButton: 'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium'
      },
      buttonsStyling: false
    })
    externalUrl.value = ''
    imageUrl.value = null
  }
  testImg.src = url
}

// Manejador para el cambio del archivo (subida de imagen)
function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files?.length) return

  const file = files[0]

  // Verificar que sea una imagen
  if (!file.type.startsWith('image/')) {
    Swal.fire({
      icon: 'error',
      title: 'Archivo no válido',
      text: 'Por favor, selecciona un archivo de imagen válido.',
      customClass: {
        confirmButton: 'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium'
      },
      buttonsStyling: false
    })
    return
  }

  // Leer y mostrar la vista previa
  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

function onImageClick() {
  fileInputRef.value?.click()
}

// Para gestionar el envío del formulario
async function onSubmitForm() {
  if (!imageUrl.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Imagen requerida',
      text: 'Por favor, selecciona o introduce una imagen antes de crear el bot.',
      customClass: {
        confirmButton: 'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium'
      },
      buttonsStyling: false
    })
    return
  }

  const botData = {
    name: nombre.value,
    urlImage: imageUrl.value,
    description: cualidad.value,
    endpoint: apiUrl.value
  }

  const response = await fetch('http://localhost:8080/api/v0/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(botData)
  })

  if (!response.ok) {
    handleErrorResponse(response.status)
  } else {
    const data = await response.json()
    console.log('Bot creado:', data)
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Bot creado correctamente',
      customClass: {
        confirmButton: 'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium'
      },
      buttonsStyling: false
    })

    // Limpiamos los campos del formulario
    nombre.value = ''
    cualidad.value = ''
    apiUrl.value = ''
    imageUrl.value = null
    imageDimensions.value = { width: 0, height: 0 }
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}

function handleErrorResponse(status: number) {
  const errorMessages: Record<number, { title: string; text: string }> = {
    400: { title: 'Error', text: 'Solicitud incorrecta' },
    401: { title: 'Error', text: 'No autorizado' },
    408: { title: 'Error', text: 'Tiempo de espera agotado' },
    409: { title: 'Error', text: 'Conflicto. Bot ya existente' },
    500: { title: 'Error', text: 'Error interno del servidor. Contacta con el soporte' }
  }

  const error = errorMessages[status] || { title: 'Error', text: 'Error desconocido. Por favor, intenta de nuevo más tarde.' }
  showErrorAlert(error.title, error.text)
}

function showErrorAlert(title: string, text: string) {
  Swal.fire({
    icon: 'error',
    title,
    text,
    customClass: {
      confirmButton: 'bg-[#06f] cursor-pointer text-white rounded border-0 text-base px-4 py-2 shadow-md font-medium'
    },
    buttonsStyling: false
  })
}
</script>

<template>
  <HeaderApp title="Mis Bots" :is-heading1="true" />
  <main class="xs:px-8 mb-10 flex w-full flex-col items-center justify-center px-3 sm:max-w-[860px] md:px-10 lg:w-[860px]">
    <header class="m-3 flex w-full flex-col gap-2">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-4xl font-bold">Nuevo Bot</h1>
      </div>
      <div class="h-0 w-full border"></div>
    </header>

    <div class="mb-4 flex w-full flex-col items-center gap-12 rounded-2xl bg-[#2a2a2a] py-5">
      <!-- Formulario de Creación de Bot -->
      <form @submit.prevent="onSubmitForm" class="flex w-full flex-col items-center gap-8 rounded-md px-18 font-bold text-white">

        <!-- Sección para imagen y URL externa (opcional) -->
        <div class="mt-2 flex w-full flex-col items-center gap-4">
          <!-- Contenedor de la imagen -->
          <div
            :style="containerStyle"
            class="flex items-center justify-center relative cursor-pointer"
            @click="onImageClick"
          >
            <img
              :style="containerStyle"
              :src="imageUrl ? imageUrl : addPhoto"
              alt="Imagen del Bot"
              class="rounded-lg border-2 border-gray-500 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileChange"
            />
          </div>

          <!-- URL externa -->
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
              <button type="button" @click="onExternalUrlSubmit" class="rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white">
                Aplicar
              </button>
            </div>
          </label>
        </div>

        <!-- Otros campos del formulario -->
        <fieldset class="mb-4 grid w-full grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
          <!-- Nombre -->
          <label for="name" class="flex flex-col">
            Nombre
            <input
              id="name"
              v-model="nombre"
              type="text"
              class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              placeholder="Introduce el nombre..."
              required
            />
          </label>
          <!-- Cualidad -->
          <label for="cualidad" class="flex flex-col">
            Cualidad
            <input
              id="cualidad"
              v-model="cualidad"
              type="text"
              class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              placeholder="Introduce la cualidad..."
              required
            />
          </label>
          <!-- API URL -->
          <label for="api-url" class="flex flex-col sm:col-span-2">
            API URL
            <input
              id="api-url"
              v-model="apiUrl"
              type="text"
              class="w-full rounded-xl bg-[#c1c1c1] p-2.5 text-sm placeholder:text-[#878787] dark:bg-[#4e4e4e]"
              placeholder="Introduce la URL..."
              required
            />
          </label>
        </fieldset>
        <!-- Botón para crear un bot -->
        <button type="submit" class="-mt-4 rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white">
          Crear Bot
        </button>
        <!-- Botón para volver a mis bots -->
        <button class="-mt-3 mb-2 rounded-full bg-[#06f] px-6 py-2 text-[16px] font-bold text-white" @click="goToMyBots">
          Volver a Mis Bots
        </button>
      </form>
    </div>

  </main>
  <FooterApp />
</template>
