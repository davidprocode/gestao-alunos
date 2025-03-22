import { createRouter, createWebHistory } from 'vue-router';
import Alunos from '../views/Alunos.vue';
import Aulas from '../views/Aulas.vue';
import Relatorios from '../views/Relatorios.vue';

const routes = [
  { path: '/', redirect: '/alunos' },
  { path: '/alunos', name: 'Alunos', component: Alunos },
  { path: '/aulas', name: 'Aulas', component: Aulas },
  { path: '/relatorios', name: 'Relatorios', component: Relatorios },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;