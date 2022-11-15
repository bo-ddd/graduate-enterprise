import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import router from './router/index'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@/assets/css/main.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
