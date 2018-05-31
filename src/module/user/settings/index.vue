<template>
    <div>
        <h2>个人设置</h2>
        <div class="setting-cells">
            <div class="part_photo">
                <label class="label-img" for="file">
                    <div class="setting-img">
                        <img :src="user.headPortrait || headPic" alt="">
                    </div>
                    <p class="txt_photo__title">选择新头像</p>
                    <p class="txt_photo__subtitle">可以选择png/jpg图片作为头像</p>
                    <input class="input-file" type="file" name="file" id="file" @change="upImg($event)" enctype="multipart/form-data">
                </label>
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
                        <el-input class="edit_input disb" v-model="userEdit.emailPwd" placeholder="密码验证" type="password">
                        </el-input>
                        <el-input class="edit_input disb" v-model="userEdit.emailPwdNew" placeholder="新邮箱验证码">
                        </el-input>
                        <el-button type="primary" @click="sendEmail('eMail')" plain size="small">发送验证邮件</el-button>
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
                        <el-input class="edit_input disb" v-model="userEdit.password" placeholder="老密码">
                        </el-input>
                        <el-input class="edit_input disb" v-model="userEdit.passwordNew" placeholder="新密码">
                        </el-input>
                        <el-input class="edit_input disb" v-model="userEdit.passwordNewConfirm" placeholder="新密码确认">
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
} from '@/store/user'
import {
    Collapse,
    CollapseItem
} from 'element-ui'
export default {
    name: 'personal-settings',
    data() {
        return {
            editflag: '',
            openItem: 'nickName',
            user: {
                headPortrait: '',
                nickName: '',
                eMail: '',
                phoneNumber: ''
            },
            userEdit: {
                nickName: '',
                email: '',
                emailPwd: '',
                emailNew: '',
                emailPwdNew: '',
                phoneNumber: '',
                password: '',
                passwordNew: '',
                passwordNewConfirm: ''
            },
            btnTxt: '编辑',
            headPic: require('../image/cat.png')
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
        'el-collapse-item': CollapseItem
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
        /**
         * upload photo
         *
         * @param      {<type>}  e       { parameter_description }
         */
        upImg(e) {
            console.log(e)
            let file = e.target.files[0]
            console.log(file)
            let formData = new FormData()
            formData.append('file', file)
            console.log(formData)
            // uploadFile(formData, (res) => {
            //     console.log(res)
            // })
            let xhr = new XMLHttpRequest()
            xhr.open('POST', '/uploadFile', true)
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            console.log(formData)
            xhr.send(formData)
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let response = JSON.parse(xhr.responseText)
                        console.log(response)
                        // response.code === '-1999' ? util.login() : obj.success(response, xhr.responseXML)
                    } else {
                        console.log(xhr.status)
                    }
                }
            }
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
            let formData = Object.assign({}, {
                [item]: this.userEdit[item]
            })
            updateUserInfo(formData).then((res) => {
                this.user[item] = formData[item]
                this.openItem = ''
            }).catch(error => {
                console.log(error.error)
            })
        },

        sendEmail() {
            console.log('send')
        }
    }
}

</script>
<style lang='scss' scoped>
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

.part_photo {
    height: 90px;
    clear: left;
    line-height: 40px;
    position: relative;
    p {
        line-height: 1.5rem;
    }
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
    label {
        float: left;
        width: 60px;
        text-align: right;
    }
    .label-img {
        display: block;
        float: none;
        width: 100%;
        text-align: left;
        clear: left;
        cursor: pointer;
        height: 60px;
        img {
            width: 100%;
        }
        a {
            margin-left: 10px;
            line-height: 60px;
            font-size: 12px;
        }
        .input-file {
            opacity: 0;
        }
    }
    .setting-img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        float: left;
        overflow: hidden;
    }
}

/deep/ .el-collapse-item__header,
/deep/ .el-collapse-item__wrap {
    background-color: transparent;
}

.is-active {
    background-color: #fcfcfc;
}

</style>
