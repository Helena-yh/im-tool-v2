import CustomLogin from './components/CustomLogin'
import AdminLogin from './components/AdminLogin'

export default {
    routes: [
        {
            path: '/:groupId/:id', 
            name: 'customLogin', 
            component: CustomLogin
        },
        { 
            path: '/rongadmin', 
            name: 'adminLogin', 
            component: AdminLogin
        }
    ]
}
