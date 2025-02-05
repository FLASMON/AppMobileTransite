import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antdv from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./routes/router.js";
import './Icons/icons.js'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import { createI18n } from "vue-i18n";

import fr from './locales/fr.json';
import en from './locales/en.json';
import LocalStorageService from "@/utils/localstorageService.js";

const storedLang = LocalStorageService.getItem('langue_transapp') || 'fr';
const messages = {
    en,
    fr
};
const i18n = createI18n({
    legacy: false,
    locale: storedLang,
    messages
});

console.log('Messages disponibles:', messages)
console.log('Langue actuelle:', storedLang)

console.log('App starting...');
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(Antdv)
app.use(router)
app.use(PerfectScrollbarPlugin)
app.use(i18n)
app.mount("#app")
console.log('App mounted');