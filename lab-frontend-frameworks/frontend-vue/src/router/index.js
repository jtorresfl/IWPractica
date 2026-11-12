import { createRouter, createWebHistory } from "vue-router";

import CursosView from "../views/CursosView.vue";
import FormCursoView from "../views/FormCursoView.vue";

const routes = [
    { path: "/", component: CursosView },
    { path: "/nuevo", component: FormCursoView },
    { path: "/editar/:id", component: FormCursoView }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
