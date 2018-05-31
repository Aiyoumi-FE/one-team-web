import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './config'
import { cookie } from '@/assets/js/cookie'
import jwt from 'jsonwebtoken'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: routerConfig,
    linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'one team'

    if (process.env.NODE_ENV === 'production') {
        let token = cookie.get('token')
        const secret = 'jwt one'
        let decoded = null

        if (token) {
            decoded = jwt.verify(token, secret, function(err, decoded) {
                return err || decoded
            })
        }

        if (decoded) {
            if (decoded.exp - Date.now() < 0) { // 已过期
                cookie.clear('token', '/')
                cookie.clear('name', '/')
            } else {
                decoded.exp = Date.now() + 60 * 60 * 1000
                token = jwt.sign(decoded, secret)
                cookie.set('token', token, decoded.exp, '/')
            }
        }

        if (to.path === '/') {
            if (token) {
                next('/page/home')
            } else {
                next('/page/user/login')
            }
        } else {
            if (token) {
                Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
            }

            next()
        }
    } else {
        next()
    }
})

export default router
