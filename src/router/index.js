import { createRouter, createWebHistory } from 'vue-router'

// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/contact',
            component: () => import('../views/Contact.vue')
        }
    ]
})

// // 监控路由
// router.beforeEach((to, from, next) => {
//     if (to.matched.length === 0) {  // 未匹配到路由
//         next('/404');
//     } else { // 匹配到路由
//         // 修改页面title
//         let page_title = '';
//         try {
//             page_title = to.meta.title;
//         }catch (e) {
//             page_title = '（没有配置meta.title名）';
//         }
//         if (page_title) {
//             document.title = page_title + " - " + config.title;
//         }else{
//             document.title = config.title;
//         }
//         next();
//     }
// });



export default router