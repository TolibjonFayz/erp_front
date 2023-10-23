import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugins from "./plugins/vee-validate";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App);
import "vue3-tel-input/dist/vue3-tel-input.css";

import VueTheMask from "vue-the-mask";

app.use(createPinia());
app.use(VueTheMask);
app.use(router);
app.use(veeValidatePlugins);
app.use(ElementPlus);
app.mount("#app");
