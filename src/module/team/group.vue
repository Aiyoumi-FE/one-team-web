<template>
    <div>
        <h1>分组管理</h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in teamGroup"
                :key="index"
                :label="item.teamName"
                :name="'' + index"></el-tab-pane>
            <el-tab-pane label="+ 新增" name="add" class="add"></el-tab-pane>
        </el-tabs>
        <el-input class="group-name" v-model="groupInfo.teamName" placeholder="请输入小组名称"></el-input>
        <div class="group-transfer">
            <el-transfer
                style="text-align: left; display: flex"
                v-model="value"
                filterable
                :titles="[teamInfo.teamName, groupListName]"
                :button-texts="['看这里', '看这里']"
                :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                }"
                @change="handleChange"
                @right-check-change="rightCheckChange"
                :data="generateData">
                <div slot="right-footer" class="group-footer">
                    <el-button class="transfer-footer" size="small" @click="setManage">{{manageText}}</el-button>
                    <span>{{manageName}}</span>
                </div>
            </el-transfer>
        </div>
        <el-button @click="update" class="mt10">保存</el-button>
        <el-button @click="deleteTeam" class="mt10" type="danger" v-if="activeName !== 'add'">删除</el-button>
    </div>
</template>
<script>
import {
    Tabs,
    TabPane,
    Transfer
} from 'element-ui'
import {
    getGroups,
    updateTeam,
    deleteTeam
} from '@/api/team'

export default {
    name: 'team-group',
    data() {
        return {
            activeName: 'add',
            groupInfo: {
                teamName: '',
                memberList: [],
                administrator: '',
                pid: ''
            },
            teamGroup: [],
            teamInfo: {
                teamName: '',
                memberList: []
            },
            value: [],
            rightChecked: []
        }
    },
    components: {
        'el-transfer': Transfer,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane
    },
    computed: {
        groupListName() {
            return this.groupInfo.teamName || ' '
        },
        generateData() {
            return this.teamInfo.memberList.map((v) => {
                if (!(v._id in this.value)) {
                    return {
                        key: v._id,
                        label: v.nickName + ' <' + v.eMail + '>'
                    }
                }
            })
        },
        manageText() {
            return this.groupInfo.administrator ? '更换组长' : '选为组长'
        },
        manageName() {
            for (let v of this.teamInfo.memberList) {
                if (v._id === this.groupInfo.administrator) {
                    return `${v.nickName} <${v.eMail}>`
                }
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            getGroups().then((res) => {
                this.teamInfo = res.teamInfo
                this.teamGroup = res.teamGroup
                if (this.teamGroup.length > 0) {
                    this.activeName = '0'
                } else {
                    this.activeName = 'add'
                }
                this.handleClick()
            }).catch(error => {
                this.$message.error(error.error)
            })
        },
        update(obj) {
            this.groupInfo.memberList = this.value
            this.groupInfo.pid = this.teamInfo._id
            if (!this.groupInfo.teamName) {
                this.$message.error('请输入小组名称')
                return
            }
            if (this.value.length < 1) {
                this.$message.error('请选择小组成员')
                return
            }
            if (!this.groupInfo.administrator) {
                this.$message.error('请选择小组长')
                return
            }
            updateTeam(this.groupInfo).then((res) => {
                this.$message({
                    message: '信息保存成功',
                    type: 'success'
                })
                this.init()
            }).catch(error => {
                this.$message.error(error.error)
            })
        },
        deleteTeam() {
            deleteTeam({ _id: this.teamGroup[this.activeName]._id }).then((res) => {
                this.$message({
                    message: '小组删除成功',
                    type: 'success'
                })
                this.init()
            }).catch(error => {
                this.$message.error(error.error)
            })
        },
        handleChange(value, direction, movedKeys) {
            console.log(this.value)
        },
        handleClick() {
            if (this.activeName === 'add') {
                this.groupInfo = {
                    teamName: '',
                    memberList: [],
                    administrator: '',
                    pid: ''
                }
                this.value = []
                return
            }
            this.groupInfo = this.teamGroup[this.activeName]
            this.value = this.teamGroup[this.activeName].memberList.map(v => v._id)
        },
        rightCheckChange(key) {
            this.rightChecked = key
        },
        setManage() {
            if (this.rightChecked.length !== 1) {
                this.$message.error('请选择 1 位组长')
                return
            }
            this.groupInfo.administrator = this.rightChecked[0]
        }
    }
}

</script>
<style lang="scss" scoped>
/deep/ .el-transfer-panel {
    width: 350px;
}
/deep/ .el-transfer {
    justify-content: space-between;
    align-items: center;
}
/deep/ .el-transfer-panel__footer {
    height: 50px;
}
.add {
    width: 100px;
}
.group-transfer {
    text-align: center;
    margin-top: 20px;
}
.group-name {
    margin-top: 10px;
}
.group-footer {
    padding: 10px;
}
.mt10 {
    margin-top: 10px;
}
</style>
