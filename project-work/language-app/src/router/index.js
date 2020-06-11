import Vue from 'vue'
import VueRouter from 'vue-router'
import Vocabulary from '../views/Vocabulary.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Vocabulary
  },
  {
    path: '/Vocabulary',
    name: 'Vocabulary',
    component: Vocabulary
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
