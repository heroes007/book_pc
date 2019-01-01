import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-2中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/login/login.vue')
}

export const page404 = {
  path: '*',
  name: 'error_404',
  meta: {
    title: 'NOT FOUND',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/error-page/404.vue')
}
export const page401 = {
  path: '/401',
  name: 'error_401',
  meta: {
    title: '无权限',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/error-page/401.vue')
}
export const page500 = {
  path: '/500',
  name: 'error_500',
  meta: {
    title: '服务器故障',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/error-page/500.vue')
}
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'main',
  redirect: '/home',
  title: '首页',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true,
    title: "首页"
  },
  children: [{
    path: 'home',
    name: 'home',
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '首页'
    },
    component: () =>
      import ('@/view/single-page/home')
  }]
}
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '导航',
      isMenu: true
    },
    component: Main,
    children: [{
      path: 'update_table_page',
      name: 'update_table_page',
      meta: {
        icon: 'md-cloud-upload',
        title: 'Welcome',
        access: [1]
      },
      component: () =>
        import ('@/view/join-page.vue')
    }]
  },
  {
    path: '/menu',
    name: 'MENU',
    meta: {
      icon: 'md-trending-up',
      title: '菜单',
      isMenu: true
    },
    component: Main,
    children: [
        {
          path: 'book',
          name: 'Book',
          meta:{
            icon:'',
            title:'图书',
          },
          component: parentView,
          children: [{
              path:'show-book',
              name: 'ShowBook',
              meta:{
                  icon:'',
                  title:'图书列表',
              },
              component: () => import('@/view/multilevel/Book/ShowBook/index.vue'),
            },
              {
              path:'add-book',
              name: 'AddBook',
              meta:{
                  icon:'',
                  title:'添加图书',
              },
              component: () => import('@/view/multilevel/Book/AddBook/index.vue'),
          },]
        },
        {
            path: 'category',
            name: 'Category',
            meta:{
                icon:'',
                title:'分类',
            },
            component: parentView,
            children: [{
                path:'show-category',
                name: 'ShowCategory',
                meta:{
                    icon:'',
                    title:'分类列表',
                },
                component: () => import('@/view/multilevel/Category/ShowCategory/index.vue'),
            },
            {
                path:'add-category',
                name: 'AddCategory',
                meta:{
                    icon:'',
                    title:'添加分类',
                },
                component: () => import('@/view/multilevel/Category/AddCategory/index.vue'),
            },]
        },
        {
            path: 'form',
            name: 'Form',
            meta:{
                icon:  '',
                title: '统计图'
            },
            component: () => import('@/view/multilevel/Form/ShowForm')
        }
    ]
  },
]
export default [
  loginRouter,
  otherRouter,
  ...appRouter,
  page500,
  page401,
  page404
];