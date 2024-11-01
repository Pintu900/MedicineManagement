import { createRouter, createWebHistory } from 'vue-router';
import Batch from './components/Batch.vue';
import BatchInsert from './components/BatchInsert.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Batch,
    },
    {
      path: '/insert',
      name: 'insert',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BatchInsert,
    },
    {
      path: '/medlist',
      name: 'medlist',
      component: () => import('./components/MedList.vue'),
    },
    {
      path: '/medinsert',
      name: 'medinsert',
      component: () => import('./components/MedInsert.vue'),
    },
  ],
});

export default router;
