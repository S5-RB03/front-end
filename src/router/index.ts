import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import { useKeycloakStore } from '@/stores/keycloakStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const keycloakStore = useKeycloakStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (keycloakStore.getKeycloak.authenticated) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})

export default router