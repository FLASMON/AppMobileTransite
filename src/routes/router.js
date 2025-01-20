import { createRouter, createWebHistory } from 'vue-router';
import Dossier from "../views/Dossier.vue";
import Suivi from "../views/Suivi.vue";
import Camera from "../views/Camera.vue";
import Main from "../components/Main.vue";
import Navire from "../views/Navire.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import Login from "../views/Login.vue";

const routes = [
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/',
      component: Main,
      name: 'Main',
    },
    {
      path: '/navire',
      name: "Navire",
      meta: { key: 'Navire' },
      component: Navire,
    },
    {
      path: '/dossier',
      name: 'Dossier',
      meta: { key: 'Dossier' },
      component: Dossier,
    },
    {
      path: '/suivi',
      name: 'Suivi',
      meta: { key: 'Suivi' },
      component: Suivi,
    },
    {
      path: '/camera',
      name: 'Camera',
      meta: { key: 'Camera' },
      component: Camera,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
