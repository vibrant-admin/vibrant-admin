import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// 主题样式加载
import '@/assets/styles/theme.scss'

// UnoCSS
import 'virtual:uno.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
