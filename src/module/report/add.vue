<template>
    <div>
        <date-el v-on:dateBack="changeDetail">
            <p slot="header" class="add-des">{{des}}</p>
        </date-el>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人周报" name="weekly"></el-tab-pane>
            <el-tab-pane label="小组总结" name="summary" v-if="isAdmin"></el-tab-pane>
        </el-tabs>
        <div class="add-box">
            <markdown-editor v-if="isEdit" v-model="obj.content" ref="markdownEditor" :configs="configs"></markdown-editor>
            <report-entry v-else :reportData="previewDate | reportFilter" :key="obj.id"></report-entry>
        </div>
        <el-button class="add-btn" @click="btnActive(activeName)">{{btnText}}</el-button>
        <a href="javascript:;" class="add-link" @click="back()">返回列表</a>
    </div>
</template>
<script>
import {
    Tabs,
    TabPane
} from 'element-ui'
import dateFormate from './common/index'
import dateEl from './common/date'
import {
    getReportDetail,
    saveReportDetail
} from '@/api/report'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import reportEntry from 'module/components/report/entry'
export default {
    name: 'weekly',
    data() {
        return {
            configs: {
                status: false, // 禁用底部状态栏
                spellChecker: false // 禁用拼写检查
            },
            obj: {
                content: '',
                type: this.$route.query.type
            },
            user: {},
            isAdmin: false,
            isEdit: true,
            activeName: this.$route.query.type
        }
    },
    components: {
        dateEl,
        reportEntry,
        markdownEditor,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        btnText() {
            return this.isEdit ? '保存' : '编辑'
        },
        des() {
            return this.activeName === 'summary' ? '本周小组总结' : '本周周报'
        },
        previewDate() {
            return Object.assign(this.user, this.obj)
        }
    },
    filters: {
        reportFilter(obj) {
            return {
                head: obj.phote,
                name: obj.nickName,
                date: dateFormate.format(obj.createTime),
                content: obj.content
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.initData()
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getReportDetail({
                beginDate: this.beginDate,
                type: this.activeName
            }).then((res) => {
                this.user = res.user
                this.obj = res.detail
                this.isAdmin = res.isAdmin
            }).catch(error => {
                console.log(error.error)
            })
        },
        btnActive() {
            if (!this.isEdit) {
                this.isEdit = !this.isEdit
                return
            }
            Object.assign(this.obj, {
                beginDate: this.beginDate,
                type: this.activeName
            })
            saveReportDetail(this.obj).then((res) => {
                this.isEdit = false
            }).catch(error => {
                console.log(error.error)
            })
        },
        changeDetail(val) {
            this.$router.push({
                name: 'reportDetail',
                query: {
                    beginDate: val,
                    type: this.activeName
                }
            })
        },
        back() {
            this.$router.push({
                name: 'reportList',
                query: {
                    beginDate: Date.parse(this.beginDate)
                }
            })
        },
        handleClick(tab, val) {
            this.initData()
        }
    }
}

</script>
<style lang="scss">
@import '../../assets/style/base.scss';
@import 'simplemde/dist/simplemde.min.css';
.add-box {
    margin-bottom: 20px;
    min-height: 370px;
}

.add-des {
    font-size: $fontSizeLevel3;
}

/deep/ .report-entry {
    border-bottom: 0;
}

</style>
