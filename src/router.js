// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // Other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
