
import {createRouter, createWebHistory} from  'vue-router';

import HomeView from '@/views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component:HomeView,
        },
        {
            path:'/accounts/signup',
            name: 'Signup',
            component: SignUpView,
        },
        // {
        //     path:'/accounts/signin',
        //     name: 'Signin',
        //     component: SignInView,
        // },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
     ],
})

export default router;