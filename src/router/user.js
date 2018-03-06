const user = () => import(/* webpackChunkName: 'user_index' */ '../module/user/login/index')
const login = () => import(/* webpackChunkName: 'user_login' */ '../module/user/login/login')
const register = () => import(/* webpackChunkName: 'user_register' */ '../module/user/login/register')
const settings = () => import(/* webpackChunkName: 'user_settings' */ '../module/user/settings/index')
const mysub = () => import(/* webpackChunkName: 'user_mysub' */ '../module/user/subscript/index')
const myhome = () => import(/* webpackChunkName: 'user_myhome' */ '../module/user/center/myhome')
const App = () => import(/* webpackChunkName: 'index' */ '../module/index')

export default [{
    path: '/page',
    component: App,
    children: [{
        path: 'user',
        component: user,
        children: [{
            path: 'login',
            name: 'login',
            component: login,
            meta: {
                title: '登录',
                throwContent: true,
                throwHeader: true
            }
        }, {
            path: 'register',
            name: 'register',
            component: register,
            meta: {
                title: '注册',
                throwContent: true,
                throwHeader: true
            }
        }]
    }, {
        path: 'user/settings',
        name: 'settings',
        component: settings,
        meta: {
            title: '个人设置'
        }
    }, {
        path: 'user/mysub',
        name: 'mysub',
        component: mysub,
        meta: {
            title: '我的关注'
        }
    }, {
        path: 'user/center',
        name: 'personalCenter',
        component: myhome,
        meta: {
            title: '个人中心',
            throwContent: false
        }
    }]
}]
