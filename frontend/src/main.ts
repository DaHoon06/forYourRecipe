import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/index.scss'
import Typography from "@/components/common/Typography.vue";

const app = createApp(App)

app.use(router)
app.use(store)

app.component('TextFont', Typography)

app.mount('#app')
