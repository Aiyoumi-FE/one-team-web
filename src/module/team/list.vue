<template>
    <div v-if="!loading" class="team">
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
            <el-table-column label="成员" width="180">
                <template slot-scope="scope">
                    <div class="cell-hd">
                        <img class="cell-hd-pic" :src="scope.row.phote | photoFilter" alt="">
                        <span>{{ scope.row.nickName }}</span>
                        <span class="admin" v-if="scope.row._id == tableData.administrator">管理员</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.eMail }}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系方式" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.phoneNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
} from '@/store/team'
import TeamJoin from './join'

export default {
    name: 'home',
    data() {
        return {
            loading: true,
            managing: false,
            tableData: {}
        }
    },
    filters: {
        photoFilter(val) {
            return val || require('../user/image/cat.png')
        }
    },
    components: {
        TeamJoin,
        'el-table': Table,
        'el-table-column': TableColumn
    },
    computed: {
        manageText() {
            return this.managing ? '完成' : '管理团队'
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
                console.log(error)
            })
        },
        invate() {
            this.$router.push('teamJoin')
        },
        manageAction() {
            // this.managing = !this.managing
            this.$router.push({
                path: 'teamManage'
            })
        },
        teamOpera(str, id) {
            if (str === 'out' && this.obj.isAdmin) {
                alert('请先移交管理权限')
                return
            }
            updateMembers({
                opera: str,
                userId: id
            }).then((res) => {
                if (str === 'admin') {
                    this.managing = !this.managing
                }
                this.initData()
            }).catch(error => {
                console.log(error.error)
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

.invate {
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #eee;
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
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 100%;
}

</style>
