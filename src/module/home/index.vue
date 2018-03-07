<template>
    <div class="home">
        <div class="hello">
            <h1>Hello, {{nickName}} :）</h1>
            <p>Even if it's the end of the world, I'll be there for you</p>
        </div>
        <div class="ft">
            <div class="image">
                <img src="./image/left-pop.png" alt="" ref="imgLeft">
                <img src="./image/bg.png" alt="">
                <img src="./image/right-pop.png" alt="" ref="imgRight">
            </div>
            <div class="sub">
            </div>
        </div>
    </div>
</template>
<script>
// import { cookie } from '@/assets/js/cookie'
// import base64 from '@/assets/js/base64'
// import util from '@/assets/js/util'

export default {
    name: 'home',
    data() {
        return {
            nickName: '',
            midWidth: document.body.clientWidth / 2,
            btHeight: document.body.clientHeight - 100,
            moveX: 0,
            moveY: 0
        }
    },
    computed: {
        styleObject() {
            return {
                transform: `translate(${this.moveX}px, ${this.moveY}px)`
            }
        }
    },
    methods: {
        updateXY(event) {
            this.moveX = (event.offsetX - this.midWidth) / 20
            this.moveY = (event.offsetY - this.btHeight) / 20
        }
    }
}

</script>
<style lang='scss' scoped>
.home {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.hello {
    z-index: 1;
    min-height: 250px;
    text-align: center; // margin: 120px auto;
    color: #56332f;
    font-size: 20px;
    padding-top: 100px;
    h1 {
        color: #56332f;
        font-size: 30px;
        margin: 20px auto;
    }
}

.ft {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1;
    .sub {
        background-color: #56332f;
    }
}

</style>
