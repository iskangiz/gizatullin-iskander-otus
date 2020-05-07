import Vue from 'vue'
import VueRouter from 'vue-router'
import FirstPage from '../components/FirstPage'
import SecondPage from '../components/SecondPage'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Settings',
        component: SecondPage
    },
    {
        path: '/play',
        name: 'Play',
        component: FirstPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
