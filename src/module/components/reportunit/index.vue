<template>
    <div class="component_report">
        <div class="cell-hd">
            <img class="cell-hd-pic" :src="reportData.phote | photoFilter" alt="">
            <p class="cell-hd-name">{{reportData.userId.nickName}}</p>
        </div>
        <vue-markdown v-highlight :source="reportData.content" class="cell-bd markdown"></vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    name: 'reportDetail',
    props: {
        reportData: {
            type: Object
        }
    },
    data() {
        return {
        }
    },
    components: {
        VueMarkdown
    },
    filters: {
        photoFilter(val) {
            return val
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
}

</script>
<style lang="scss" scoped>
.component_report {
    .markdown {
        width: auto;
    }
}

.ot-cells:before {
    content: '';
    display: none;
}
.ot-cell{
    padding: 10px 10px 20px;
}

.cell-hd {
    width: 50px;
    text-align: center;
    margin-top: 10px;
}

.cell-hd-pic {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
}

.cell-hd-name {
    margin-top: 10px;
    color: #999;
}

.cell-bd {
    flex-grow: 1;
}
</style>
