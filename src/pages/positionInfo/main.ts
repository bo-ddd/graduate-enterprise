import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../positionInfo/App.vue'
import router from '../positionInfo/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/main.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
