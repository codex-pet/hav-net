import { createRouter, createWebHistory } from 'vue-router'
import DahsboardView from '../views/DahsboardView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DahsboardView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router