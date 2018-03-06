const weeklyList = () => import(/* webpackChunkName: 'weekly_list' */ '../module/weekly/list')
const weeklyDetail = () => import(/* webpackChunkName: 'weekly_detail' */ '../module/weekly/add')
const weeklyConfig = () => import(/* webpackChunkName: 'weekly_config' */ '../module/weekly/config')
const teamInfo = () => import(/* webpackChunkName: 'team_info' */ '../module/weekly/teamInfo')
const App = () => import(/* webpackChunkName: 'app' */ '../module/index')

export default [{
    path: '/page',
    component: App,
    children: [{
        path: 'weeklyList',
        component: weeklyList,
        name: 'weeklyList',
        meta: {
            title: '周报'
        }
    }, {
        path: 'weeklyDetail',
        component: weeklyDetail,
        name: 'weeklyDetail',
        meta: {
            title: '周报详情'
        }
    }, {
        path: 'weeklyConfig',
        component: weeklyConfig,
        name: 'weeklyConfig',
        meta: {
            title: '周报设置'
        }
    }, {
        path: 'teamInfo',
        component: teamInfo,
        name: 'teamInfo',
        meta: {
            title: 'teamInfo'
        }
    }]
}]
