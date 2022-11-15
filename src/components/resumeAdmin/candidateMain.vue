<template>
    <div class="candidate wrap">
        <div class="candidate-header">
            <div class="candidate-header_top">
                <el-select v-model="positionDropValue" class="m-2" placeholder="投递职位">
                    <el-option v-for="item in allPositions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="stageValue" class="stage-input m-2" placeholder="应聘阶段">
                    <el-option v-for="item in applicationStage" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
                <el-select v-model="educationValue" placeholder="学历">
                    <el-option v-for="item in educationList" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
                <el-input v-model="userName" class="name-input" placeholder="姓名" />
                <div></div>
                <el-checkbox v-model="invitationStatus" label="只看邀约投递的简历" size="small" />
                <el-button type="primary" @click="fuzzyQuery()">确定</el-button>
            </div>
            <div class="candidate-header_bottom">
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-button class="screen-btn" type="info" @click="batchbyFilter()" plain>批量通过筛选</el-button>
                <el-button class="screen-btn" type="info" @click="batchInappropriate()" plain>批量不合适</el-button>
            </div>
        </div>

        <div class="main">
            <el-empty class="mt-20" v-if="!cardList.length" image-size="260" description="暂无简历数据" />

            <!-- 简历弹出框 --> 
            <el-dialog v-model="showResumeImage" width="55%" :lock-scroll="false" :align-center="true"
                class="resume-image">
                <div class="resume-box">
                    <div v-show="resumeBtn" @click="byFilter($event,itemObj)" class="resume-btn">通过初筛</div>
                    <div class="resume-btn" @mousemove="isOnload()" @mouseleave="btnImg = true,btnSpan = false">
                        <img v-show="btnImg" src="@/assets/images/onload.png"  alt="">
                        <span v-show="btnSpan" >通过初筛后才能下载简历</span>
                    </div>
                    <div class="resume-btn" @click="inappropriate($event,itemObj)">不合适</div>
                </div>
                <img :src="resumeUrl" alt="">
            </el-dialog>

            <card.cardWrap class="mt-15" v-for="item in cardList" :key="item">
                <template #header>
                    <card.cardHeader :time="item.modifyTime">
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="item.deliveryId">投递职位 | {{ item.positionName }}</el-checkbox>
                        </el-checkbox-group>
                    </card.cardHeader>
                </template>
                <template #main>
                    <card.cardItem @click="getUserInfo(item)" :userinfo="{
                        sex: item.userSex,
                        name: item.userName,
                        deliveryStatus: item.deliveryStatus,
                        education: `${item.userSchool}-${item.userProfessional}-${item.userEducation}`
                    }">
                        <template #btn>
                            <el-button @click="inappropriate($event,item)">不合适</el-button>
                            <el-button @click="byFilter($event,item)" type="primary">通过初筛</el-button>
                        </template>
                    </card.cardItem>
                </template>
            </card.cardWrap>

            <div class="pagination" v-show="cardList.length > 5">
                <el-pagination :page-size="pageSize" v-model:current-page="currentPage" :pager-count="11"
                    layout="prev, pager, next" :total="total" />
            </div>
        </div>
        <footerBar></footerBar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import card from "@/components/card/index";
import footerBar from "@/components/footer/footerBar.vue"
import { useEnterpriseStore } from "@/stores/enterprise"
let enterprise = useEnterpriseStore();
let userName = ref("");
let invitationStatus = ref(false);
let itemObj = ref();

/**
 * 
 */
let btnImg = ref(true);
let btnSpan = ref(false);
let isOnload = () => {
    if(resumeBtn.value){
        btnImg.value = false;
        btnSpan.value = true
    }
}

/**
 * getUserInfo
 */
let resumeUrl = ref();
let showResumeImage = ref(false);
let resumeBtn = ref(true);
let getUserInfo = async (item: any) => {
    itemObj.value = item;
    resumeBtn.value = true;
    if (item.deliveryStatus == '通过初筛') { resumeBtn.value = false };
    showResumeImage.value = true;
    resumeUrl.value = "https://ts4.cn.mm.bing.net/th?id=OIP-C.KINFoHoZsiRA4NGWZHv9vAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";
    let res = await enterprise.getResumeUrl({
        resumeId: item.resumeId,
        userId: item.userId
    })
    if (res.code == 200) {
        console.log(res);
    }
}

/***
 * 批量不合适
 */
let batchInappropriate = async () => {
    console.log(checkedCities.value);
    let deliveryId = checkedCities.value.toString();
    let res = await enterprise.modifyResumeStatus({
        deliveryId,
        statusId: 6,
        userId: 10000
    })
    if (res.code == 200) {
        ElMessage({
            message: 'success',
            type: 'success',
        })
        getResume();
        checkedCities.value = [];
        checkAll.value = false;
    } else {
        ElMessage.error('this is a error message.')
    }
}

/***
 * 批量通过初筛
 */
let batchbyFilter = async () => {
    console.log(checkedCities.value);
    let deliveryId = checkedCities.value.toString();
    let res = await enterprise.modifyResumeStatus({
        deliveryId,
        statusId: 3,
        userId: 10000
    })
    if (res.code == 200) {
        ElMessage({
            message: 'success',
            type: 'success',
        })
        getResume();
        checkedCities.value = [];
        checkAll.value = false;
    } else {
        ElMessage.error('this is a error message.')
    }
}


/**\
 * 不合适
 */
let inappropriate = async (event:Event,item: any) => {
    event.stopPropagation();
    let res = await enterprise.modifyResume({
        deliveryId: item.deliveryId,
        interviewAddr: item.interviewAddr,
        interviewName: item.interviewName,
        interviewNote: item.interviewNote,
        interviewPhone: item.interviewPhone,
        interviewTime: item.interviewTime,
        positionId: item.positionId,
        statusId: 6,
        userId: 10000
    })
    if (res.code == 200) {
        ElMessage({
            message: 'success',
            type: 'success',
        })
        getResume();
        resumeBtn.value = true;
    } else {
        ElMessage.error('this is a error message.')
    }
}

/***
 * 通过初筛
 */
let byFilter = async (event:Event,item: any) => {
    event.stopPropagation();
    let res = await enterprise.modifyResume({
        deliveryId: item.deliveryId,
        interviewAddr: item.interviewAddr,
        interviewName: item.interviewName,
        interviewNote: item.interviewNote,
        interviewPhone: item.interviewPhone,
        interviewTime: item.interviewTime,
        positionId: item.positionId,
        statusId: 3,
        userId: 10000
    })
    if (res.code == 200) {
        ElMessage({
            message: 'success',
            type: 'success',
        })
        getResume();
        resumeBtn.value = false;
    } else {
        ElMessage.error('this is a error message.')
    }
}

/**
 * 多选框功能
 */
const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref([]); //选中的数组  选中几个就往里面放几个
let cities = ref([]);
const handleCheckAllChange = (val: boolean) => {
    checkedCities.value = val ? cities.value : [];
    isIndeterminate.value = false;
}
const handleCheckedCitiesChange = (value: any[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.value.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length;
}

/**
 * 获取应聘阶段下拉框
 */
let applicationStage: any = ref([]);
let stageValue = ref();
let getStage = async () => {
    let res = await enterprise.getStage({});
    if (res.code == 200) {
        applicationStage.value = res.data;
    } else {
        ElMessage.error('this is a error message.')
    }
}
getStage();


/**
 * 获取投递职位下拉框
 */
let allPositions: any = ref([]);
let positionDropValue = ref();
let getPositionDrop = async () => {
    let res = await enterprise.getPositionDrop({ userId: 10000 });
    if (res.code == 200) {
        allPositions.value = res.data;
    } else {
        ElMessage.error('this is a error message.')
    }
}
getPositionDrop();



/**获取学历下拉框 */
let educationList: any = ref([]);
let educationValue = ref();
let getEducation = async () => {
    let res = await enterprise.getEducation({});
    if (res.code == 200) {
        educationList.value = res.data;
    } else {
        ElMessage.error('this is a error message.')
    }
}
getEducation();


/**
 * 获取个人信息名片列表
 */
let cardList: any = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref();
let getResume = async () => {
    let res = await enterprise.getResume({
        pageIndex: currentPage.value,
        pageSize: pageSize.value,
        userId: 10000,
        companyId: 10000,
    });
    if (res.code == 200) {
        total.value = res.data.maxCount;
        cardList.value = res.data.data;
        cities.value = cardList.value.map((item: any) => {
            return item.deliveryId;
        })
    } else {
        ElMessage.error('this is a error message.')
    }
}
getResume();

/**
 * 模糊查询
 */
let fuzzyQuery = async () => {
    let res = await enterprise.getResume({
        pageIndex: currentPage.value,
        pageSize: pageSize.value,
        userId: 10000,
        companyId: 10000,
        deliveryStatus: stageValue.value,
        educationId: educationValue.value,
        positionId: positionDropValue.value,
        userName: userName.value,
        invitationStatus: invitationStatus.value
    });
    if (res.code == 200) {
        ElMessage({
            message: 'success',
            type: 'success',
        })
        cardList.value = res.data.data;
        cities.value = cardList.value.map((item: any) => {
            return item.deliveryId;
        })
    } else {
        ElMessage.error('this is a error message.')
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
    margin-top: 20px;
    background: #e8e8e8;
    text-align: center;
}

:deep(.el-dialog__body) {
    padding: 0;
}

.candidate {
    .main {
        min-height: 50vh;
        padding: 0 !important;

        .resume-image {
            img {
                width: 100%;
                margin: 0 auto;
                text-align: center;
            }
        }

        .resume-box {
            position: fixed;
            bottom: 11%;
            left: 50%;
            transform: translate(-50%);
            display: flex;
            gap: 0 20px;

            .resume-btn {
                background: rgba(0, 0, 0, 0.533);
                padding:18px 20px;
                border-radius: 40px;
                color: #ffffff;
              
                img {
                    width:20px;
                    height:20px;
                }
            }
        }
    }

    .pagination {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 25px;
    }

    .candidate-header {
        border-radius: 6px;

        .candidate-header_bottom {
            display: flex;
            align-items: center;
            gap: 0 10px;

            .screen-btn {
                margin-left: 10px;
                width: 100px;
            }
        }

        .candidate-header_top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
        }

        .stage-input {
            width: 140px;
        }

        .name-input {
            width: 140px;
        }
    }
}

:deep(.el-select-dropdown__item) {
    font-size: 12px !important;
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
</style>