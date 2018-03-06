const teamList = () => import(/* webpackChunkName: 'team_list' */ '../module/team/list')
const teamJoin = () => import(/* webpackChunkName: 'team_join' */ '../module/team/join')
const teamTree = () => import(/* webpackChunkName: 'team_tree' */ '../module/team/tree')
const teamDashBoard = () => import(/* webpackChunkName: 'team_dashboard' */ '../module/team/dashboard')
const App = () => import(/* webpackChunkName: 'index' */ '../module/index')

export default [{
    path: '/page',
    component: App,
    children: [{
        path: 'teamList',
        component: teamList,
        name: 'teamList',
        meta: {
            title: '团队成员'
        }
    }, {
        path: 'teamManage',
        component: teamTree,
        name: 'teamTree',
        meta: {
            title: 'teamTree',
            inDefault: true
        }
    }, {
        path: 'teamJoin',
        component: teamJoin,
        name: 'teamJoin',
        meta: {
            title: '添加成员'
        }
    }, {
        path: 'teamDashBoard',
        component: teamDashBoard,
        name: 'teamDashBoard',
        meta: {
            title: '主管面板'
        }
    }]
}]
