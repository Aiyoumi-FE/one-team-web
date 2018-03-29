<template>
    <div class="report-entry">
        <div class="hd">
            <img :src="reportData.head" alt="">
        </div>
        <div class="bd">
            <p class="bd-title">
                <span v-if="reportData.name" class="name">{{reportData.name}}</span>
                <span v-if="reportData.team" class="team">{{reportData.team}}</span>
                <span v-if="reportData.date" class="date">{{reportData.date}}</span>
            </p>
            <vue-markdown v-highlight :source="reportData.content"></vue-markdown>
        </div>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
export default {
    name: 'reportEntry',
    props: {
        reportData: {
            type: Object
        }
    },
    data() {
        return {}
    },
    components: {
        VueMarkdown
    },
    methods: {}
}

</script>
<style lang="scss" scoped>
.report-entry {
    padding: 20px;
    // border-bottom: 1px solid #e4e7ed;
    display: flex;
    justify: space-between;
}
.report-entry + .report-entry {
    border-top: 1px solid #e4e7ed;
}
.hd {
    img {
        background: #ccc;
        border-radius: 20px;
        width: 40px;
        height: 40px;
    }
}
.bd {
    margin-left: 10px;
    flex-grow: 1;
}

.bd-title {
    font-size: 14px;
    margin-bottom: 10px;
    .name {
        font-weight: bold;
    }
    .date {
        color: #999;
    }
}

</style>
