import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/index.scss";
import Typography from "@/components/common/Typography.vue";
import Button from "@/components/common/Button.vue";
import { ins } from "@/lib/axios";

const app = createApp(App);

app.config.globalProperties.axios = ins;

app.use(router);
app.use(store);
app.component("TextFont", Typography);
app.component("CustomButton", Button);

app.mount("#app");
