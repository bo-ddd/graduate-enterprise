<template>
    <div class="interview wrap">
        <div class="interview-header">
            面试职位
            <el-select class="m-2" v-model="positionDropValue" placeholder="投递职位">
                <el-option v-for="item in allPositionDrop" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>

            候选人
            <el-input v-model="userName" class="name-input" placeholder="请输入姓名" />
            <el-button type="primary" @click="fuzzyQuery()" plain>确定</el-button>
        </div>

        <div class="main">
            <el-table :header-cell-style="{ background: '#fff' }" :data="tableData" style="width: 100%">
                <el-table-column prop="userName" label="候选人" width="180" />
                <el-table-column prop="interviewName" label="联系方式" width="180" />
                <el-table-column prop="userSchool" label="学校" width="180" />
                <el-table-column prop="positionName" label="面试职位" width="180" />
                <el-table-column prop="interviewTime" label="面试时间" />
                <el-table-column label="操作" width="190">
                    <template #default="scope">
                        <el-popover placement="left-end" :width="340" trigger="hover">
                            <template #reference>
                                <el-link type="primary" :underline="false">面试信息</el-link>
                            </template>
                            <template #default>
                                <div class="popover">
                                    <h3 class="c-black">面试信息</h3>
                                    <div>面试职位&nbsp;&nbsp;{{scope.row.positionName}}</div>
                                    <div>面试时间&nbsp;&nbsp;{{scope.row.interviewTime}}</div>
                                    <div>面试地点&nbsp;&nbsp;{{scope.row.interviewAddr}}</div>
                                    <div>联系人&nbsp;&nbsp;{{scope.row.interviewName}}</div>
                                    <div>联系方式&nbsp;&nbsp;{{scope.row.interviewPhone}}</div>
                                    <div>备注&nbsp;&nbsp;{{scope.row.interviewNote}}</div>
                                </div>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <footerBar></footerBar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import footerBar from "@/components/footer/footerBar.vue";
import { useEnterpriseStore } from "@/stores/enterprise"
let enterprise = useEnterpriseStore();
let userName = ref("")
const tableData = ref([])
let allPositionDrop: any = ref([]);
let positionDropValue = ref();
let getPositionDrop = async () => {
    let res = await enterprise.getPositionDrop({ userId: 10000 });
    allPositionDrop.value = res.data;
}
getPositionDrop();

let getResume = async () => {
    let res = await enterprise.getResume({
        userId: 10000,
        companyId:10000,
        deliveryStatus: 4,
    });
     tableData.value = res.data.data;
}
getResume();

let fuzzyQuery = async () => {
    let res = await enterprise.getResume({
        userId: 10000,
        companyId: 10000,
        deliveryStatus: 4,
        positionId:positionDropValue.value,
        userName:userName.value,
    });
    tableData.value = res.data.data;
}
</script>

<style lang="scss" scoped>
.interview {
     .main{
        min-height:50vh;
     }
     .interview-header {
        padding: 40px 0;
        display: flex;
        align-items: center;
        gap: 0 20px;

        .name-input {
            width: 200px;
        }
    }
}

.popover {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 16px;
    .c-black {
        color: black;
    }
}

:deep(.el-table thead) {
    height: 60px;
}
</style>