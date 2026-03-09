import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './assets/main.css'
import router from './router'
import { setupRouterGuard } from './router/guard'

const app = createApp(App)

app.use(createPinia())
app.use(router)
setupRouterGuard(router)

app.mount('#app')
