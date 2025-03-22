import { createRouter, createWebHistory } from 'vue-router';
import Alunos from '../views/Alunos.vue';
import Relatorios from '../views/Relatorios.vue';

const routes = [
  { path: '/', name: 'Alunos', component: Alunos },
  { path: '/relatorios', name: 'Relatorios', component: Relatorios },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;