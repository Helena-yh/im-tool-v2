
// import Vue from 'vue'
// import Router from 'vue-router'

//组件模块
import CustomLogin from './components/CustomLogin'
import AdminLogin from './components/AdminLogin'
// Vue.use(Router)

// export default new Router({
//     routes: [
//         {
//             path: '/', name: 'login', 
//             component: Login, 
//             params: {
//                 role: "custom"
//             }
//         },
//         { 
//             path: '/rongAdmin', 
//             name: 'login', 
//             component: Login,
//             params: {
//                 role: "admin"
//             }
//         }

//     ]
// })
export default {
    routes: [
        {
            path: '/:groupId/:id', 
            name: 'customLogin', 
            component: CustomLogin
        },
        { 
            path: '/rongAdmin', 
            name: 'adminLogin', 
            component: AdminLogin
        }
    ]
}
