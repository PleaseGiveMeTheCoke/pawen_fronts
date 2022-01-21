import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth 信息）
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */'@/views/register/register')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // 直接给某个路由设置，这时内部的子路由都需要认证（包含当前路由）
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/file',
        name: 'file',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/file/index')
      },
      {
        path: '/cut',
        name: 'cut',
        component: () => import(/* webpackChunkName: 'cut' */'@/views/cut/index'),
        children:[
          {
            path: '/chooseFile',
            name: 'chooseFile',
            component: () => import(/* webpackChunkName: 'chooseFile' */'@/views/cut/chooseFile')
          },
          {
            path: '/addTag',
            name: 'addTag',
            component: () => import(/* webpackChunkName: 'addTag' */'@/views/cut/addTag')
          },
          {
            path: '/sign',
            name: 'sign',
            component: () => import(/* webpackChunkName: 'sign' */'@/views/cut/sign')
          }
        ]
      },
      {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: 'search' */'@/views/search/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      {
        path: '/file/add',
        name: 'file-add',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/file/add'),
        
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证 Vuex 的 store 中的登录用户信息是否存储
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({
        name: 'login',
        query: {
          // 将本次路由的 fullPath 传递给 login 页面
          redirect: to.fullPath
        }
      })
    }
    // 已经登录，允许通过
    next()
  } else {
    next()
  }
})

export default router
