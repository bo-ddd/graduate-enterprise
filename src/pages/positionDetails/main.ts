import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../positionDetails/App.vue'
import router from '../positionDetails/router/index'
import '@/assets/css/main.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
