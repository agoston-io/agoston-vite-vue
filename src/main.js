import { createApp } from 'vue'
import './style.css'
import getRouter from './router'
import App from './App.vue'

const app = createApp(App)
app.use(getRouter({
    isDown: false,
    isInMaintenance: false,
    isSessionAuthenticated: false,
}));
app.mount('#app')