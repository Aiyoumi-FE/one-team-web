// import home from './home'
// import user from './user'
// import weekly from './weekly'
// import team from './team'

const page = resolve => require(['../module/index'], resolve)
const testRouter = [{
    path: '/page',
    component: page,
    meta: {
        title: '测试'
    }
}]

export default [
    // ...home,
    // ...user,
    // ...weekly,
    // ...team
    ...testRouter
]
