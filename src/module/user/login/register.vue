<template>
    <div>
        <el-input v-model.trim="form.eMail" placeholder="登录邮箱"></el-input>
        <el-input v-model.trim="form.nickName" placeholder="用户昵称"></el-input>
        <el-input v-model.trim="form.userPassword" placeholder="6-12位字母数字密码"></el-input>
        <el-input v-model.trim="form.confirmPassword" placeholder="密码确认"></el-input>
        <div v-if="teamShow">
            <div class="mt10">
                <el-radio class="radio" v-model="teamPick" label="create">创建团队</el-radio>
                <el-radio class="radio" v-model="teamPick" label="join">加入团队</el-radio>
            </div>
            <el-input v-if="teamStatus" v-model.trim="form.teamName" class="register-input" placeholder="团队名称"></el-input>
            <el-input v-else v-model.trim="form.teamId" placeholder="团队邀请码"></el-input>
        </div>
        <el-button type="primary" @click="submitRegsiter" class="register-btn">注册</el-button>
        <p>已经注册过了？
            <el-button type="text" @click="goLogin">直接登录</el-button>
        </p>
    </div>
</template>
<script>
import {
    Radio
} from 'element-ui'
import {
    register
} from '@/store/home'
import {
    testEmail,
    testPwd,
    testName
} from 'assets/util'
export default {
    name: 'register',
    data() {
        return {
            teamPick: 'create',
            teamShow: !this.$route.query.id,
            form: {
                eMail: '',
                nickName: '',
                userPassword: '',
                confirmPassword: '',
                teamName: '',
                teamId: ''
            },
            photo: require('../image/cat.png')
        }
    },
    computed: {
        teamStatus() {
            return this.teamPick === 'create'
        }
    },
    components: {
        'el-radio': Radio
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if (!this.teamShow) {
                this.teamPick = 'join'
                this.form.teamId = this.$route.query.id
            }
        },
        submitRegsiter() {
            if (!this.check(this.form)) {
                return
            }
            this.form.photo = this.photo
            register(this.form, (res) => {
                if (res.success) {
                    localStorage.setItem('token', res.token)
                    console.log(res.token)
                    let timer = setTimeout(() => {
                        if (localStorage.getItem('token') === res.token) {
                            clearTimeout(timer)
                            this.$router.replace({
                                name: 'home'
                            })
                        }
                    }, 10)
                } else {
                    alert(res.resultDes)
                }
            })
        },
        goLogin() {
            this.$router.replace({
                name: 'login'
            })
        },
        check(form) {
            if (!testEmail(form.eMail)) {
                form.eMail ? alert('邮箱格式错误') : alert('请输入用户名')
                return
            }
            if (!testName(form.nickName)) {
                form.nickName ? alert('昵称格式错误') : alert('请输入昵称')
                return
            }
            if (!testPwd(form.userPassword)) {
                form.userPassword ? alert('密码格式错误') : alert('请输入密码')
                return
            }
            if (!(form.userPassword === form.confirmPassword)) {
                form.confirmPassword ? alert('两次密码不一致') : alert('请再次输入密码')
                return
            }
            if (this.teamStatus && !form.teamName) {
                alert('请输入团队名称')
                return
            }
            if (!this.teamStatus && !form.teamId) {
                alert('请输入团队邀请码')
                return
            }
            return true
        }
    }
}

</script>
<style lang='scss' scoped>
.el-input,
.el-button,
.mt10 {
    margin-top: 10px;
}

.register-btn {
    width: 100%;
}

.el-button--text {
    margin: 0;
}

p {
    text-align: left;
}

</style>
