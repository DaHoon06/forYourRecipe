import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/index.scss";
import Typography from "@/components/common/CustomFont.vue";
import CustomButton from "@/components/common/CustomButton.vue";
import { ins } from "@/lib/axios";
import Spinner from "@/components/common/Spinner.vue";
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
app.component("LoadingSpinner", Spinner);

app.mount("#app");
