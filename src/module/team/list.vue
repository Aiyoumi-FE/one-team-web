<template>
    <div>
        <div v-if="!loading && !refuse">
            <div class="hd">
                <div class="hd-name">
                    <h1 class="title">{{tableData.teamName}}</h1>
                    <span class="invate">邀请码：{{tableData._id}}</span>
                </div>
                <div>
                    <el-button size="small" v-if="tableData.isAdmin" @click="invate">邀请新成员</el-button>
                    <el-button size="small" @click="teamOpera('out')">退出团队</el-button>
                </div>
            </div>
            <el-table :data="tableData.memberList" style="width: 100%">
                <el-table-column label="成员">
                    <template slot-scope="scope">
                        <div class="cell-hd">
                            <img class="cell-hd-pic" :src="scope.row.phote | photoFilter" alt="">
                            <span>{{ scope.row.nickName }}</span>
                            <span class="admin" v-if="scope.row._id == tableData.administrator">管理员</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="邮箱" prop="eMail"></el-table-column>
                <el-table-column label="联系方式" prop="phoneNumber"></el-table-column>
                <el-table-column label="操作" v-if="isAdmin">
                    <template slot-scope="scope" v-if="!tableData.administrator === scope.row._id">
                        <el-button size="mini" @click="handleOpera('admin', scope.row)">移交权限</el-button>
                        <el-button size="mini" type="danger" @click="handleOpera('del', scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <refuse v-if="refuse"></refuse>
    </div>
</template>
<script>
import {
    Table,
    TableColumn
} from 'element-ui'
import {
    getMembers,
    updateMembers
} from '@/api/team'
import refuse from '@/module/common/refuse'

export default {
    name: 'home',
    data() {
        return {
            refuse: false,
            loading: true,
            tableData: {}
        }
    },
    filters: {
        photoFilter(val) {
            return val || require('../user/image/cat.png')
        }
    },
    components: {
        refuse,
        'el-table': Table,
        'el-table-column': TableColumn
    },
    computed: {
        manageText() {
            return this.managing ? '完成' : '管理团队'
        },
        isAdmin() {
            return this.tableData.isAdmin
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getMembers().then((res) => {
                this.tableData = res
                this.loading = false
            }).catch(error => {
                this.$message.error(error.error)
                this.refuse = true
            })
        },
        invate() {
            this.$router.push({name: 'teamJoin'})
        },
        manageAction() {
            // this.managing = !this.managing
            this.$router.push({
                path: 'teamManage'
            })
        },
        teamOpera(str, id) {
            if (str === 'out' && this.isAdmin) {
                this.$message.error('请先移交管理权限')
                return
            }
            updateMembers({
                opera: str,
                userId: id
            }).then((res) => {
                this.initData()
            }).catch(error => {
                this.$message.error(error.error)
            })
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../assets/style/base.scss';
h1 {
    display: inline-block;
    font-size: 28px;
}

.hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.title {
    color: #333;
    margin-right: 10px;
}

.invate {
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #ecf5ff;
    display: inline-block;
}

.admin {
    font-size: 12px;
    margin-left: 5px;
    padding: 2px 10px;
    border-radius: 20px;
    background-color: #fcf1a5;
    display: inline-block;
}

.cell-hd {
    display: flex;
    align-items: center;
}

.cell-hd-pic {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    line-height: 100%;
}

</style>
