<template>
  <div class="candidate wrap">
    <div class="candidate-header">
      <div class="candidate-header_top">
        <el-select v-model="positionDropValue" class="m-2" placeholder="投递职位">
          <el-option v-for="item in allPositions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="stageValue" class="stage-input m-2" placeholder="应聘阶段">
          <el-option v-for="item in applicationStage" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="educationValue" placeholder="学历">
          <el-option v-for="item in educationList" :key="item.value" :label="item.label" :value="item.value" />
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
      <el-empty class="mt-20" v-if="!cardList.length" :image-size="260" description="暂无简历数据" />

      <!-- 简历弹出框 -->
      <el-dialog v-model="showResumeImage" :close-on-click-modal="false"  width="55%" :lock-scroll="false" :align-center="true" class="resume-image">
        <div class="resume-box">
          <div v-show="resumeBtn" @click="byFilter($event, itemObj)" class="resume-btn">通过初筛</div>
          <div class="resume-btn" @click="inappropriate($event, itemObj)">不合适</div>
        </div>
        <img :src="resumeUrl" />
      </el-dialog>

      <card.cardWrap class="cardWrap mt-15" v-for="item in cardList" :key="item.deliveryId">
        <template #header>
          <card.cardHeader class="cardHeader" :time="item.modifyTime">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item.deliveryId">投递职位 | {{ item.positionName }}</el-checkbox>
            </el-checkbox-group>
          </card.cardHeader>
        </template>
        <template #main>
          <card.cardItem class="cardItem" @click="getUserInfo(item)" :userinfo="{
            sex: item.userSex,
            name: item.userName,
            deliveryStatus: item.deliveryStatus,
            education: `${item.userSchool}-${item.userProfessional}-${item.userEducation}`,
            userLogoUrl: item.userLogoUrl
          }">
            <template #btn>
              <el-button @click="inappropriate($event, item)">不合适</el-button>
              <el-button
                v-show="item.deliveryStatus != '通过初筛' && item.deliveryStatus != '面试' && item.deliveryStatus != '拟录用'"
                @click="byFilter($event, item)" type="primary">通过初筛</el-button>
              <el-button v-show="item.deliveryStatus == '通过初筛' || item.deliveryStatus == '面试'"
                @click="dialog($event, item)" type="primary" plain>邀约面试</el-button>
              <el-button v-show="item.deliveryStatus == '面试'" type="primary"
                @click="employment($event, item)">拟录用</el-button>
            </template>
          </card.cardItem>
        </template>
      </card.cardWrap>

      <div class="pagination">
        <el-pagination v-show="(cardList.length > 5)" :page-size="pageSize" v-model:current-page="currentPage"
          @current-change="getResume()" :pager-count="11" layout="prev, pager, next" :total="total" />
      </div>
    </div>

    <el-dialog v-model="dialogVisible" width="40%" align-center>
      <div class="youyue">
        <div>
          <h2>邀请{{ name }}，参加面试</h2>
        </div>
        <div>
          面试职位：
          <el-select v-model="inviteFrom.positionId" class="m-2" placeholder="面试职位">
            <el-option v-for="item in allPositions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <div>
          面试时间：
          <el-date-picker v-model="inviteFrom.interviewTime" type="datetime" placeholder="请选择时间"
            format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DD h:m:s a" />
        </div>

        <div>
          面试地点：
          <el-input v-model="inviteFrom.interviewAddr" class="input-width" placeholder="面试地点：" />
        </div>

        <div>
          联系人：
          <el-input v-model="inviteFrom.interviewName" class="input-width ml-15" placeholder="联系人" />
        </div>

        <div>
          联系方式：
          <el-input v-model="inviteFrom.interviewPhone" class="input-width" placeholder="联系方式：" />
        </div>

        <div>
          备注信息：
          <el-input v-model="inviteFrom.interviewNote" class="input-text" axlength="200" placeholder="请填写备注事项"
            show-word-limit type="textarea" />
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="inviteInterview()">确定并发送</el-button>
        </span>
      </template>
    </el-dialog>
    <footerBar></footerBar>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
} from "vue";
import card from "@/components/card/index";
import footerBar from "@/components/footer/footerBar.vue";
import { useEnterpriseStore } from "@/stores/enterprise";
import { useHomeStore } from "@/stores/home";
const use = useHomeStore();
let enterprise = useEnterpriseStore();
let userName = ref("");
let invitationStatus = ref(false);
let itemObj = ref();

//企业信息
let companyId = ref();
const getEnterpriseInfo = async () => {
  const res: any = await use.getEnterprise();
  if (res.code == 200) {
    companyId.value = res.data.companyId;
  }
};

/**
 * 拟录用
 *
 */
let employment = async (event: Event, item: any) => {
  event.stopPropagation();
  ElMessageBox.confirm(
    "确定测试简历已通过所有考核，即将录用他？",
    "确定修改嘛",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async () => {
      let res: any = await enterprise.modifyResume({
        deliveryId: item.deliveryId,
        interviewAddr: item.interviewAddr,
        interviewName: item.interviewName,
        interviewNote: item.interviewNote,
        interviewPhone: item.interviewPhone,
        interviewTime: item.interviewTime,
        positionId: item.positionId,
        statusId: 5,
      });
      if (res.code == 200) {
        ElMessage({
          message: "拟录用成功",
          type: "success",
        });
        getResume();
        resumeBtn.value = false;
      } else {
        ElMessage.error("this is a error message.");
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消修改",
      });
    });
};

/***
 * 邀约面试
 */
let name = ref();
let deliveryId = ref();
const dialogVisible = ref(false);
let dialog = (event: Event, item: any) => {
  name.value = item.userName;
  deliveryId.value = item.deliveryId;
  event.stopPropagation();
  dialogVisible.value = true;
};

let inviteFrom: any = reactive({
  statusId: 4,
});
let inviteInterview = async () => {
  inviteFrom.deliveryId = deliveryId.value;
  dialogVisible.value = false;
  let res: any = await enterprise.modifyResume(inviteFrom);
  if (res.code == 200) {
    ElMessage({
      message: "success",
      type: "success",
    });
    getResume();
  } else {
    ElMessage.error("this is a error message.");
  }
};

/**
 *
 */
let btnImg = ref(true);
let btnSpan = ref(false);
let isOnload = () => {
  if (resumeBtn.value) {
    btnImg.value = false;
    btnSpan.value = true;
  }
};

/**
 * getUserInfo
 */
let resumeUrl = ref();
let showResumeImage = ref(false);
let resumeBtn = ref(true);
let getUserInfo = async (item: any) => {
  itemObj.value = item;
  resumeBtn.value = true;
  if (
    item.deliveryStatus == "通过初筛" ||
    item.deliveryStatus == "面试" ||
    item.deliveryStatus == "拟录用"
  ) {
    resumeBtn.value = false;
  }
  showResumeImage.value = true;
  let res: any = await enterprise.getResumeUrl({
    resumeId: item.resumeId,
  });
  if (res.code == 200) {
    resumeUrl.value = res.data;
  }
};



/***
 * 批量不合适
 */
let batchInappropriate = () => {
  let deliveryId = checkedCities.value.toString();
  ElMessageBox.confirm("你确定要批量修改为不合适嘛?", "确定修改嘛", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res: any = await enterprise.modifyResumeStatus({
        deliveryId,
        statusId: 6,
      });
      if (res.code == 200) {
        ElMessage({
          message: "success",
          type: "success",
        });
        getResume();
        checkedCities.value = [];
        checkAll.value = false;
      } else {
        ElMessage.error("this is a error message.");
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消修改",
      });
    });
};

/***
 * 批量通过初筛
 */
let batchbyFilter = () => {
  let deliveryId = checkedCities.value.toString();
  ElMessageBox.confirm("你确定要批量通过初筛嘛？", "确定修改嘛", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res: any = await enterprise.modifyResumeStatus({
        deliveryId,
        statusId: 3,
      });
      if (res.code == 200) {
        ElMessage({
          message: "success",
          type: "success",
        });
        getResume();
        checkedCities.value = [];
        checkAll.value = false;
      } else {
        ElMessage.error("this is a error message.");
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消修改",
      });
    });
};

/**\
 * 不合适
 */
let inappropriate = (event: Event, item: any) => {
  event.stopPropagation();
  ElMessageBox.confirm(
    `确定该简历不符合录用标准，将其标记为不合适？`,
    "确定修改嘛",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async () => {
      let res: any = await enterprise.modifyResume({
        deliveryId: item.deliveryId,
        interviewAddr: item.interviewAddr,
        interviewName: item.interviewName,
        interviewNote: item.interviewNote,
        interviewPhone: item.interviewPhone,
        interviewTime: item.interviewTime,
        positionId: item.positionId,
        statusId: 6,
      });
      if (res.code == 200) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        getResume();
        resumeBtn.value = true;
      } else {
        ElMessage.error("this is a error message.");
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消修改",
      });
    });
};

/***
 * 通过初筛
 */
let byFilter = (event: Event, item: any) => {
  event.stopPropagation();
  ElMessageBox.confirm("你确定要通过初筛嘛？", "确定修改嘛", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res: any = await enterprise.modifyResume({
        deliveryId: item.deliveryId,
        interviewAddr: item.interviewAddr,
        interviewName: item.interviewName,
        interviewNote: item.interviewNote,
        interviewPhone: item.interviewPhone,
        interviewTime: item.interviewTime,
        positionId: item.positionId,
        statusId: 3,
      });
      if (res.code == 200) {
        ElMessage({
          message: "通过初筛",
          type: "success",
        });
        getResume();
        resumeBtn.value = false;
      } else {
        ElMessage.error("this is a error message.");
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消修改",
      });
    });
};

/**
 * 多选框功能
 */
const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref([]); //选中的数组  选中几个就往里面放几个
let cities = ref([]);
const handleCheckAllChange = (val: any) => {
  checkedCities.value = val ? cities.value : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: any[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < cities.value.length;
};

/**
 * 获取应聘阶段下拉框
 */
let applicationStage: any = ref([]);
let stageValue = ref();
let getStage = async () => {
  let res: any = await enterprise.getStage({});
  if (res.code == 200) {
    applicationStage.value = res.data;
  } else {
    ElMessage.error("this is a error message.");
  }
};
getStage();

/**
 * 获取投递职位下拉框
 */
let allPositions: any = ref([]);
let positionDropValue = ref();
let getPositionDrop = async () => {
  let res: any = await enterprise.getPositionDrop();
  if (res.code == 200) {
    allPositions.value = res.data;
  } else {
    ElMessage.error("this is a error message.");
  }
};
getPositionDrop();

/**获取学历下拉框 */
let educationList: any = ref([]);
let educationValue = ref();
let getEducation = async () => {
  let res: any = await enterprise.getEducation({});
  if (res.code == 200) {
    educationList.value = res.data;
  } else {
    ElMessage.error("this is a error message.");
  }
};
getEducation();

/**
 * 获取个人信息名片列表
 */
let cardList: any = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref();
let getResume = async () => {
  let res: any = await enterprise.getResume({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    companyId: companyId.value,
  });
  if (res.code == 200) {
    total.value = res.data.maxCount;
    cardList.value = res.data.data;
    cities.value = cardList.value.map((item: any) => {
      return item.deliveryId;
    });
  } else {
    ElMessage.error("this is a error message.");
  }
};
/**
 * 模糊查询
 */
let fuzzyQuery = async () => {
  let res: any = await enterprise.getResume({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    companyId: companyId.value,
    deliveryStatus: stageValue.value,
    educationId: educationValue.value,
    positionId: positionDropValue.value,
    userName: userName.value,
    invitationStatus: invitationStatus.value,
  });
  if (res.code == 200) {
    ElMessage({
      message: "success",
      type: "success",
    });
    cardList.value = res.data.data;
    cities.value = cardList.value.map((item: any) => {
      return item.deliveryId;
    });
    console.log(cities);

  } else {
    ElMessage.error("this is a error message.");
  }
  return res
};

//进入页面获取positionType
async function searchPositionType() {
  let positionTypeId = sessionStorage.getItem("positionTypeId");
  if (positionTypeId) {
    positionDropValue.value = Number(positionTypeId);
    await fuzzyQuery();
    sessionStorage.removeItem('positionTypeId');
  } else {
    return getResume()
  }
}

(async function () {
  await getEnterpriseInfo();
  await searchPositionType();
})();
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  padding: 12px;
  padding-bottom: 0;
}

:deep(.el-dialog) {
  border-radius: 6px;
}

.input-width {
  width: 200px;
}

.input-text {
  width: 400px;
}

.candidate {
  .youyue {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .main {
    min-height: 50vh;
    padding: 0 !important;

    :deep(.el-dialog__close) {
      font-size: 33px !important;
      margin-left: 60px;
      margin-bottom: 60px !important;
      color: #ffffff;
    }

    :deep(.el-dialog__header) {
      padding: 0;
      padding-bottom: 0;
    }

    :deep(.el-dialog) {
      margin-top: 20px;
      background: #e8e8e8;
      text-align: center;
    }

    :deep(.el-dialog__body) {
      padding: 0;
    }

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
        padding: 18px 20px;
        border-radius: 40px;
        color: #ffffff;

        img {
          width: 20px;
          height: 20px;
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