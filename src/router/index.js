import Vue from 'vue'
import VueRouter from 'vue-router'
import MyProfile from '../views/MyProfile.vue'
import MyTeam from '../views/MyTeam.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/team',
    name: 'MyTeam',
    component: MyTeam
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
