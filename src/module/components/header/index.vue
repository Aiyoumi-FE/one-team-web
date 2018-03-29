<template>
    <div class="headerWrapper">
        <div class="nav">
            <div class="nav-logo">
                <img class="nav-notice" src="./image/logo.png" alt="">
            </div>
            <el-menu :default-active="'home'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="home">面板</el-menu-item>
                <el-menu-item index="report">汇报</el-menu-item>
                <el-menu-item index="team">团队</el-menu-item>
                <el-menu-item index="notice" class="nav-notice">
                    <img src="../../../assets/icon/notice.png" alt="">
                </el-menu-item>
                <el-submenu index="center">
                    <template slot="title">我的头像</template>
                    <el-menu-item index="personalCenter">个人中心</el-menu-item>
                    <el-menu-item index="settings">账户设置</el-menu-item>
                    <el-menu-item index="signout">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>
<script>
import {
    signOut
} from '@/store/user'
import {
    Menu,
    Submenu,
    MenuItem
} from 'element-ui'
import { cookie } from '@/assets/js/cookie'
export default {
    name: 'headerbar',
    data() {
        return {
            routerLink: {
                home: 'teamDashBoard',
                report: 'reportList',
                team: 'teamList',
                personalCenter: 'personalCenter',
                settings: 'settings'
            }
        }
    },
    components: {
        'el-menu': Menu,
        'el-submenu': Submenu,
        'el-menu-item': MenuItem
    },
    methods: {
        handleSelect(key, keyPath) {
            if (key === 'signout') {
                this.submitSignout()
            } else {
                let nameLink = this.routerLink[key]
                if (nameLink) {
                    this.$router.push({
                        name: nameLink
                    })
                }
            }
        },
        submitSignout() {
            signOut().then((res) => {
                localStorage.removeItem('token')
                cookie.clear('team', '/')
                cookie.clear('name', '/')
                this.$router.replace({
                    name: 'login'
                })
            }).catch(error => {
                console.log(error.error)
            })
        }
    }
}

</script>
<style lang="scss" scoped>
.headerWrapper {
    background-color: #fff;
}

.nav {
    width: 960px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
}

.el-menu-demo {
    display: flex;
    border: 0;
}

.nav-notice {
    padding-right: 0px;
    img {
        width: 20px;
    }
}

.nav-logo img {
    width: 120px;
}

</style>
