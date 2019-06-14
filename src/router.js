import Vue from 'vue'
import Router from 'vue-router'

import IndexRoute from '@/index/route'
import EditRoute from '@/edit/route'
import AddRoute from '@/add/route'

Vue.use(Router)

const routesList = [].concat(
  IndexRoute,
  EditRoute,
  AddRoute
)

const router = new Router({
  mode: 'history',
  routes: routesList
})

export default router
