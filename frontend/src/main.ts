import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/index.scss";
import Typography from "@/components/common/custom/CustomFont.vue";
import CustomButton from "@/components/common/custom/CustomButton.vue";
import { ins } from "@/lib/axios";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import DialogModal from "@/components/common/modal/DialogModal.vue";
import InfiniteLoading from "infinite-loading-vue3-ts";

const app = createApp(App);
app.config.globalProperties.axios = ins;

app.use(router);
app.use(store);
app.component("infinite-loading", InfiniteLoading);
app.component("TextFont", Typography);
app.component("CustomButton", CustomButton);
app.component("LoadingSpinner", LoadingSpinner);
app.component("DialogModal", DialogModal);

app.mount("#app");
