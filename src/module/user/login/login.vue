<template>
    <div>
        <el-input v-model.trim="form.eMail" class="login-input" placeholder="登录邮箱"></el-input>
        <el-input v-model.trim="form.userPassword" class="login-input" placeholder="密码"></el-input>
        <p>忘记登录密码</p>
        <el-button type="primary" @click="submitLogin" class="login-btn">登录</el-button>
        <p>还没有加入One Team ？
            <el-button type="text" @click="goRegsiter">点击这里</el-button>加入吧！
        </p>
    </div>
</template>
<script>
import {
    login
} from '@/store/home'
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
            if (!this.check(this.form)) {
                return
            }
            login(this.form, (res) => {
                if (res.success) {
                    localStorage.setItem('token', res.token)
                    if (this.$route.query.backUrl) {
                        window.location.href = this.$route.query.backUrl
                    } else {
                        console.log('登录成功')
                        this.$router.replace({
                            name: 'home'
                        })
                    }
                } else {
                    alert(res.resultDes)
                }
            })
        },
        goRegsiter() {
            this.$router.replace({
                name: 'register'
            })
        },
        check(form) {
            if (!testEmail(form.eMail)) {
                form.eMail ? alert('邮箱格式错误') : alert('请输入用户名')
                return
            }
            if (!testPwd(form.userPassword)) {
                form.userPassword ? alert('密码格式错误') : alert('请输入密码')
                return
            }
            return true
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
}

</style>
