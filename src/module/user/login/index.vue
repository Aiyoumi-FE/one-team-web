<template>
    <div class="login">
        <img :src="logo" alt="" class="logo">
        <h1>One Team</h1>
        <div class="login-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'user',
    data() {
        return {
            logo: require('../image/logo.jpg')
        }
    }
}

</script>
<style lang='scss' scoped>
.login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
    padding-top: 100px;
    h1 {
        margin: 10px auto;
    }
}

.login-content {
    width: 300px;
    margin: 0 auto;
}

.logo {
    width: 160px;
}

</style>
