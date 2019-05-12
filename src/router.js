import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        // {
        //   path: '/dashboard',
        //   name: 'dashboard',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        // },
        // {
        //   path: '/icons',
        //   name: 'icons',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        // },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        // {
        //   path: '/maps',
        //   name: 'maps',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        // },
        // {
        //   path: '/tables',
        //   name: 'tables',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        // },
        {
          path: '/client/createTask',
          name: 'Create Task',
          component: () => import('./views/CreateTask.vue')
        },
        {
          path: '/client/dashboard',
          name: 'Dashboard',
          component: () => import('./views/ClientDashboard.vue')
        },
        {
          path: 'client/manageTask',
          name: 'Manage Task',
          component: () => import('./views/ManageTask.vue')
        },
        {
          path: 'tester/dashboard',
          name: 'Dashboard',
          component: () => import("./views/TesterDashboard.vue")
        },
        {
          path: 'tester/tasks',
          name: 'Available Test Tasks',
          component: () => import("./views/TestTasks.vue")
        },
        {
          path: 'tester/answer',
          name: 'Answer Test Task',
          component: () => import("./views/AnswerTask.vue")
        },

      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        },
        {
          path: '/reset',
          name: 'reset',
          component: () => import('./views/ForgotPassEmail.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
      ]
    },
    { path: '*', redirect: '/login' },
  ]
})
