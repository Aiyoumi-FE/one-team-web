<template>
    <div class="page_setting">
        <h2>个人设置</h2>
        <a href="javascript:;" class="link-delete" @click="submitSignout">退出团队</a>
        <div class="setting-cells">
            <div class="part_photo">
                <label class="label-img" for="file">
                    <div class="setting-img"><img src="../image/cat.png" alt=""></div>
                    <p class="txt_photo__title">选择新头像</p>
                    <p class="txt_photo__subtitle">可以选择png/jpg图片作为头像</p>
                    <input class="input-file" type="file" name="file" id="file" @change="upImg($event)" enctype="multipart/form-data">
                </label>
            </div>
            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <p class="setting-item" @click="setEditFlag('name')">
                            <label class="setting-item__label">用&nbsp;户&nbsp;名</label>
                            <span>{{user.name | contentFilter(editflag !== 'name', '用户名')}}</span>
                            <a href="javascript:;" class="btn_edit">{{btnTxt | editBtnFilter(editflag !== 'name') }}</a>
                        </p>
                    </template>
                    <div class="area_edit">
                        <el-input
                            class="edit_input disb"
                            v-model="userEdit.name"
                            placeholder="用户名"
                            prefix-icon="el-icon-star-off">
                        </el-input>
                        <el-button class="disb" type="info" @click="saveInfo('name')">确定</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <p class="setting-item" @click="setEditFlag('email')">
                            <label class="setting-item__label">邮&nbsp;&nbsp;&nbsp;箱</label>
                            <span>{{user.email | contentFilter(editflag !== 'email', '邮箱')}}</span>
                            <a href="javascript:;" class="btn_edit">{{btnTxt | editBtnFilter(editflag !== 'email') }}</a>
                        </p>
                    </template>
                    <div class="area_edit">
                        <p>
                            <el-input
                                class="edit_input"
                                v-model="userEdit.emailPwd"
                                placeholder="验证码"
                                prefix-icon="el-icon-star-off">
                            </el-input>
                            <span>发送验证码</span>
                        </p>
                        <el-input
                            class="edit_input disb"
                            v-model="userEdit.emailNew"
                            placeholder="新邮箱"
                            prefix-icon="el-icon-star-off">
                        </el-input>
                        <p>
                            <el-input
                                class="edit_input"
                                v-model="userEdit.emailPwdNew"
                                placeholder="新邮箱验证码"
                                prefix-icon="el-icon-star-off">
                            </el-input>
                            <span>发送验证码</span>
                        </p>
                        <el-button class="disb" type="info" @click="saveInfo('email')">确定</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <p class="setting-item" @click="setEditFlag('phone')">
                            <label class="setting-item__label">手&nbsp;&nbsp;&nbsp;机</label>
                            <span>{{user.phone | contentFilter(editflag !== 'phone', '手机号')}}</span>
                            <a href="javascript:;" class="btn_edit">{{btnTxt | editBtnFilter(editflag !== 'phone') }}</a>
                        </p>
                    </template>
                    <div class="area_edit">
                        <el-input
                            class="edit_input disb"
                            v-model="userEdit.phone"
                            placeholder="新手机号"
                            prefix-icon="el-icon-star-off">
                        </el-input>
                        <el-button class="disb" type="info" @click="saveInfo('phone')">确定</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <p class="setting-item" @click="setEditFlag('password')">
                            <label class="setting-item__label">密&nbsp;&nbsp;&nbsp;码</label>
                            <span>重置密码</span>
                            <a href="javascript:;" class="btn_edit">{{btnTxt | editBtnFilter(editflag !== 'password') }}</a>
                        </p>
                    </template>
                    <div class="area_edit">
                        <el-input
                            class="edit_input disb"
                            v-model="userEdit.password"
                            placeholder="老密码"
                            prefix-icon="el-icon-star-off">
                        </el-input>
                        <el-input
                            class="edit_input disb"
                            v-model="userEdit.passwordNew"
                            placeholder="新密码"
                            prefix-icon="el-icon-star-off">
                        </el-input>
                        <el-input
                            class="edit_input disb"
                            v-model="userEdit.passwordNewConfirm"
                            placeholder="新密码确认"
                            prefix-icon="el-icon-star-off">
                        </el-input>
                        <el-button class="disb" type="info" @click="saveInfo('password')">确定</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import {
    signout,
    getUsrInfo,
    updateUserInfo
} from '@/store/home'
import {
    Collapse,
    CollapseItem
} from 'element-ui'
export default {
    name: 'personal-settings',
    data() {
        return {
            editflag: '',
            user: {
                name: '李天霸',
                email: 'tianba@ico.com',
                phone: '15268175233',
                avator: ''
            },
            userEdit: {
                uid: '',
                name: '',
                email: '',
                emailPwd: '',
                emailNew: '',
                emailPwdNew: '',
                phone: '',
                password: '',
                passwordNew: '',
                passwordNewConfirm: ''
            },
            btnTxt: '编辑'
        }
    },
    computed: {
        userID() {
            return window.localStorage.getItem('uid')
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
        if (this.userID) {
            this.initInfo()
        }
    },
    methods: {
        /**
         * initialize user info
         */
        initInfo() {
            // let userId = this.userID
            getUsrInfo().then((res) => {
                if (res.success) {

                } else {

                }
            })
        },
        /**
         * sign out team
         */
        submitSignout() {
            signout((res) => {
                if (res.success) {
                    this.$router.replace({
                        name: 'login'
                    })
                } else {
                    alert(res.resultDes)
                }
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
            this.userEdit.uid = this.selfUserID
            updateUserInfo().then((res) => {

            })
        }
    }
}

</script>
<style lang='scss' scoped>
.page_setting {
    padding: 35px;
    .setting-cells {
        padding: 0 10px;
    }
    .setting-item {
        /*display: flex;
        justify-content: space-between;
        align-items: center;*/
    }
    .setting-item__label {
        /*flex-basis: 15%;*/
        display: inline-block;
        width: 30%;
    }
    .area_edit {
        padding-left: 30%;
    }
    .btn_edit {
        float: right;
    }
    .setting-item__filed {
        padding-left: 10px;
        display: inline-block;
    }
    .edit_input {
        max-width: 200px;
        margin-bottom: 5px
    }
    /*.area_edit {
        display: flex;
        justify-content: space-between;
    }*/
    .fr {
        float: right;
    }
    .disb {
        display: block;
    }
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

</style>
