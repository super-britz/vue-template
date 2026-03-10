import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import './types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: '首页', icon: 'HomeFilled' },
        },
        {
          path: 'system',
          name: 'System',
          meta: { title: '系统管理', icon: 'Setting', authorities: ['supplier:info'] },
          children: [
            {
              path: 'user',
              name: 'SystemUser',
              component: () => import('@/views/HomeView.vue'),
              meta: { title: '用户管理', authorities: ['supplier:account'] },
            },
            {
              path: 'role',
              name: 'SystemRole',
              component: () => import('@/views/HomeView.vue'),
              meta: { title: '角色管理', authorities: ['supplier:account'] },
            },
          ],
        },
      ],
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: () => import('@/views/ForbiddenView.vue'),
      meta: { hidden: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { hidden: true },
    },
  ],
})

export default router
