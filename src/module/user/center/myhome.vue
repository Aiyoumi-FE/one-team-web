<template>
    <div class="page_center">
        <div class="area_info">
            <div class="part_photo">
                <img :src="photoSrc" alt="">
            </div>
            <div class="part_info">
                <p class="user_name">{{userInfo.nickName}}</p>
                <p>{{userLink}}</p>
                <p>{{userInfo.desc}}</p>
            </div>
        </div>
        <div class="area_menu">
            <el-tabs v-model="activeName" @tab-click="chooseTab">
                <el-tab-pane label="周报" name="report">
                    <report-list :userId="userId"></report-list>
                </el-tab-pane>
                <el-tab-pane label="关注" name="focus" >
                    <focus-list :focusList="focusList"></focus-list>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import reportList from './common/reportlist'
import focusList from './common/focuslist'
// import {
//     getUsrInfo
// } from '@/api/home'
import {
    getRecordList
} from '@/api/subscript'
import {
    Tabs,
    TabPane
} from 'element-ui'
export default {
    name: 'myhome',
    data() {
        return {
            photoSrc: require('../image/leader.png'),
            userInfo: {

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
            if (this.userInfo.eMail && this.userInfo.phone) {
                return this.userInfo.eMail + '/' + this.userInfo.phone
            } else {
                return this.userInfo.eMail || this.userInfo.phone
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
        this.getFocusList()
    },
    methods: {
        initUserInfo() {
            // getUsrInfo().then((res) => {
            //     Object.assign(this.userInfo, res.result)
            // })
        },
        getFocusList() {
            getRecordList().then((res) => {
                if (res.success) {
                    this.focusList = res.result
                }
            })
        },
        chooseTab(tab, event) {
            console.log(tab, event)
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    user-select: none;
}
.page_center {
    max-width: 960px;
    margin: 40px auto 0;
    .area_info {
        height: 120px;
        padding: 20px;
        display: flex;
        .part_photo {
            width: 90px;
            height: 80px;
            img {
                height: 80px;
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
}
.area_menu {
    height: 40px;
    padding: 0 35px;
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
</style>
