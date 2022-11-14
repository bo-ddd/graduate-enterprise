<template>
    <div class="resume">
        <div class="header">
            <el-tabs class="demo-tabs" v-model="activeName" stretch="true">
                <el-tab-pane label="候选人" name="first"></el-tab-pane>
                <el-tab-pane label="面试管理" name="second"></el-tab-pane>
                <el-tab-pane label="不合适" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <candidateMain v-if="activeName == 'first'"></candidateMain>
        <interviewMain v-if="activeName == 'second'"></interviewMain>
        <inappropriate v-if="activeName == 'third'"></inappropriate>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import candidateMain from "@/components/resumeAdmin/candidateMain.vue";
import interviewMain from "@/components/resumeAdmin/interviewMain.vue";
import inappropriate from "@/components/resumeAdmin/inappropriate.vue";
let activeName = ref("first");

</script>

<style lang="scss" scoped>
.resume {
    min-height: calc(100vh - 200px);
    background: #f6f7f9;
    .header {
        border-bottom: 1px solid rgb(238, 238, 238);
        height: 60px;
        box-shadow: 0px 0px 8px rgb(221, 221, 221);
        background: white;
        .demo-tabs {
            margin-left: 50%;
            transform: translate(-50%, 0);
            width: 500px;
        }
    }
}
:deep(.el-table thead){
    height: 60px;
}

:deep(.candidate-header_bottom > .el-button) {
    border: none;
    color: #808695;
    background: white;
}

:deep(.el-checkbox) {
    margin-right: 0px;
}

:deep(.el-checkbox.el-checkbox--small) {
    height: 33px;
}

:deep(.el-tabs__active-bar) {
    width: 60px !important;
    left: 40px !important;
}

:deep(.el-tabs__active-bar) {
    width: 60px !important;
    left: 40px !important;
}

:deep(.el-tabs__item) {
    font-size: 17px;
    font-weight: 600;
}

:deep(.el-tabs__nav) {
    height: 62px;
    align-items: center;
    width: 50px;
}
</style>
