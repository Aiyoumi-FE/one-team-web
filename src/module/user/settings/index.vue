<template>
    <div>
        <h2>个人设置</h2>
        <div class="setting-cells">
            <div class="part-photo">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadPhoto"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img :src="user.headPortrait" class="avatar">
                </el-upload>
            </div>
            <el-collapse accordion :value="openItem">
                <el-collapse-item name="nickName">
                    <template slot="title">
                        <div class="setting-item" @click="setEditFlag('nickName')">
                            <label class="setting-item__label">用&nbsp;户&nbsp;名</label>
                            <p class="setting-item__value">{{user.nickName | contentFilter(editflag !== 'name', '用户名')}}</p>
                            <a href="javascript:;">{{btnTxt | editBtnFilter(editflag !== 'name') }}</a>
                        </div>
                    </template>
                    <div class="area_edit">
                        <el-input class="edit_input disb" v-model="userEdit.nickName" placeholder="用户名">
                        </el-input>
                        <el-button type="primary" @click="updateInfo('nickName')" plain size="small">确定</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="eMail">
                    <template slot="title">
                        <div class="setting-item" @click="setEditFlag('email')">
                            <label class="setting-item__label">邮&nbsp;&nbsp;&nbsp;箱</label>
                            <p class="setting-item__value">{{user.eMail | contentFilter(editflag !== 'email', '邮箱')}}</p>
                            <a href="javascript:;">{{btnTxt | editBtnFilter(editflag !== 'email') }}</a>
                        </div>
                    </template>
                    <div class="area_edit">
                        <el-input class="edit_input disb" v-model="userEdit.email.oldPassword" placeholder="请输入用户密码" type="password">
                        </el-input>
                        <el-input class="edit_input disb" v-model="userEdit.email.eMail" placeholder="请输入新邮箱">
                        </el-input>
                        <el-button type="primary" @click="updateInfo('email')" plain size="small">修改</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="phoneNumber">
                    <template slot="title">
                        <div class="setting-item" @click="setEditFlag('phoneNumber')">
                            <label class="setting-item__label">手&nbsp;&nbsp;&nbsp;机</label>
                            <p class="setting-item__value">{{user.phoneNumber | contentFilter(editflag !== 'phone', '手机号')}}</p>
                            <a href="javascript:;">{{btnTxt | editBtnFilter(editflag !== 'phone') }}</a>
                        </div>
                    </template>
                    <div class="area_edit">
                        <el-input class="edit_input disb" v-model="userEdit.phoneNumber" placeholder="新手机号">
                        </el-input>
                        <el-button type="primary" @click="updateInfo('phoneNumber')" plain size="small">确定</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="userPassword">
                    <template slot="title">
                        <div class="setting-item" @click="setEditFlag('password')">
                            <label class="setting-item__label">密&nbsp;&nbsp;&nbsp;码</label>
                            <p class="setting-item__value">重置密码</p>
                            <a href="javascript:;">{{btnTxt | editBtnFilter(editflag !== 'password') }}</a>
                        </div>
                    </template>
                    <div class="area_edit">
                        <el-input class="edit_input disb" v-model="userEdit.password.oldPassword" placeholder="老密码" type="password">
                        </el-input>
                        <el-input class="edit_input disb" v-model="userEdit.password.userPassword" placeholder="新密码" type="password">
                        </el-input>
                        <el-input class="edit_input disb" v-model="userEdit.password.confirmPassword" placeholder="新密码确认" type="password">
                        </el-input>
                        <el-button type="primary" @click="updateInfo('password')" plain size="small">确定</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import {
    getUsrInfo,
    updateUserInfo
} from '@/api/user'
import {
    encrypt
} from 'assets/util'
import {
    Collapse,
    CollapseItem,
    Upload
} from 'element-ui'
export default {
    name: 'personal-settings',
    data() {
        return {
            editflag: '',
            openItem: '',
            user: {
                headPortrait: require('../image/cat.png'),
                nickName: '',
                eMail: '',
                phoneNumber: ''
            },
            userEdit: {
                nickName: '',
                email: {
                    oldPassword: '',
                    eMail: ''
                },
                phoneNumber: '',
                password: {
                    oldPassword: '',
                    userPassword: '',
                    confirmPassword: ''
                }
            },
            btnTxt: '编辑',
            uploadPhoto: '/api/v1/file/user',
            focusing: false
        }
    },
    filters: {
        contentFilter(val, flag, itemName) {
            return !flag ? ('原' + itemName + ': ' + val) : val
        },
        editBtnFilter(val, flag) {
            return !flag ? '  ' : val
        }
    },
    components: {
        'el-collapse': Collapse,
        'el-collapse-item': CollapseItem,
        'el-upload': Upload
    },
    created() {
        this.initInfo()
    },
    methods: {
        /**
         * initialize user info
         */
        initInfo() {
            getUsrInfo().then((res) => {
                Object.assign(this.user, res)
            }).catch(error => {
                console.log(error.error)
            })
        },
        handleAvatarSuccess(res, file) {
            this.user.headPortrait = URL.createObjectURL(file.raw)
        },
        /**
         * Sets the editing flag.
         *
         * @param      {string}  item    The item
         */
        setEditFlag(item) {
            if (this.editflag === item) {
                this.editflag = ''
            } else {
                this.editflag = item
            }
        },
        /**
         * update user info
         *
         * @param      {<type>}  item    The item
         */
        updateInfo(item) {
            let formData = Object.prototype.toString.call(this.userEdit[item]) === '[object String]' ? Object.assign({}, {
                [item]: this.userEdit[item]
            }) : Object.assign({}, this.userEdit[item])
            for (let item of Object.keys(formData)) {
                if (item.indexOf('Password') > -1) {
                    formData[item] = encrypt(formData[item])
                }
            }
            updateUserInfo(formData).then((res) => {
                Object.assign(this.user, res)
                this.openItem = ''
            }).catch(error => {
                this.$message.error(error.error)
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.part-photo {
    position: relative;
    width: 90px;
    height: 90px;
    margin-bottom: 30px;
    .txt_photo__title {
        font-size: 18px;
        color: #4ea5ad;
        padding: 14px 80px 0;
    }
    .txt_photo__subtitle {
        font-size: 14px;
        color: #ccc;
        padding-left: 80px;
    }
}
.avatar-uploader{
    height: 90px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
        width: 90px;
        height: 90px;
    }
    &:hover::after {
        content: '修改';
        text-align: center;
        width: 90px;
        height: 90px;
        line-height: 90px;
        background-color: #eee;
        position: absolute;
        top: 0;
        opacity: 0.5;
        z-index: 3;
    }
}
.setting-cells {
    padding: 0 10px;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.setting-item__label {
    width: 30%;
}

.setting-item__value {
    flex: 1;
}

.area_edit {
    padding-left: 29%;
}

.setting-item__filed {
    padding-left: 10px;
    display: inline-block;
}

.edit_input {
    max-width: 200px;
    margin-bottom: 5px
}

.fr {
    float: right;
}

.disb {
    display: block;
}

.link-delete {
    display: block;
    position: absolute;
    right: 40px;
    top: 30px;
    font-size: 12px;
    color: #cf372b;
}

h2 {
    margin-bottom: 30px;
    font-size: 18px;
}

/deep/ .el-collapse-item__header,
/deep/ .el-collapse-item__wrap {
    background-color: transparent;
}

.is-active {
    background-color: #fcfcfc;
}

</style>
