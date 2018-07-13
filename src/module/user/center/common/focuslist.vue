<template>
    <div class="component_focus">
        <div class="search">
            <el-autocomplete
                class="inline-input"
                v-model="searchName"
                :fetch-suggestions="querySearch"
                placeholder="请输入用户昵称"
                :trigger-on-focus="false"
                prefix-icon="el-icon-search"
                @select="handleSelect"
            ></el-autocomplete>
            <el-button type="info" @click="addRecordUser">加关注</el-button>
        </div>
        <el-table :data="focusList" style="width: 100%" :show-header="false">
            <el-table-column>
                <template slot-scope="scope">
                    <div class="cell-hd">
                        <img class="cell-hd-pic" :src="scope.row.headPortrait | photoFilter" alt="">
                        <span>{{ scope.row.nickName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="120">
                <template slot-scope="scope">
                    <el-button size="mini" @click="delRecordUser(scope.row._id)" @mouseover="changeState(true)" @mouseout="changeState(false)">{{btnText}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 搜索添加栏 -->
        <!-- <div class="area_search">
            <div class="part_add">
                <h3>我的关注</h3>
                <el-button type="info" @click="showDialogAdd">添加</el-button>
            </div>
            <el-input class="search_input"
                v-model="filterContent"
                placeholder="请输入内容"
                prefix-icon="el-icon-search">
            </el-input>
        </div> -->
        <!-- 列表区域 -->
        <!-- <ul v-if="focusList.length" class="list_focus">
            <li v-for="item in focusListFilted" :key="item.id" @click="goUserCenter(item)">
                <p class="part_name">
                    <span class="name_photo">
                        {{item.subUserName | leterFilter}}
                    </span>
                    <b>{{item.subUserName}}/{{item.subUserTeam}}</b>
                </p>
                <p class="part_btn" @click="cancelFocus(item)">
                    取消关注
                </p>
            </li>
        </ul>
        <div v-else class="bg_empty">
            <p>~~空空如也~~</p>
        </div> -->
        <!-- 添加关注弹窗 -->
        <!-- <el-dialog class="dialog_focus" width="400px" title="添加关注" :visible.sync="dialogVisible">
            <el-input class="wid260" v-model.trim="searchUserName" placeholder="请输入用户姓名"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getUsers">搜索</el-button>
            <ul class="maxh500">
                <li v-for="item in userList" :key="item.id">
                    <el-radio v-model="choosenUser" name="user" :label="item">{{item.nickName}}--{{item.teamId.teamName}}</el-radio>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSubSubmit">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import {
    Dialog,
    Autocomplete,
    Table,
    TableColumn
} from 'element-ui'
import {
    deleteRecord,
    addRecord,
    getRecordList,
    getUserByName
} from '@/api/subscript'
export default {
    name: 'focusList',
    data() {
        return {
            focusList: [],
            searchID: '',
            // photoDefault: require('../../image/cat.png'),
            dialogVisible: false,
            searchUserName: '',
            userList: [],
            choosenUser: '',
            filterContent: '',
            searchName: '',
            searchList: [],
            searchId: '',
            btnText: '已关注'
        }
    },
    components: {
        'el-dialog': Dialog,
        'el-autocomplete': Autocomplete,
        'el-table': Table,
        'el-table-column': TableColumn
    },
    filters: {
        photoFilter(val) {
            return val || require('../../image/cat.png')
        },
        leterFilter(val) {
            return val.slice(0, 1)
        }
    },
    computed: {
        focusListFilted() {
            if (this.filterContent && this.focusList.length) {
                return this.focusList.filter((item) => {
                    return item.subUserName.indexOf(this.filterContent) !== -1
                })
            } else {
                return this.focusList
            }
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getRecordList().then((res) => {
                this.focusList = res
            })
        },
        querySearch(searchName, cb) {
            getUserByName({ searchName }).then((res) => {
                let searchList = res.data
                for (let key in searchList) {
                    let item = searchList[key]
                    item.value = item.nickName + '<' + item.eMail + '>'
                }
                this.searchList = searchList
                cb(this.searchList)
            })
        },
        handleSelect(item) {
            this.searchId = item._id
        },
        addRecordUser() {
            addRecord({ subUserId: this.searchId }).then((res) => {
                this.initData()
            }).catch((err) => {
                this.$message.error(err.resultDes)
            })
        },
        delRecordUser(id) {
            console.log(id)
            deleteRecord({ subUserId: id }).then((res) => {
                this.initData()
            }).catch((err) => {
                this.$message.error(err.resultDes)
            })
        },
        changeState(state) {
            this.btnState = state ? '取消关注' : '已关注'
        }
        // showDialogAdd() {
        //     console.log('showing')
        //     this.dialogVisible = true
        // },
        // cancelFocus(item) {
        //     deleteRecord({
        //         subUserId: item.subUserId
        //     }).then((res) => {
        //         if (res.success) {
        //             this.initData()
        //         } else {
        //             alert(res.resultDes || '系统异常，稍后再试')
        //         }
        //     })
        // },
        // addSubSubmit() {
        //     if (!this.choosenUser._id) {
        //         alert('关注用户不可为空')
        //         return
        //     }

        //     addRecord({
        //         subUserId: this.choosenUser._id,
        //         subUserTeamName: this.choosenUser.teamId.teamName,
        //         subUserName: this.choosenUser.nickName
        //     }).then((res) => {
        //         this.cleanSearchContent()
        //         if (res.success) {
        //             this.dialogVisible = false
        //             this.initData()
        //         } else {
        //             alert(res.resultDes || '系统异常，稍后再试')
        //         }
        //     })
        // },
        // cleanSearchContent() {
        //     this.searchUserName = ''
        //     this.userList = []
        // },
        // getUsers() {
        //     if (!this.searchUserName) {
        //         alert('请输入用户姓名')
        //         return
        //     }

        //     getUserByName({
        //         userName: this.searchUserName
        //     }).then((res) => {
        //         this.userList = res
        //     })
        // },
        // goUserCenter(item) {
        //     this.$router.push({
        //         name: 'personalCenter',
        //         query: {
        //             id: item.subUserId
        //         }
        //     })
        // },
        // filterList() {

        // }
    }
}

</script>
<style lang="scss" scoped>
.search {
    margin: 20px 0;
}
.cell-hd {
    display: flex;
    align-items: center;
}

.cell-hd-pic {
    display: inline-block;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    line-height: 100%;
}
// .wid260 {
//     width: 260px;
// }
// .area_search {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: 10px;
//     h3 {
//         display: inline-block;
//         width: 80px;
//     }
//     .search_input {
//         width: 240px;
//     }
//     .search_btn {
//         display: inline-block;
//         padding: 3px 8px;
//         text-align: center;
//         line-height: 20px;
//         border-radius: 3px;
//         background: #ccc;
//         height: 30px;
//         margin-left: 5px;
//     }
// }
// .list_focus {
//     position: relative;
//     padding: 0;
//     &:after {
//         content: ' ';
//         position: absolute;
//         left: 100px;
//         bottom: 0;
//         height: 1px;
//         width: 760px;
//         background: #e6e6e6;
//     }
//     li {
//         display: flex;
//         align-items: center;
//         position: relative;
//         height: 80px;
//         &:before {
//             content: ' ';
//             position: absolute;
//             left: 0;
//             top: 0;
//             height: 1px;
//             width: 100%;
//             background: #e6e6e6;
//         }
//         .name_photo {
//             display: inline-block;
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             text-align: center;
//             background: #ccc;
//             line-height: 50px;
//         }
//     }
// }
.dialog_focus {
    li {
        position: relative;
        height: 25px;
        line-height: 25px;
        &:after {
            content: ' ';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: #999;
            scaleY: 0.5;
        }
    }
}

.part_name {
    display: inline-block;
    flex: 1;
}

.part_btn {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 2px;
    background: #ccc;
}
.bg_empty {
    width: 170px;
    height: 250px;
    text-align: center;
    margin: 30px auto;
    padding-top: 165px;
    background: url('./img/empty.png') 0 0 no-repeat;
    background-size: contain;
    p {
        font-size: 20px;
        color: #9a9a9a;
    }
}
</style>
