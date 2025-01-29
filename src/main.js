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


// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('token_client');
//     console.log(!token)
//     console.log(to.name !== 'Login')
//     if (!token && to.name !== 'Login') {
//         next({ name: 'Login' });
//     } else {
//         next();
//     }
// });

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(Antdv)
app.use(router)
app.use(PerfectScrollbarPlugin)
app.mount("#app")
