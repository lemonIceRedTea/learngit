import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
import Ratings from '@/components/Ratings'
import Merchant from '@/components/Merchant'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Goods
  },
  {
    path: '/goods',
    name: 'Goods',
    redirect: '/'
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: Ratings
  },
  {
    path: '/merchant',
    name: 'Merchant',
    component: Merchant
  }
  ]
})
