<script lang="ts" setup>
import { ref, reactive, type Ref, watch } from "vue";
import FooterBar from "@/components/footer/footerBar.vue";
import { usePersonStore } from "@/stores/person";
import { useHomeStore } from "@/stores/home";
import cityJson from "@/assets/json/city.json";
interface Check {
    id: number,
    label: string | number,
    value: string | number,
}
let PersonStore = usePersonStore();//引入personStore这个状态管理
let HomeStore = useHomeStore();//引入homeStore这个状态管理
let form = reactive({
    sex: null,//性别
    education: null,//学历
    professional: null,//专业
    industry: null,//行业
    city: null,//城市
    wishMoneyLeft: null,//最低薪资
    wishMoneyRight: null,//最高薪资
});//这个是模糊查询

let inviationNumber = ref(0);//这个是当日邀请次数

let invitationUserId = ref();//邀请的人才id；

let checkPosition = ref();//邀请人才干什么活
let paging = reactive({
    total: 100,
    pageSize: 3,
    pageIndex: 1,
});//邀请人员分页

//邀请人员后一个页面的分页
let pagingInvite = reactive({
    total: 100,
    pageSize: 3,
    pageIndex: 1,
})

const dialogFormVisible = ref(false);//弹出弹层


//这个是监听页数
watch(paging, () => {
    //监听页数更改直接调用获取人才列表的接口
    getTalentList();
})

let showGuid = ref(false);//展示导航
let circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
let checkItem = ref(0);//默认展示哪个页面

//切换页面
let handleItemChange = (index: number) => {
    checkItem.value = index;
}

//是否展开导航
let handleGuideChange = (bool: boolean) => {
    showGuid.value = bool;
}

//清空选择的方法
let cancelCheck = () => {
    for (const key in form as any) {
        form[key] = null;
    }
}

let educationArr = reactive<Check[]>([]);//学历的列表
let majorArr = reactive<any[]>([]);//专业的列表
let sexArr = reactive<any[]>([]);//性别的列表
let positionArr = reactive<any[]>([]);//职位列表
let wishMoneyLeftList = reactive<any[]>([]);//这个是期望薪资左边的列表
let wishMoneyRightList = reactive<any[]>([]);//这个是期望薪资右边的列表
let talentList = reactive<any[]>([]);//这个是人才列表
let positionCategoryList = reactive<any[]>([]);//这个是获取职位类别的数组
let invitationList = reactive<any[]>([]);//这个是邀请人才的列表
//这个是学历的列表
let getEducationList = async () => {
    let res = await PersonStore.getEducation();
    if (res.code !== 200) return;
    let resData = (res.data).reverse();//获取学历数据
    console.log('学历列表');
    console.log(resData);
    educationArr.push(...resData);
}
getEducationList();//调用获取学历列表

//这个是获取邀请次数的方法
let getInvationsNumber = async () => {
    let res = await HomeStore.getEnterprise({
        userId: 10000,
    })
    if (res.code != 200) return;
    inviationNumber.value = res.data.invitationTalentCount;
}
getInvationsNumber();

//这个是获取专业列表的方法
let getProfessionalList = async () => {
    let res = await PersonStore.getMajorList();
    if (res.code !== 200) return;
    majorArr.length = 0;
    majorArr.push(...(res.data));
}
getProfessionalList();//调用获取专业列表

//这个是获取性别列表的方法
let getSexList = async () => {
    let res = await PersonStore.getSexList();
    if (res.code !== 200) return;
    sexArr.push(...(res.data));
}
getSexList();

//这个是获取职位列表的方法
let getPositionList = async () => {
    let res = await PersonStore.getPositionList({
        userId: 10000,
    });
    positionArr.push(...(res.data))
}
getPositionList();

//获取期望薪资的接口
let getWishMoneyList = async () => {
    let res = await PersonStore.getWishMoney();
    wishMoneyLeftList.push(...(res.data).wishMoenyLeftList);
    wishMoneyRightList.push(...(res.data).wishMoenyRightList);
}
getWishMoneyList();

//获取到人才的列表
let getTalentList = async () => {
    let obj = {};
    for (const key in form) {
        if(form[key]){
            obj[key] = form[key];
        }
    }
    obj['pageIndex'] = paging.pageIndex;
    obj['pageSize'] = paging.pageSize;
    console.log('-------这个是获取人才------');
    console.log(obj);
    console.log(form);
    let res = await PersonStore.getTalentList(obj);
    if (res.code != 200) return;
    talentList.length = 0;
    talentList.push(...(res.data).talentList);
    paging.total = res.data.totalCount;
    console.log(paging);
    console.log(res.data.talentList);
}
getTalentList();

//邀请人才的方法;
let inviteTalent = async () => {
    console.log(invitationUserId);
    let res = await PersonStore.inviteTalent({
        inviteUserId: invitationUserId.value,
        userId: 10000,
    });
    dialogFormVisible.value = false;
    if(res.code !==200){
        console.log('邀请人才接口报错');
    }else{
        console.log('邀请人才成功!!');
    }
}

//获取邀请人才列表
let inviteTalentList = async ()=>{
    let res = await PersonStore.getInviteList({
        userId:10000,
    })
    if(res.code !== 200) return;
    invitationList.length = 0;
    invitationList.push(...(res.data.talentList));
    pagingInvite.total = res.data.totalCount;
    console.log('邀请人才的列表');
    console.log(res);
}
inviteTalentList();

//这个是邀请投递的弹层

//邀请的哪个人才
let invitationPost =async (userId:number)=>{
    dialogFormVisible.value = true;
    invitationUserId.value = userId;
    // 这个里面需要调用回显人才信息的接口
    //再之后没有了
}

//获取职位类别
let getPositionCategory = async ()=>{
    let res = await PersonStore.getPosition();
    console.log('获取职位类别');
    console.log(res);
    if(res.code !== 200) return;
    // positionDownList: (2) [{…}, {…}]
    // positionTypeId: "1"
    // positionTypeName: "互联网"
    // sortId: 1
    let data = res.data;
    data.forEach(item => {
        item.positionDownList.forEach(child=>{
            child['positionTypeName'] = child['positionName'];
        })
    });
    positionCategoryList.push(...(data));
}
getPositionCategory();
let getMoney = (data:string)=>{
    if(!data) return '';
    let res = data.split(",").sort((a,b)=>{ return a - b});
    return `${res[0]}-${res[1]}k`
}
</script>
<template>
    <div class="personnel">
        <div class="operation-wrap box-shadow">
            <div class="wrap operation-container fs-18">
                <div class="operation-item" @click="handleItemChange(0)">
                    <p :class="[checkItem == 0 ? 'span-check' : '']">人才库</p>
                    <div :class="[checkItem == 0 ? 'btm-check' : '']"></div>
                </div>
                <div class="operation-item" @click="handleItemChange(1),inviteTalentList()">
                    <p :class="[checkItem == 1 ? 'span-check' : '']">我邀请的</p>
                    <div :class="[checkItem == 1 ? 'btm-check' : '']"></div>
                </div>
            </div>
        </div>

        <!-- 这个是疑问咨询的图片 -->
        <!-- <div :class="['consulting-service', 'absolute-wrap', showGuid ? 'close-animate' : 'show-animate']">
            <div class="top">
                <img src="@/assets/images/company_fanjia_3.png" class="or-code">
                <p class="tip fs-12">如有任何疑问请咨询</p>
            </div>
            <img src="@/assets/images/icon-close.png" @click="handleGuideChange(true)">
        </div> -->

        <!-- 这个是点击弹出咨询的容器 -->
        <!-- <div class="seek-advice absolute-wrap box-shadow" v-show="showGuid" @click="handleGuideChange(false)">
            <img src="@/assets/images/icon-kefu.png">
        </div> -->

        <!-- 人才数据的页面 -->
        <div class="talent-pool-wrap" v-show="checkItem == 0">

            <!-- 模糊查询的列表 -->
            <div class="wrap filter-wrap">
                <div class="filter-wrap-top">
                    <el-select v-model="form.sex" class="m-2 check-sex mr-30" placeholder="性别选择" size="large">
                        <el-option v-for="item in sexArr" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-select v-model="form.education" class="m-2 check-education mr-30" placeholder="最高学历选择"
                        size="large">
                        <el-option v-for="item in educationArr" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-select v-model="form.professional" class="m-2 check-education mr-30" placeholder="专业选择"
                        size="large">
                        <el-option v-for="item in majorArr" :key="item.sortId" :label="item.professionalName"
                            :value="item.sortId" />
                    </el-select>
                    <el-cascader v-model="form.industry" placeholder="意向职位" :props="{'children':'positionDownList','label':'positionTypeName','value':'positionTypeId'}"	 class="check-education mr-30" :options="positionCategoryList" clearable />
                </div>
                <div class="filter-wrap-btm">
                    <div class="check">
                        <el-cascader v-model="form.city" class="mr-30 check-education m-2" placeholder="意向城市选择"
                            :options="cityJson" :props="{ 'label': 'name', 'value': 'code' }" clearable />
                        <el-select v-model="form.wishMoneyLeft" class="m-2 check-salary mr-15" placeholder="期望薪资选择"
                            size="large">
                            <el-option v-for="item in wishMoneyLeftList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <span class="fs-14">至</span>
                        <el-select v-model="form.wishMoneyRight" class="m-2 check-salary ml-15" placeholder="期望薪资选择"
                            size="large">
                            <el-option v-for="item in wishMoneyRightList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="operation">
                        <el-button type="primary" plain @click="getTalentList()">确定</el-button>
                        <el-button type="info" plain @click="cancelCheck()">清空</el-button>
                    </div>
                </div>
            </div>

            <!-- 查询数据内容 -->
            <div class="wrap data-wrap">
                <div class="search-tip-wrap">
                    <span class="fs-14">邀请点数</span>
                    <span class="fs-16 ml-5 cl-blue">{{ inviationNumber }}</span>
                    <span class="fs-12 ml-15 cl-ccc">若当日点数用尽，次日凌晨会自动补充新点数</span>
                </div>

                <!-- 每一项数据 -->
                <div class="data-item" v-for="item in talentList" :key="item.id">

                    <!--头像-->
                    <div class="cbleft1">
                        <el-avatar :size="72" :src="item.userLogoUrl ? item.userLogoUrl : circleUrl" />
                    </div>

                    <!-- 人名与最高学历 -->
                    <div class="cbleft2 ml-16">
                        <p class="name fs-18">{{item.userName ? item.userName : '费小姐'}}</p>
                        <div class="description mt-16 cl-ccc">
                            <p class="fs-12">{{ item.userAge ? item.userAge : '24' }}岁</p>
                            <div class="line"></div>
                            <p class="fs-12">{{ item.userEducation ? item.userEducation : '硕士' }}</p>
                        </div>
                    </div>

                    <!-- 教育经历 -->
                    <div class="cbleft3 ml-48 cl-ccc">
                        <p class="titlest fs-12 ml-16">教育经历</p>
                        <div class="school-name">
                            <div class="coursor"></div>
                            <p class="fs-14 ml-12">大连理工大学</p>
                        </div>
                        <div class="school-description fs-12 ml-16">
                            <p>材料科学与工程</p>
                            <div class="line"></div>
                            <p>硕士</p>
                        </div>
                    </div>

                    <!-- 求职意向 -->
                    <div class="cbleft4 cl-ccc ml-40">
                        <p class="titlest fs-12 ml-28">求职意向</p>
                        <div class="occupation-item mt-16">
                            <img src="@/assets/images/icon-dingwei.png" class="icon">
                            <p class="description fs-14 ml-12">{{ item.wishAddr ? item.wishPosition :
                                    '辽宁省-大连市、辽宁省-沈阳市、吉林省-长春市'
                            }}</p>
                        </div>
                        <div class="occupation-item mt-12">
                            <img src="@/assets/images/icon-bangong.png" class="icon">
                            <p class="description fs-14 ml-12">{{ item.wishPosition ? item.wishAddr :
                                    '审计专员/助理、物流专员/经理、人事专员/助理、市场营销、行政专员/助理'
                            }}</p>
                        </div>
                        <div class="occupation-item mt-16">
                            <img src="@/assets/images/icon-qianbi.png" class="icon">
                            <p class="description fs-14 ml-12">{{ item.wishMoney ? getMoney(item.wishMoney) : '3-50k' }}</p>
                        </div>
                    </div>

                    <!-- 活跃时间 -->
                    <div class="cbleft5">
                        <p class="titlest fs-12 cl-ccc">{{ item.lastLoginTime }}活跃</p>
                        <el-button type="primary" class="mt-50" @click="invitationPost(item.userId)">邀请投递</el-button>
                    </div>
                </div>
            </div>

            <!-- 分页 -->
            <div class="page-wrap wrap mt-48">
                <div class="page-content">
                    <el-pagination v-model:current-page="paging.pageIndex" :background="true" :pager-count="7"
                      v-model:page-size="paging.pageSize"  layout="prev, pager, next" :total="paging.total" />
                </div>
            </div>
        </div>

        <!-- 我邀请的页面 -->
        <div class="invitation-library-wrap" v-show="checkItem == 1">
            <div class="container wrap" v-show="false">
                <!-- 如果没人邀请显示的页面 -->
                <div class="nolist">
                    <img src="@/assets/images/myinvited_nolist.4b83c481.png">
                    <p class="fs-16 top">暂无学生投递</p>
                    <p class="fs-16">快去人才库中邀请自己心仪的学生吧</p>
                </div>
                <!-- 邀请人才的列表 -->
            </div>
            <div class="invitation wrap">

                <!-- 邀请的选择容器 -->
                <div class="filter-wrap">
                    <el-select v-model="form.sex" class="m-2 check-sex mr-30" placeholder="状态选择" size="large">
                        <el-option v-for="item in sexArr" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-select v-model="form.professional" class="m-2 check-position mr-30" placeholder="意向职位选择"
                        size="large">
                        <el-option v-for="item in positionArr" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-button type="primary" class="btn">确定</el-button>
                </div>

                <!--邀请的列表-->
                <div class="list">
                    <div class="item" v-for="item in invitationList" :key="item.id">
                        <div class="top">
                            <div class="left">
                                <p>投递职位</p>
                                <div class="line"></div>
                                <p>Java开发工程师</p>
                            </div>
                            <div class="right">
                                <p>发送时间</p>
                                <div class="line"></div>
                                <p>2022-11-04 09:39:58</p>
                            </div>
                        </div>
                        <div class="btm">

                            <!--头像-->
                            <div class="cbleft1">
                                <el-avatar :size="72" :src="circleUrl" />
                            </div>

                            <!-- 人名与最高学历 -->
                            <div class="cbleft2 ml-16">
                                <p class="name fs-18">{{item.userName ? item.userName : '费小姐'}}</p>
                                <div class="description mt-16 cl-ccc">
                                    <p class="fs-12">{{ item.userAge ? item.userAge:'24' }}岁</p>
                                    <div class="line"></div>
                                    <p class="fs-12">{{ '硕士' }}</p>
                                </div>
                            </div>

                            <!-- 教育经历 -->
                            <div class="cbleft3 ml-48 cl-ccc">
                                <p class="titlest fs-12 ml-16">教育经历</p>
                                <div class="school-name">
                                    <div class="coursor"></div>
                                    <p class="fs-14 ml-12">大连理工大学</p>
                                </div>
                                <div class="school-description fs-12 ml-16">
                                    <p>材料科学与工程</p>
                                    <div class="line"></div>
                                    <p>硕士</p>
                                </div>
                            </div>

                            <!-- 求职意向 -->
                            <div class="cbleft4 cl-ccc ml-40">
                                <p class="titlest fs-12 ml-28">求职意向</p>
                                <div class="occupation-item mt-16">
                                    <img src="@/assets/images/icon-dingwei.png" class="icon">
                                    <p class="description fs-14 ml-12">{{ '辽宁省-大连市、辽宁省-沈阳市、吉林省-长春市' }}</p>
                                </div>
                                <div class="occupation-item mt-12">
                                    <img src="@/assets/images/icon-bangong.png" class="icon">
                                    <p class="description fs-14 ml-12">{{item.wishPosition ? item.wishPosition : '审计专员/助理、物流专员/经理、人事专员/助理、市场营销、行政专员/助理' }}</p>
                                </div>
                                <div class="occupation-item mt-16">
                                    <img src="@/assets/images/icon-qianbi.png" class="icon">
                                    <p class="description fs-14 ml-12">{{ getMoney(item.wishMoney) }}</p>
                                </div>
                            </div>

                            <!-- 活跃时间 -->
                            <div class="cbleft5">
                                <p class="mt-40 fs-18">{{ '被查看' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="page-wrap wrap mt-48">
                    <div class="page-content">
                        <el-pagination v-model:current-page="pagingInvite.pageIndex" :background="true" :pager-count="7"
                        v-model:page-size="pagingInvite.pageSize" layout="prev, pager, next" :total="pagingInvite.total" />
                    </div>
                </div>
            </div>


        </div>
        <!-- 邀请投递的弹出框 -->
        <el-dialog v-model="dialogFormVisible" class="dialog" width="460px">
            <!-- 弹窗标题 -->
            <h3 class="cl-black fs-26">邀请</h3>
            <!-- 用户信息 -->
            <div class="msg-wrap mt-20">
                <div class="top">
                    <p class="name">王小姐</p>
                    <div class="btn fs-12 ml-15">本科</div>
                </div>
                <div class="btm">
                    <p>南开大学滨海学院</p>
                    <div class="line"></div>
                    <p>环境工程</p>
                </div>
            </div>
            <p class="fs-12 mt-10 post-tips">投递岗位</p>
            <!-- 投递的岗位 -->
            <el-select v-model="checkPosition" class="m-2 check-position mr-30" placeholder="意向职位选择" size="large">
                <el-option v-for="item in positionArr" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <!-- 邀请方式 -->
            <p class="invitation-method mt-15">邀请方式</p>
            <div class="invitation">
                <input type="checkbox" checked disabled>
                <p class="ml-15">应用内邀请&微信推送</p> 
            </div>
            <div class="invitation">
                <input type="checkbox">
                <p class="ml-15">短信同步提醒</p> 
                <p class="cl-blue">触达率200%</p>
            </div>
            <p class="fs-12">本次邀请将扣除1个邀请点数</p>
            <div class="invitation-btn mt-30" @click="inviteTalent()">邀请投递</div>
        </el-dialog>

        <!-- 底部 -->
        <FooterBar></FooterBar>
    </div>
</template>

<style lang="scss" scoped>
.personnel {
    position: relative;

    &>.operation-wrap {
        background: #fff;

        &>.operation-container {
            display: flex;
            justify-content: center;

            &>.operation-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &>p {
                    width: 220px;
                    text-align: center;
                    padding: 8px 16px;
                }

                &>.span-check {
                    font-weight: 800;
                }

                &>.btm-check {
                    display: inline-block;
                    border-radius: 2px;
                    width: 51px;
                    height: 3px;
                    background: #356ffa;
                }
            }

            &>.operation-item:hover {
                cursor: pointer;
            }
        }
    }

    // 这个是咨询
    &>.consulting-service {
        position: relative;
        text-align: center;

        &>.top {
            padding: 12px 12px 0;
            box-shadow: 2px 3px 0 rgb(215 214 214 / 50%);

            &>.or-code {
                width: 88px;
            }

            &>.tip {
                width: 72px;
                margin: 0 auto;
                padding-top: 5px;
                padding-bottom: 12px;
                line-height: 16px;
                text-align: center;
            }
        }

        &>img:hover {
            cursor: pointer;
        }
    }

    //这个是弹出咨询
    &>.seek-advice {
        padding: 10px 10px 6px;

        &>img {
            width: 38px;
        }
    }

    &>.seek-advice:hover {
        cursor: pointer;
    }

    .absolute-wrap {
        position: absolute;
        right: 20px;
        top: 90px;
        z-index: 2;
    }

    &>.talent-pool-wrap {
        &>.filter-wrap {
            padding: 32px 0;
            border-bottom: 1px solid #eef0f2;

            :deep(.check-sex) {
                width: 110px;
            }

            :deep(.check-salary) {
                width: 150px;
            }

            :deep(.el-input__inner) {
                height: 40px;
            }

            &>.filter-wrap-btm {
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }

        &>.data-wrap {
            padding: 24px 0;

            &>.data-item {
                padding: 32px 0 32px;
                display: flex;
                border-bottom: 1px solid #eef0f2;

                &>.cbleft2 {
                    width: 124px;

                    &>.description {
                        display: flex;
                        align-items: center;
                    }
                }

                &>.cbleft3 {
                    width: 280px;

                    &>.school-name {
                        display: flex;
                        align-items: center;

                        &>.coursor {
                            width: 4px;
                            height: 4px;
                            border-radius: 2px;
                            background: #c5c8ce;
                        }

                        &>p {
                            padding: 12px 0;
                        }
                    }

                    &>.school-description {
                        display: flex;
                        align-items: center;
                    }
                }

                &>.cbleft4 {
                    width: 420px;

                    &>.occupation-item {
                        display: flex;
                    }
                }

                &>.cbleft5 {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            }
        }

        &>.page-wrap {
            &>.page-content {
                display: flex;
                justify-content: center;
                padding-bottom: 64px;
                // :deep(.number) {
                //     background: #fff;
                //     border: 1px solid #ccc;
                //     color: #515a6e;
                // }
                // :deep(.btn-quicknext){
                //     background: #fff;
                //     color: #515a6e;
                // }
                // :deep(.is-active){
                //     border-color: #356ffa;
                //     color: #356ffa;
                // }
            }
        }
    }

    &>.invitation-library-wrap {
        background-color: #f6f7f9;
        min-height: calc(100vh - 150px);

        &>.container {
            height: calc(100vh - 260px);
            display: flex;
            justify-content: center;
            align-items: center;

            &>.nolist {
                text-align: center;

                &>img {
                    width: 243px;
                }

                &>p {
                    color: #515a6e;
                }

                &>.top {
                    margin: 12px 0 16px;
                }
            }
        }

        &>.invitation {
            &>.filter-wrap {
                padding: 35px 0;

                :deep(.btn) {
                    padding: 18px 26px;
                }
            }

            &>.page-wrap {
                &>.page-content {
                    display: flex;
                    justify-content: center;
                    padding-bottom: 64px;
                }
            }

            &>.list {
                &>.item {
                    background: #ffff;
                    padding: 0 22px;

                    &>.top {
                        display: flex;
                        justify-content: space-between;
                        padding: 22px 0;

                        &>.left,
                        &>.right {
                            display: flex;
                            align-items: center;
                        }
                    }

                    &>.btm {
                        padding: 32px 0;
                        display: flex;

                        &>.cbleft2 {
                            width: 124px;

                            &>.description {
                                display: flex;
                                align-items: center;
                            }
                        }

                        &>.cbleft3 {
                            width: 280px;

                            &>.school-name {
                                display: flex;
                                align-items: center;

                                &>.coursor {
                                    width: 4px;
                                    height: 4px;
                                    border-radius: 2px;
                                    background: #c5c8ce;
                                }

                                &>p {
                                    padding: 12px 0;
                                }
                            }

                            &>.school-description {
                                display: flex;
                                align-items: center;
                            }
                        }

                        &>.cbleft4 {
                            width: 420px;

                            &>.occupation-item {
                                display: flex;
                            }
                        }

                        &>.cbleft5 {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
    .dialog{
        :deep(& > .el-dialog__body){
            padding:40px;
        }
        & .msg-wrap{
            padding:20px;
            background:#f9f9f9;
            &>.top,&>.btm{
                display:flex;
                align-items:center;
            }
            &>.btm{
                padding:10px 0;
            }
            &>.top{
                &>.btn{
                    padding:5px;
                    background:#e5ebf9;
                }
            }
        }
        & .post-tips{
            padding:14px 0;
        }
        & .invitation-method{
            padding:20px 0;
        }
        & .invitation{
            display:flex;
            padding:10px 0;
            align-items:center;
        }
        & .invitation-btn{
            background-color:#356ffa;
            padding:10px 0;
            color:#fff;
            text-align:center;
        }
    }

    //这个是展开动画
    .show-animate {
        animation-name: showAnimate; //动画名称
        animation-duration: 2s; //动画持续时间
        animation-timing-function: ease; //动画播放速度
        animation-fill-mode: forwards; //动画完毕后停留在那里
    }

    .close-animate {
        animation-name: closeAnimate; //动画名称
        animation-duration: 2s; //动画持续时间
        animation-timing-function: ease; //动画播放速度
        animation-fill-mode: forwards; //动画完毕后停留在那里
    }

    @keyframes showAnimate {
        from {
            transform: translateX(100%);
            opacity: 0;
        }

        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes closeAnimate {
        from {
            transform: translateX(0);
            opacity: 1;
        }

        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    // 这个是关闭动画
    .box-shadow {
        box-shadow: 0 2px 6px 0 #edeff3;
    }

    .ml-30 {
        margin-left: 30px;
    }

    .cl-blue {
        color: #356ffa;
    }

    .cl-ccc {
        color: #808695;
    }

    .ml-16 {
        margin-left: 16px;
    }

    .mt-16 {
        margin-top: 16px;
    }

    .mt-17 {
        margin-top: 17px;
    }

    .ml-48 {
        margin-left: 48px;
    }

    .ml-12 {
        margin-left: 12px;
    }

    .line {
        display: inline-block;
        height: 10px;
        width: 1px;
        margin: 0 8px;
        background: #000;
    }

    .ml-40 {
        margin-left: 40px;
    }

    .icon {
        width: 18px;
        height: 18px;
    }

    .fs-26{
        font-size:26px;
    }

    .ml-28 {
        margin-left: 28px;
    }

    .mt-12 {
        margin-top: 12px;
    }

    .fs-12{
        font-size:12px;
    }

    .mt-48 {
        margin-top: 48px;
    }

    .fw-700 {
        font-weight: 700;
    }

    .mt-50 {
        margin-top: 50px;
    }
    .cl-black{
        color:#000;
    }
}
</style>