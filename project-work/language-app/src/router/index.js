import Vue from 'vue'
import VueRouter from 'vue-router'
import Vocabulary from '../views/Vocabulary.vue'
import VocabularyTraining from "../views/VocabularyTraining";
import Home from '../views/Home.vue'
import Exercises from "../views/Exercises";
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Vocabulary',
    name: 'Vocabulary',
    component: Vocabulary,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/VocabularyTraining',
    name: 'VocabularyTraining',
    component: VocabularyTraining,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Exercises',
    name: 'Exercises',
    component: Exercises,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getIsLoggedIn) {
      next()
      return
    }
    next('/home')
  } else {
    next()
  }
})

export default router

