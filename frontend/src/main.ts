import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/index.scss'
import Typography from "@/components/common/Typography.vue";

const app = createApp(App)

app.component('font-typography',Typography)

app.use(store).use(router).mount('#app')
