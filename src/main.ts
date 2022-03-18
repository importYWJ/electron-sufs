import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { globalRegister } from "@/global";
import { setupStore } from "@/store";
import "@/assets/css/index.css";
// import "@arcgis/core/assets/esri/css/main.css";

setupStore();
createApp(App).use(globalRegister).use(store).use(router).mount("#app");
