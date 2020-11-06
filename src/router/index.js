import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [    
    {
      path: '/',
      component: Layout,
      redirect: '/charts-demo',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        },
        {
          path: 'charts-demo',
          component: () => import('@/views/charts-demo/index'),
          name: 'Charts',
          meta: { title: 'Charts', icon: 'dashboard', affix: true }
        }
      ]
    },
  ]
})
