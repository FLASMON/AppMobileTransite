import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antdv from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./routes/router.js";
import './Icons/icons.js'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(Antdv)
app.use(router)
app.mount("#app")
