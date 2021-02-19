import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicInfo from '../views/BasicInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BasicInfo',
    component: BasicInfo
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('../views/Question.vue')
  },
  {
    path: '/remarks',
    name: 'Remarks',
    component: () => import('../views/Remarks.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
