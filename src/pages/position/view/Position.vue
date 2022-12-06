<template>
  <Layout></Layout>
  <div class="position-page">
    <div class="position-header flex-ja-center" ref="tab-box">
      <div
        class="head-nav flex-ja-center cur-po"
        :class="currentIndex== 0?'active':''"
        @click="tab(0)"
      >
        <div class="nav-title">
          <span>在招中</span>
          <span class="fs-12 num">{{recruitNum}}</span>
        </div>
        <div class="bottom-line"></div>
      </div>
      <div
        class="head-nav flex-ja-center cur-po"
        :class="currentIndex== 1?'active':''"
        @click="tab(1)"
      >
        <div class="nav-title">
          <span>已下线</span>
          <span class="fs-12 num">{{downNum}}</span>
        </div>
        <div class="bottom-line"></div>
      </div>
    </div>
    <div class="position-content">
      <div class="tab1" v-show="currentIndex== 0">
        <div class="job wrap">
          <div class="job-head just-between">
            <div>
              <div class="fs-14">
                职位刷新点数
                <span class="point-num">{{orderNum}}</span>
              </div>
              <div class="fs-12 mt-10">若当日点数用尽，次日凌晨会自动补充新点数</div>
            </div>
            <div>
              <div class="release-btn align-center cur-po" @click="to('/positionInfo')">
                <span class="fs-30">+</span>
                <span>发布职位</span>
              </div>
            </div>
          </div>
          <div class="job-box mb-15" v-for="item in positionList" :key="item.userId">
            <div class="info-job just-between">
              <div class="job-title fs-18">
                <div class="mb-15 align-center">
                  <span>{{item.positionName}}</span>
                  <span v-if="item.positionStatus2==0" class="tip-span">审核中</span>
                  <span v-if="item.positionStatus2==2" class="tip-span warning">审核未通过</span>
                </div>
                <div class="info-list align-center">
                  <div class="money-num mr-15">10-15k</div>
                  <div class="align-center fs-14">
                    <div>{{item.positionNature==0?'全职':'实习'}}</div>
                    <div class="bor"></div>
                    <div>大专</div>
                    <div class="bor"></div>
                    <div>北京</div>
                    <div class="bor"></div>
                    <div>{{item.positionType}}</div>
                  </div>
                </div>
              </div>
              <div class="resume-info flex-ja-center">
                <div class="resume-box cur-po" @click="toSearchPositon(item.positionId)">
                  <div class="resume-num">{{item.newResumeCount}}</div>
                  <div class="mt-10 fs-14">新简历</div>
                </div>
                <div class="resume-box cur-po" @click="toSearchPositon(item.positionId)">
                  <div class="resume-num">{{item.resumeCount}}</div>
                  <div class="mt-10 fs-14">总简历</div>
                </div>
              </div>
              <div class="refresh-info align-center">
                <el-button v-if="item.positionStatus2!=1" color="#a8abb2" plain disabled>自动刷新</el-button>
                <el-button v-else color="#356ffa" plain @click="autoRefrensh(item.positionId)">自动刷新</el-button>
                <el-button v-if="item.positionStatus2!=1" color="#a8abb2" plain disabled>刷新</el-button>
                <el-button @click="refresh(item.positionId)" v-else color="#356ffa">刷新</el-button>
              </div>
            </div>
            <div class="edit-job just-between fs-14">
              <div v-if="item.refreshTime">
                刷新时间 :
                <span>&nbsp; {{item.refreshTime}}</span>
              </div>
              <div v-else>
                创建时间 :
                <span>&nbsp; {{item.createTime}}</span>
              </div>
              <div class="align-center">
                <div class="cur-po" @click="setPosition(item.positionId)">编辑</div>
                <div class="bor"></div>
                <div class="cur-po" @click="setPositionStatus(item.positionId,item.positionStatus)">停止招聘</div>
                <div class="bor"></div>
                <div class="cur-po" @click="deleteClick(item.positionId,item.positionStatus)">删除</div>
              </div>
            </div>
          </div>
          <div class="just-center mt-20 mb-20" v-if="recruitNum>10">
            <el-pagination
              :background="true"
              v-model:currentPage="pageNum"
              v-model:page-size="pageSize"
              layout="prev, pager, next"
              :total="recruitNum"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
      <div class="tab2" v-show="currentIndex==1">
        <div class="void-box void-title flex-ja-center" v-show="downNum==0">
          <div class>
            <img src="@/assets/images/img-no_position.png"   />
            <div class="mt-15">暂无已下线职位</div>
          </div>
        </div>
        <div class="void-box" v-show="downNum!=0">
          <div class="pb-30 wrap">
            <div class="job-head2 just-between">
              <div></div>
              <div>
                <div class="release-btn align-center cur-po" @click="to('/positionInfo')">
                  <span class="fs-30">+</span>
                  <span>发布职位</span>
                </div>
              </div>
            </div>
            <div class="job-box" v-for="item in downPositionList" :key="item.userId">
              <div class="info-job just-between">
                <div class="job-title fs-18">
                  <div class="mb-15 align-center">
                    <span>{{item.positionName}}</span>
                    <span v-if="item.positionStatus2==0" class="tip-span">审核中</span>
                    <span v-if="item.positionStatus2==2" class="tip-span warning">审核未通过</span>
                  </div>
                  <div class="info-list align-center">
                    <div class="money-num mr-15">10-15k</div>
                    <div class="align-center fs-14">
                      <div>{{item.positionNature==0?'全职':'实习'}}</div>
                      <div class="bor"></div>
                      <div>大专</div>
                      <div class="bor"></div>
                      <div>北京</div>
                      <div class="bor"></div>
                      <div>{{item.positionType}}</div>
                    </div>
                  </div>
                </div>
                <div class="resume-info flex-ja-center">
                  <div class="resume-box cur-po" @click="toSearchPositon(item.positionId)">
                    <div class="resume-num">{{item.newResumeCount}}</div>
                    <div class="mt-10 fs-14">新简历</div>
                  </div>
                  <div class="resume-box cur-po" @click="toSearchPositon(item.positionId)">
                    <div class="resume-num">{{item.resumeCount}}</div>
                    <div class="mt-10 fs-14">总简历</div>
                  </div>
                </div>
                <div class="refresh-info align-center">
                  <div class="cur-po" @click="setPosition(item.positionId)">编辑</div>
                  <div class="bor"></div>
                  <div class="cur-po" @click="setPositionStatus(item.positionId,item.positionStatus)">开始招聘</div>
                  <div class="bor"></div>
                  <div class="cur-po" @click="deleteClick(item.positionId,item.positionStatus)">删除</div>
                </div>
              </div>
            </div>

            <div class="just-center mt-20" v-if="downNum>10">
              <el-pagination
                :background="true"
                v-model:currentPage="pageNum2"
                v-model:page-size="pageSize2"
                layout="prev, pager, next"
                :total="downNum"
                @current-change="handleCurrentChange2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterBar></FooterBar>
  <div class="dialog-box">
    <el-dialog v-model="centerDialogVisible" center>
      <img class="back-img" src="@/assets/images/default_v.png" />
      <div class="text">
        <div class="text-black fs-16">您当前账户中暂无 &nbsp; "自动刷新卡"</div>
        <div class="mt-25 text-gray">
          现在升级会员即可
          <span class="text-yellow">获赠 “自动刷新卡”</span>
        </div>
        <div class="mt-25 text-black">更多权益也可一起解锁</div>
        <div class="list mt-15">
          <div class="align-center">
            <img src="@/assets/images/icon-home_vipbanner1.png" />
            <span class="ml-10">在招职位数量解锁</span>
          </div>
          <div class="align-center ml-25">
            <img src="@/assets/images/icon-home_vipbanner2.png" />
            <span class="ml-10">更多职位刷新点数</span>
          </div>
          <div class="align-center mt-15">
            <img src="@/assets/images/icon-home_vipbanner4.png" />
            <span class="ml-10">更多主动下载简历点数</span>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="btn" @click="to('/memberCenter')">查看会员权益</div>
      </div>
    </el-dialog>
  </div>
  <div class="dialog-box">
    <el-dialog v-model="centerDialogVisible2" center>
      <img class="back-img" src="@/assets/images/default_v.png" />
      <div class="text">
        <div class="text-black fs-16">今日刷新点数已用完</div>
        <div class="mt-25 text-black">
          若需要更多刷新点数，请升级
          <span class="text-yellow">VIP会员</span>
        </div>
        <div class="card">
          <div class="center">
            <img src="@/assets/images/icon-tag1.png"  />
            自动刷新卡
          </div>
        </div>
      </div>

      <div class="foot mt-30">
        <div class="btn" @click="to('/memberCenter')">查看会员权益</div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import Layout from "@/components/layout/Layout.vue";
import { usePositionStore } from "@/stores/position";
import { useHomeStore } from "@/stores/home";
import { useSearchStore }  from "@/stores/searchPosition";
import {storeToRefs} from 'pinia'
import FooterBar from "@/components/footer/footerBar.vue";
import { onMounted, ref, provide } from "vue";
import { useRouter } from "vue-router";
import { Position } from "@element-plus/icons-vue";
let use = usePositionStore();
let { getEnterprise } = useHomeStore();

const centerDialogVisible = ref(false);
const centerDialogVisible2 = ref(false);
const recruitNum = ref(0);
const orderNum = ref(0);
const downNum = ref(0);
const pageNum = ref(1);
const pageMax = ref(0);
const pageSize = ref(10);
const pageNum2 = ref(1);
const pageSize2 = ref(10);
const pageMax2 = ref(0);
const positionList:any = ref([]);
const downPositionList:any = ref([]);
const autoRefrensh=function(positionId:any){
  centerDialogVisible.value = true
}
onMounted(() => {
  getPositionList();
  getDownList();
});
const toSearchPositon=function(id:number){
  // let {setSearchPosition}=useSearchStore();
  // console.log(id);
  sessionStorage.setItem('positionTypeId',String(id))
  // setSearchPosition(id);
  window.location.href='resume.html'
}
const refresh = function (positionId: any) {
  if (orderNum.value > 0) {
    ElMessageBox.confirm(
      `今日剩余刷新点数：${orderNum.value}，是否刷新该职位？`,
      "确认刷新该职位吗",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "success",
      }
    ).then(async () => {
      let res = await use.refreshPosition({
        positionId,
      });
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "刷新成功",
        });
        getPositionList();
        getDownList();
      } else {
        ElMessage({
          type: "warning",
          message: "刷新失败",
        });
      }
    });
  } else {
    centerDialogVisible2.value = true;
  }
};
//停止招聘
const setPositionStatus = async function (
  positionId: any,
  setStatusNum: number
) {
  if (setStatusNum == 1) {
    ElMessageBox.confirm("是否确认停止该职业的招聘该职位?", "", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      let res = await use.updatePositionStatus({
        positionId,
        positionStatus: 2,
      });
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "已下线",
        });
        recruitNum.value--;
        if(pageNum.value!=1 && (recruitNum.value%pageSize.value==0)){
          pageNum.value--;
        }
        getPositionList();
        getDownList();
      } else {
        ElMessage({
          type: "warning",
          message: "操作失败",
        });
      }
    });
  } else if (setStatusNum == 2) {
    let res = await use.updatePositionStatus({
      positionId,
      positionStatus: 1,
    });
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "已上线",
      });
      currentIndex.value=0;
        downNum.value--;
        if(pageNum2.value!=1 && (downNum.value%pageSize2.value==0)){
          pageNum2.value--;
        }
      getPositionList();
      getDownList();
    }
  }
};
//在招分页：
const handleCurrentChange = async (val: number) => {
  pageNum.value = val;
  getPositionList();
};
//下线分页：
const handleCurrentChange2 = async (val: number) => {
  pageNum2.value = val;
  getDownList();
};
//获取在招分页页面的数据
let getPositionList = async function () {
  let res = await use.getPosition({
    pageIndex: pageNum.value,
    pageSize: pageSize.value,
    positionStatus: 1,
  });
  let res2 = await getEnterprise({});

  if (res.code == 200) {
    positionList.value = res.data ? res.data.data : [];
    recruitNum.value = res.data ? res.data.maxCount : 0;
  }
  if (res2.data.sevenRefreshPositionCount) {
    orderNum.value = res2.data ? res2.data.refreshPositionCount : 0;
  }
};
//获取下线分页数据
const getDownList = async function () {
  let res = await use.getPosition({
    pageIndex: pageNum2.value,
    pageSize: pageSize2.value,
    positionStatus: 2,
  });
  if (res.code == 200) {
    downNum.value = res.data ? res.data.maxCount : 0;
    downPositionList.value = res.data ? res.data.data : [];
  }
};
let deletePosition = function (params: any) {
  return use.deletePosition(params);
};
const deleteClick = function (positionId: any, positionStatus: any) {
  ElMessageBox.confirm("删除后将无法恢复", "是否确认删除该职位?", {
    confirmButtonText: "确认删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res1 = await deletePosition({
        positionId,
        positionStatus:Number(positionStatus),
      });
      if (res1.code == 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getPositionList();
        getDownList();
      } else {
        ElMessage({
          type: "warning",
          message: "删除失败",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
const router = useRouter();
const currentIndex = ref(0);
const tab = function (num: number) {
  currentIndex.value = num;
};
const to = function (path: string) {
  window.location.href=path+'.html'
};
const setPosition = function (id: any) {
  window.location.href=`positionDetails.html?positionId=${id}`
};
</script>
<style lang="scss" scoped>
.dialog-box {
  position: relative;
  border-radius: 20px;
  .card {
    background: linear-gradient(143deg, #2d2d2d, #000);
    margin-top: 32px;
    height: 46px;
    width: 132px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    .center {
      width: 126px;
      height: 40px;
      box-sizing: border-box;
      border-radius: 1px;
      border: 1px solid #6d6d6d;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      background: linear-gradient(143deg, #2d2d2d, #000);
      position: relative;
      color: rgb(255, 228, 203);
      background-image: url('@/assets/images/icon-back1_img.png');
      background-repeat: no-repeat;
      background-size: 47px 40px;
      background-position: right top;
      img {
        position: absolute;
        height: 25px;
        position: absolute;
        left: -1px;
        top: -18px;
        z-index: 99;
      }
    }
  }
  .back-img {
    width: 150px;
    height: 220px;
    position: absolute;
    top: 0;
    z-index: 1;
    right: 0;
    opacity: 0.15;
  }
  .text {
    padding: 40px 0 32px 50px;
    .text-black {
      color: #17233d;
    }
    .text-gray {
      color: #515a6e;
    }
    .text-yellow {
      color: #884900;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    img {
      width: 28px;
      height: 28px;
    }
  }
  .foot {
    padding: 0 60px 52px 0;
    display: flex;
    justify-content: flex-end; // justify-content: right;
    .btn {
      width: 156px;
      text-align: center;
      height: 44px;
      line-height: 44px;
      background: linear-gradient(128deg, #fee8cd, #e2ae7e);
      border-radius: 2px;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: #4c2c0e;
      cursor: pointer;
    }
  }
  :deep(.el-dialog) {
    width: 505px;
    min-height: 310px;
    // height: 100%;
    border-radius: 4px;
    // box-sizing: border-box;
  }
  :deep(.el-dialog__header) {
    padding: 0 !important;
    margin: 0 !important;
  }
  :deep(.el-dialog__body) {
    // height: 100px;
    padding: 0;
  }
  :deep(.el-dialog__headerbtn) {
    z-index: 2;
  }
}
.position-page {
  min-width: 1200px;
}
.position-header {
  height: 55px;
  position: relative;

  box-shadow: 0px 3px 5px #e9e9e9;
  .head-nav {
    width: 290px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .nav-title {
      position: relative;
      .num {
        position: absolute;
        left: 58px;
      }
    }
  }
  .active {
    font-weight: 700;
  }
  .active .bottom-line {
    position: absolute;
    width: 55px;
    height: 3px;
    background-color: #356ffa;
    bottom: 0;
    left: 42%;
    border-radius: 10px;
  }
}
.position-content {
  overflow: hidden;
  width: 100%;
  background-color: #f6f7f9;
  .tab2 {
    background-color: white;
    overflow: hidden;
    color: black;
    .void-box {
      min-height: calc(100vh - 55px);

      text-align: center;
      img {
        width: 240px;
        height: 210px;
      }
    }
    .void-title {
      color: #515a6e;
    }
    .job-head2 {
      margin: 35px 0;
      .release-btn {
        gap: 10px;
        font-size: 16px;
        padding: 4px 20px;
        background-color: #356ffa;
        color: white;
        border-radius: 2px;
      }
    }
    .info-job {
      padding: 25px 0 !important;
    }
    .bor {
      height: 9px;
      border-left: 2px solid rgb(197, 200, 206);
      margin: 0 6px;
    }

    .refresh-info {
      font-size: 14px;
      .cur-po {
        color: #515a6e;
      }
      .cur-po:hover {
        color: #356ffa;
      }
    }
  }
  .job {
    box-sizing: border-box;
    overflow: hidden;
    min-height: calc(100vh - 55px);
    padding-bottom: 120px;
  }
  .job-head {
    .point-num {
      color: #356ffa;
    }
    .release-btn {
      gap: 10px;
      font-size: 16px;
      padding: 4px 20px;
      background-color: #356ffa;
      color: white;
      border-radius: 2px;
    }
    color: #515a6e;
    margin: 35px 0;
  }
  .job-box {
    background-color: #fff;
    .info-job {
      padding: 30px 25px;
      border-bottom: 2px solid #f6f7f9;
      .job-title {
        width: 400px;
        .tip-span {
          // min-width: 50px;
          // height: 20px;
          box-sizing: border-box;
          border-radius: 2px;
          border: 1px solid #445e9b;
          margin-left: 12px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: #445e9b;
          line-height: 18px;
          text-align: center;
          padding: 0 4px;
        }
        .warning {
          color: #ed4112;
          border: 1px solid #ed4112;
        }
      }
      .info-list {
        color: rgb(81, 90, 110);

        .bor {
          height: 9px;
          border-left: 2px solid rgb(197, 200, 206);
          margin: 0 10px;
        }
      }
      .resume-info {
        color: #515a6e;
        .resume-box {
          padding: 0 35px;
        }
        .resume-box:hover {
          .resume-num {
            color: #356ffa;
          }
        }
        .resume-num {
          text-align: center;
        }
      }
      .money-num {
        color: #f75736;
      }

      .refresh-info {
        gap: 0 12px;
        :deep(.el-button) {
          font-size: 16px;
          box-sizing: border-box;
          padding: 17px 15px;
        }
        :deep(.el-button + .el-button) {
          margin-left: 0;
          padding: 17px 20px;
        }
        .autorefresh-btn {
          box-sizing: border-box;
          padding: 7px 12px;
          border: 1px solid #356ffa;
          color: #356ffa;
          border-radius: 4px;
          transition: all 0.3s;
        }
        .autorefresh-btn:hover {
          background-color: #356ffa;
          color: white;
        }
        .refresh-btn {
          padding: 7px 15px;
          color: white;
          border: 1px solid #356ffa;
          border-radius: 4px;
          background-color: #356ffa;
        }
      }
    }
    .edit-job {
      color: #515a6e;
      padding: 18px 25px;
      .cur-po:hover {
        color: #356ffa;
      }
      .bor {
        height: 10px;
        border-left: 2px solid rgb(197, 200, 206);
        margin: 0 16px;
      }
    }
  }
}
.pl-10 {
  padding-left: 10px;
}
.plr-5 {
  padding: 0 5px;
}
.flex-al {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.cur-po {
  cursor: pointer;
}
.fs-30 {
  font-size: 28px;
}
.pb-30 {
  padding-bottom: 120px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.mt-25 {
  margin-top: 15px;
}
.ml-25 {
  margin-left: 25px;
}
.mt-15 {
  margin-top: 15px;
}
.mt-18 {
  margin-top: 18px;
}
.ml-10 {
  margin-left: 10px;
}
.mt-30{
margin-top: 30px;
}
</style>