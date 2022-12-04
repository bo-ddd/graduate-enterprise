<template>
    <div>
        <div class="inappropriate">
            <el-empty class="mt-20"  v-if="!resumeList.length" :image-size="260" description="暂无数据"/>
            <card.cardWrap v-for="item in resumeList" class="mt-15">
                <template #header>
                    <card.cardHeader :time="item.interviewTime || '2022-09-21 18:25:48' ">投递职位&nbsp;|&nbsp;{{ item.positionName }}</card.cardHeader>
                </template>
                <template #main>
                    <card.cardItem :userinfo="{
                        sex: item.userSex,
                        name: item.userName,
                        deliveryStatus: item.deliveryStatus,
                        education: `${item.userSchool}-${item.userProfessional}-${item.userEducation}`,
                        userLogoUrl:item.userLogoUrl
                    }">
                        <template #btn>
                            <el-button @click="recovery(item)" type="primary">恢复位候选人</el-button>
                        </template>
                    </card.cardItem>
                </template>
            </card.cardWrap>

        </div>
        <footerBar></footerBar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import card from "@/components/card/index";
import footerBar from "@/components/footer/footerBar.vue";
import { useEnterpriseStore } from "@/stores/enterprise"
let enterprise = useEnterpriseStore();
let resumeList:any = ref([]);

let getResume = async () => {
    let res:any = await enterprise.getResume({
        companyId: 10000,
        deliveryStatus: 6,
    });
    if (res.code == 200) {
        resumeList.value = res.data.data;
    } else {
        console.log("error");
    }
}
getResume();

/**
 * 恢复为候选人
 */
 let recovery = async (item: any) => {
    let res:any = await enterprise.modifyResume({
        deliveryId: item.deliveryId,
        interviewAddr: item.interviewAddr,
        interviewName: item.interviewName,
        interviewNote: item.interviewNote,
        interviewPhone: item.interviewPhone,
        interviewTime: item.interviewTime,
        positionId: item.positionId,
        statusId: 2,
    })
    if (res.code == 200) {
        ElMessage({
            message: '已将该简历恢复为通过初筛，请到候选人中查看',
            type: 'success',
        })
        getResume();
    } else {
        ElMessage.error('this is a error message.')
    }
}
</script>

<style lang="scss" scoped>
.inappropriate {
    padding: 30px 150px;
    min-height: calc(100vh - 260px);
}
</style>