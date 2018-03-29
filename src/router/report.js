const reportList = () => import(/* webpackChunkName: 'report_list' */ '../module/report/list')
const reportDetail = () => import(/* webpackChunkName: 'report_detail' */ '../module/report/add')
const reportConfig = () => import(/* webpackChunkName: 'report_config' */ '../module/report/config')
const teamInfo = () => import(/* webpackChunkName: 'team_info' */ '../module/report/teamInfo')
const App = () => import(/* webpackChunkName: 'index' */ '../module/index')

export default [{
    path: '/page',
    component: App,
    children: [{
        path: 'reportList',
        component: reportList,
        name: 'reportList',
        meta: {
            title: '汇报'
        }
    }, {
        path: 'reportDetail',
        component: reportDetail,
        name: 'reportDetail',
        meta: {
            title: '汇报详情'
        }
    }, {
        path: 'reportConfig',
        component: reportConfig,
        name: 'reportConfig',
        meta: {
            title: '汇报设置'
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
