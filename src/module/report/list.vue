<template>
    <div>
        <date-el v-on:dateBack="changeList"></date-el>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人周报" name="weekly"></el-tab-pane>
            <el-tab-pane label="小组总结" name="summary"></el-tab-pane>
        </el-tabs>
        <el-dropdown class="list-btn_left"
            trigger="click"
            @command="getGroupList">
            <el-button type="primary" size="small">
                筛选<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="(item, index) in group"
                    :command="item._id"
                    :key="index">
                    {{item.teamName}}
                </el-dropdown-item>
                <el-dropdown-item
                    command="all">
                    所有
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="list-write">
            <a href="javsscript:;" @click="goWeeklyConfig" v-if="isAdmin">设置</a>
            <el-button @click="creatWeekly" v-if="write">{{activeName == 'summary' ? '写总结' : '写周报'}}</el-button>
        </div>
        <div class="list-list">
            <report-entry v-for="item in list" :reportData="item | reportFilter" :key="item.id"></report-entry>
        </div>
        <div class="list-nowrite" v-if="notWritten.length > 0">
            <p class="list-nowrite-title">
                <i class="el-icon-warning"></i>
                {{notWritten.length}} 位成员还未写周报
            </p>
            <el-button v-for="(item, index) in notWritten"
                plain
                class="list-nowrite-item"
                :key="index"
                size="mini"
                type="info">{{memberMap[item].nickName}}
            </el-button>
        </div>
    </div>
</template>
<script>
import {
    getReportList,
    getReportByGroup
} from '@/api/report'
import {
    Tabs,
    TabPane,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from 'element-ui'
import dateFormate from './common/index'
import dateEl from './common/date'
import reportEntry from 'module/components/report/entry'

export default {
    name: 'reportList',
    data() {
        return {
            activeName: 'weekly',
            list: [],
            isAdmin: false,
            obj: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            },
            loading: true,
            group: [],
            memberMap: {},
            notWritten: []
        }
    },
    components: {
        dateEl,
        reportEntry,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane,
        'el-dropdown': Dropdown,
        'el-dropdown-menu': DropdownMenu,
        'el-dropdown-item': DropdownItem
    },
    filters: {
        reportFilter(item) {
            return {
                head: item.phote,
                name: item.userId.nickName,
                date: dateFormate.format(item.createTime),
                content: item.content
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.initData()
        }
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        tarUserId() {
            return this.$route.query.id || ''
        },
        write() {
            return !(this.activeName === 'summary' && !this.isAdmin)
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getReportList({
                beginDate: this.beginDate,
                type: this.activeName
            }).then((res) => {
                this.isAdmin = res.isAdmin
                this.list = res.list
                this.group = res.teamGroup
                this.memberMap = res.memberMap
                this.notWritten = res.notWritten
                this.loading = false
            }).catch(error => {
                console.log(error.error)
            })
        },
        getGroupList(teamId) {
            if (teamId === 'all') {
                this.initData()
                return
            }
            getReportByGroup({
                beginDate: this.beginDate,
                type: this.activeName,
                groupId: teamId
            }).then((res) => {
                this.list = res.list
                this.memberMap = res.memberMap
                this.notWritten = res.notWritten
            }).catch(error => {
                console.log(error.error)
            })
        },
        creatWeekly() {
            this.$router.push({
                name: 'reportDetail',
                query: {
                    beginDate: Date.parse(this.beginDate),
                    type: this.activeName
                }
            })
        },
        changeList(val) {
            this.$router.push({
                name: 'reportList',
                query: {
                    beginDate: val,
                    id: this.tarUserId
                }
            })
        },
        goWeeklyConfig() {
            this.$router.push({
                name: 'reportConfig',
                query: {
                    type: this.activeName
                }
            })
        },
        handleClick(tab, event) {
            this.initData()
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../assets/style/base.scss';
.list-hd {
    text-align: center;
    padding-top: 15px;
}

.list-hd-pic {
    width: 50px;
}

.list-bd {
    ol li {
        list-style-position: inside;
    }
    img {
        max-width: 80%;
        height: auto;
    }
}

.list {
    padding: 10px 0;
}

.list-content::after {
    content: " ";
    position: absolute;
    box-sizing: content-box;
    width: 95%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    margin: 0 auto;
    background-color: $colorLine;
}

.list-write {
    position: absolute;
    right: 10px;
    top: 50px;
}

.list-btn_left {
    position: absolute;
    left: 10px;
    top: 50px;
}

.list-nowrite {
    padding-top: 20px;
}

.list-nowrite-title {
    font-size: 16px;
    margin-bottom: 10px;
    color: #999;
}

.list-nowrite-item {
    height: 40px;
    border-radius: 20px;
    margin: 4px;
}

</style>
