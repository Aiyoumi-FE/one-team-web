const home = () => import(/* webpackChunkName: 'home' */ '../module/home/index')
const refuse = () => import(/* webpackChunkName: 'refuse' */ '../module/common/refuse')
const App = () => import(/* webpackChunkName: 'index' */ '../module/index')

export default [{
    path: '/',
    redirect: '/page/home'
}, {
    path: '/page',
    component: App,
    children: [{
        path: 'home',
        name: 'home',
        component: home,
        meta: {
            title: '首页',
            throwContent: true
        }
    }, {
        path: 'refuse',
        name: 'refuse',
        component: refuse,
        meta: {
            title: '未加入团队'
        }
    }]
}]
