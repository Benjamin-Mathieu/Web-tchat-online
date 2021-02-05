import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connexion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Connexion.vue')
  },
  {
    path: '/creer-compte',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreerCompte.vue')
  },
  {
    path: '/membres',
    component: () => import(/* webpackChunkName: "about" */ '../views/Membres.vue')
  },
  {
    path: '/conversation/:id',
    name: 'Conversation',
    component: () => import(/* webpackChunkName: "about" */ '../views/UneConversation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
