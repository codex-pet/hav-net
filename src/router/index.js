import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AboutView from '../views/AboutView.vue'
import LivedemoView from '@/views/LivedemoView.vue'
import HistoryView from '@/views/HistoryView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard', // This will be your home page
      component: DashboardView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/live-demo',
      name: 'live-demo',
      component: LivedemoView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router