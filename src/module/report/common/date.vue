<template>
    <div class="date">
        <p class="date-week">
            <i class="el-icon-arrow-left point" @click="changeDate(-7)"></i>
            <span>{{year}}年  第{{weekNum}}周</span>
            <i class="el-icon-arrow-right point" @click="changeDate(7)"></i>
        </p>
        <div class="date-picker">
            <p class="date-day">{{begin}} - {{end}}</p>
            <i class="el-icon-date"></i>
            <el-date-picker
                v-model="weekValue"
                type="week"
                format="yyyy-M-d"
                placeholder="选择周">
            </el-date-picker>
        </div>
        <slot name="header"></slot>
    </div>
</template>
<script>
import dateFormate from './index'
import {
    DatePicker
} from 'element-ui'
export default {
    name: 'dateFormate',
    data() {
        return {
            beginDate: this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1),
            weekValue: ''
        }
    },
    computed: {
        year() {
            return dateFormate.getYear(this.beginDate)
        },
        weekNum() {
            return dateFormate.getYearWeek(this.beginDate)
        },
        begin() {
            return `${this.beginDate.getMonth() + 1}/${this.beginDate.getDate()}`
        },
        end() {
            let end = dateFormate.getDayOfWeek(this.beginDate, 7)
            return `${end.getMonth() + 1}/${end.getDate()}`
        }
    },
    components: {
        'el-date-picker': DatePicker
    },
    watch: {
        weekValue(val) {
            this.getDate(val)
        }
    },
    methods: {
        changeDate(action) {
            let beginDate = Date.parse(this.beginDate) + 24 * 60 * 60 * 1000 * action
            this.beginDate = new Date(beginDate)
            this.$emit('dateBack', beginDate)
        },
        getDate(val) {
            this.beginDate = dateFormate.getDayOfWeek(new Date(val), 1)
            this.$emit('dateBack', Date.parse(this.beginDate))
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../../assets/style/base.scss';
.point {
    cursor: pointer;
}
.date {
    text-align: center;
}
.date-week {
    color: #333;
    margin-bottom: 5px;
    font-size: $fontSizeLevel2;
    span {
        padding: 0 20px;
    }
}
.date-day {
    margin: 0;
    font-size: $fontSizeLevel4;
    color: $colorTextGeneral;
}

.bd-date_next {
    transform: rotate(180deg);
}
.date-picker {
    position: relative;
}
/deep/ .el-input {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
}
/deep/ .el-input__inner {
    cursor: pointer;
}

</style>
