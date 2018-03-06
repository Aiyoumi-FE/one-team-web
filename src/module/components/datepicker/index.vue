<template>
    <div class="bd-date">
        <p class="bd-date_week">
            <img class="bd-date_back" src="./img/back.png" alt="" @click="changeList(-7)">
            {{dateInfo.year}}年  第{{dateInfo.weekNum}}周
            <img class="bd-date_next" v-if="notEnd" src="./img/back.png" alt="" @click="changeList(7)">
        </p>
        <p class="bd-date_detail">{{dateInfo.begin}} - {{dateInfo.end}}</p>
    </div>
</template>

<script>
import dateFormate from '../../../weekly/common/index'

export default {
    name: 'datepicker',
    props: {
        beginDate: {
            type: String
        }
    },
    data() {
        return {
            dateInfo: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            }
        }
    },
    computed: {
        notEnd() {
            return this.beginDate < dateFormate.getDayOfWeek(new Date(), 1)
        }
    },
    watch: {

    },
    mounted() {
        this.setDate()
    },
    methods: {
        setDate() {
            this.dateInfo.year = dateFormate.getYear(this.beginDate)
            this.dateInfo.weekNum = dateFormate.getYearWeek(this.beginDate)

            let begin = this.beginDate
            let end = dateFormate.getDayOfWeek(this.beginDate, 5)

            this.dateInfo.begin = `${begin.getMonth() + 1}/${begin.getDate()}`
            this.dateInfo.end = `${end.getMonth() + 1}/${end.getDate()}`
        },
        changeList(action) {
            this.beginDate = new Date(Date.parse(this.beginDate) + 24 * 60 * 60 * 1000 * action)
            this.loadData()
            this.setDate()
        }
    }
}

</script>
<style lang="scss" scoped>
.bd-date {
    text-align: center;
    font-size: 24px;
    color: #333;
    span {
        padding: 0 20px;
    }
    img {
        width: 24px;
    }
}

.bd-date_detail {
    margin: 0;
    font-size: 16px;
    color: #999;
}
.bd-date_week {
    position: relative;
    display: inline-block;
    margin: 0 auto;
}
.bd-date_back {
    position: absolute;
    left: -34px;
    top: 4px;
}
.bd-date_next {
    position: absolute;
    right: -34px;
    top: 4px;
    transform: rotate(180deg);
}
.bd-content {
    margin: 40px auto;
}
</style>
