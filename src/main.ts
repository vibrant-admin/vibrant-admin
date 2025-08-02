import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// UnoCSS
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import '@/assets/styles/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
