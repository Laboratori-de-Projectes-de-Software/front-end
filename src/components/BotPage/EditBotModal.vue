<script setup lang="ts">
// Función para guardar los cambios del bot y actualizarlo mediante la API
async function saveBotChanges() {
  // Se verifica que haya un bot seleccionado para editar
  if (selectedBot.value) {
    // Creamos el objeto con los datos que se enviarán a la API
    const updateData = {
      name: selectedBot.value.name,
      description: selectedBot.value.description,
      urlImagen: selectedBot.value.urlImage,
      endpoint: '',
    }

    // Se llama a la API con el método PUT para actualizar el bot.
    const response = await fetch(`http://localhost:8080/api/v0/bot/${selectedBot.value.botId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      // Manejo de errores según el código de estado
      handleErrorResponse(response.status)
    } else {
      // Si la llamada fue exitosa:
      const updatedBot = await response.json()

      // Se busca el índice del bot actualizado dentro del array local.
      const botIndex = botsDetails.value.findIndex((bot) => bot.botId === selectedBot.value!.botId)

      // Se actualiza el bot en el array con los datos recibidos de la API.
      if (botIndex !== -1) {
        botsDetails.value[botIndex] = updatedBot
      }

      // Posiblemente esto se podría quitar al comprobar que se cambia correctamente
      Swal.fire({
        icon: 'success',
        title: 'Bot actualizado',
        text: 'El bot se ha actualizado correctamente',
      })

      closeEditMenu()
    }
  }
}
</script>

<template>
  <div
    v-if="selectedBot"
    class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[3px]"
  >
    <div class="w-[400px] rounded-lg bg-[#2a2a2a] p-6 text-white">
      <h2 class="mb-4 text-center text-2xl font-bold">Modificar Bot</h2>
      <form @submit.prevent="saveBotChanges">
        <div class="mb-4">
          <label for="bot-name" class="block text-sm font-semibold">Nombre</label>
          <input
            id="bot-name"
            v-model="selectedBot.name"
            type="text"
            class="w-full rounded-lg bg-[#4e4e4e] p-2 text-white"
          />
        </div>
        <div class="mb-4">
          <label for="bot-description" class="block text-sm font-semibold">Descripción</label>
          <input
            id="bot-description"
            v-model="selectedBot.description"
            type="text"
            class="w-full rounded-lg bg-[#4e4e4e] p-2 text-white"
          />
        </div>
        <div class="mb-4">
          <label for="bot-image" class="block text-sm font-semibold">URL de la Imagen</label>
          <input
            id="bot-image"
            v-model="selectedBot.urlImage"
            type="text"
            class="w-full rounded-lg bg-[#4e4e4e] p-2 text-white"
          />
        </div>
        <div class="flex justify-center gap-4">
          <button
            type="button"
            class="rounded-lg bg-gray-500 px-4 py-2 text-white"
            @click="closeEditMenu"
          >
            Cancelar
          </button>
          <button type="submit" class="rounded-lg bg-[#06f] px-4 py-2 text-white">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>
