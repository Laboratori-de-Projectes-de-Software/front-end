import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())

import { useAuthStore } from './store'
const authStore = useAuthStore()
authStore.restoreSession()

app.mount('#app')
