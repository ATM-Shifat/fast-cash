
import {createRouter, createWebHistory} from  'vue-router';

import HomeView from '@/views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import SignInView from '@/views/SignInView.vue';
import DashBoardView from '@/views/DashBoardView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component:HomeView,
        },
        {
            path:'/accounts/signup',
            name: 'sign-up',
            component: SignUpView,
        },
        {
            path:'/accounts/signin',
            name: 'sign-in',
            component: SignInView,
        },
        {
            path: '/accounts/:id/dashboard',
            name: 'dash-board',
            component: DashBoardView,

        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
     ],
})

export default router;