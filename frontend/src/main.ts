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
import InfiniteLoading from "infinite-loading-vue3-ts";
import { useStore } from "vuex";

const app = createApp(App);

const vueStore = useStore();

app.config.globalProperties.axios = ins;
app.config.globalProperties.$store = vueStore;

app.use(router);
app.use(store);
app.component("infinite-loading", InfiniteLoading);
app.component("TextFont", Typography);
app.component("CustomButton", CustomButton);
app.component("LoadingSpinner", LoadingSpinner);

app.mount("#app");
