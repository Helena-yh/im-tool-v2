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
            path: '/rongAdmin', 
            name: 'adminLogin', 
            component: AdminLogin
        }
    ]
}
