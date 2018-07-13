<template>
    <div>
        <div class="area_info">
            <div class="part_photo">
                <img :src="userInfo.headPortrait" alt="">
            </div>
            <div class="part_info">
                <p class="user_name">{{userInfo.nickName}}</p>
                <p>{{userLink}}</p>
                <p>{{userInfo.userDesc}}</p>
            </div>
        </div>
        <div class="area_menu">
            <el-tabs v-model="activeName" @tab-click="chooseTab">
                <el-tab-pane label="周报" name="report">
                    <report-list :userId="userId"></report-list>
                </el-tab-pane>
                <el-tab-pane label="关注" name="focus" >
                    <focus-list></focus-list>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import reportList from './common/reportlist'
import focusList from './common/focuslist'
import {
    getUsrInfo
} from '@/api/user'
import {
    Tabs,
    TabPane
} from 'element-ui'
export default {
    name: 'myhome',
    data() {
        return {
            userInfo: {
                headPortrait: require('../image/leader.png'),
                eMail: '',
                nickName: '',
                phoneNumber: '15268175233',
                userDesc: ''
            },
            menuList: [{
                label: '周报',
                param: 'report'
            }, {
                label: '关注',
                param: 'focus'
            }],
            userId: '',
            teamId: '',
            showType: 'focus',
            focusList: [],
            activeName: 'report'
        }
    },
    computed: {
        targetUid() {
            return this.$route.query.id
        },
        userLink() {
            if (this.userInfo.eMail && this.userInfo.phoneNumber) {
                return this.userInfo.phoneNumber + '/' + this.userInfo.eMail
            } else {
                return this.userInfo.eMail || this.userInfo.phoneNumber
            }
        },
        currentUid() {
            return localStorage.getItem('uid') || ''
        }
    },
    components: {
        reportList,
        focusList,
        elTabs: Tabs,
        elTabPane: TabPane
    },
    mounted() {
        this.initUserInfo()
    },
    methods: {
        initUserInfo() {
            getUsrInfo().then((res) => {
                Object.assign(this.userInfo, res)
            }).catch(error => {
                console.log(error.error)
            })
        },
        chooseTab(tab, event) {
            // console.log(tab, event)
        }
    }
}
</script>
<style lang="scss" scoped>
.area_info {
    height: 120px;
    padding: 20px;
    display: flex;
    .part_photo {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        overflow: hidden;
        margin-right: 15px;
        img {
            width: 100%;
        }
    }
    .part_info {
        padding-top: 5px;
        .user_name {
            font-size: 20px;
            font-weight: bold;
        }
    }
}
.area_menu {
    height: 40px;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 2px;
        background-color: rgb(228, 231, 237);
        z-index: 1;
    }
    &:after {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: rgb(228, 231, 237);
        z-index: 1;
    }
}
/deep/ .el-tabs__header {
    padding: 0 30px;
}
</style>
