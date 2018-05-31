<template>
    <div>
        <el-input v-model.trim="form.eMail" class="login-input" placeholder="登录邮箱"></el-input>
        <el-input v-model.trim="form.userPassword" class="login-input" placeholder="密码" type="password"></el-input>
        <p>忘记登录密码</p>
        <el-button type="primary" @click="submitLogin" class="login-btn">登录</el-button>
        <p>还没有加入One Team ？
            <el-button type="text" @click="goRegsiter">点击这里</el-button>加入吧！
        </p>
    </div>
</template>
<script>
import {
    signIn
} from '@/store/user'
import {
    testEmail,
    testPwd
} from 'assets/util'
export default {
    name: 'login',
    data() {
        return {
            form: {
                eMail: '',
                userPassword: ''
            }
        }
    },
    methods: {
        submitLogin() {
            let checkRes = this.check(this.form)
            if (checkRes) {
                this.$message.error(checkRes)
                return
            }
            signIn(this.form).then((res) => {
                localStorage.setItem('token', res.token)
                if (this.$route.query.url) {
                    window.location.href = this.$route.query.url
                } else {
                    this.$router.replace({
                        name: 'home'
                    })
                }
            }).catch(error => {
                this.$message.error(error.error)
            })
        },
        goRegsiter() {
            this.$router.replace({
                name: 'register'
            })
        },
        check(form) {
            if (!testEmail(form.eMail)) {
                return form.eMail ? '邮箱格式错误' : '请输入用户名'
            }
            if (!testPwd(form.userPassword)) {
                return form.userPassword ? '密码格式错误' : '请输入密码'
            }
        }
    }
}

</script>
<style lang='scss' scoped>
.login-input {
    margin-top: 10px;
}

.login-btn {
    width: 100%;
}

p {
    text-align: left;
    padding: 10px 0;
}

</style>
