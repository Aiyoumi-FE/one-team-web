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
            <vue-markdown v-highlight :source="reportData.content" class="markdown-body"></vue-markdown>
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
    padding: 20px; // border-bottom: 1px solid #e4e7ed;
    display: flex;
    justify: space-between;
}

.report-entry {
    border-bottom: 1px solid #e4e7ed;
}

.hd {
    img {
        background: #ccc;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
}

.bd {
    margin-left: 10px;
    flex-grow: 1;
}

.bd-title {
    font-size: 16px;
    margin-bottom: 10px;
    .name {
        font-weight: bold;
        color: #409eff;
        font-size: 20px;
    }
    .date {
        font-size: 12px;
        color: #999;
    }
}

</style>
