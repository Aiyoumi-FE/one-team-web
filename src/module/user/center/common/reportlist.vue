<template>
    <div>
        <date-el v-on:dateBack="changeList"></date-el>
        <div class="add-box">
            <markdown-editor v-if="isEdit" v-model="obj.content" ref="markdownEditor" :configs="configs"></markdown-editor>
            <report-entry v-else :reportData="previewDate | reportFilter" :key="obj.id"></report-entry>
        </div>
        <el-button class="add-btn" @click="btnActive()">{{btnText}}</el-button>
    </div>
</template>
<script>
import dateEl from 'module/report/common/date'
import reportEntry from 'module/components/report/entry'
import dateFormate from 'module/report/common/index'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import {
    getReportDetail,
    saveReportDetail
} from '@/api/report'

export default {
    name: 'reportDetail',
    props: {
        userId: {
            type: String
        },
        isSingle: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            beginDate: null,
            isEdit: false,
            user: {},
            obj: {
                content: '',
                type: this.$route.query.type
            },
            isAdmin: false,
            configs: {
                status: false, // 禁用底部状态栏
                spellChecker: false // 禁用拼写检查
            }
        }
    },
    components: {
        dateEl,
        reportEntry,
        markdownEditor
    },
    filters: {
        reportFilter(obj) {
            let da = dateFormate.format(obj.createTime)
            if (obj.updateTime && obj.updateTime !== obj.createTime) {
                da = `修改于${dateFormate.format(obj.updateTime)}`
            }
            return {
                head: obj.phote,
                name: obj.nickName,
                date: da,
                content: obj.content
            }
        }
    },
    computed: {
        btnText() {
            return this.isEdit ? '保存' : '编辑'
        },
        previewDate() {
            return Object.assign(this.user, this.obj)
        }
    },
    watch: {

    },
    mounted() {
        this.beginDate = this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        this.initDate()
    },
    methods: {
        changeList(val) {
            this.beginDate = new Date(val)
            this.initDate()
        },
        initDate() {
            getReportDetail({
                beginDate: this.beginDate,
                type: 'weekly'
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
                type: 'weekly'
            })
            saveReportDetail(this.obj).then((res) => {
                this.isEdit = false
            }).catch(error => {
                console.log(error.error)
            })
        }
    }
}

</script>
<style lang="scss" scoped>
.add-btn {
    margin: 30px 0 0 65px;
}
</style>
