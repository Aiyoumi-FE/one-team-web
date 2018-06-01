<template>
    <div>
        <date-el v-on:dateBack="changeList"></date-el>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人周报" name="weekly"></el-tab-pane>
            <el-tab-pane label="小组总结" name="summary"></el-tab-pane>
        </el-tabs>
        <div class="list-write">
            <a href="javsscript:;" @click="goWeeklyConfig" v-if="isAdmin">设置</a>
            <el-button @click="creatWeekly" v-if="write">{{activeName == 'summary' ? '写总结' : '写周报'}}</el-button>
        </div>
        <div class="list-list">
            <report-entry v-for="item in list" :reportData="item | reportFilter" :key="item.id"></report-entry>
        </div>
    </div>
</template>
<script>
import {
    getReportList
} from '@/api/report'
import {
    Tabs,
    TabPane
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
            loading: true
        }
    },
    components: {
        dateEl,
        reportEntry,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane
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
                this.loading = false
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

</style>
