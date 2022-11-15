<template>
    <div class="bgdf6f7f9">
        <div class="home wrap">
            <div class="brief-introduction ">
                <div class="top border-btm flex">
                    <div class="left major just-between-2">
                        <div class="flex">
                            <div class="img mr-16">
                                <img class="icon-head-portrait" :src="EnterpriseInfo.companyLogoUrl" alt="">
                            </div>
                            <div class="test">
                                <h1>{{ EnterpriseInfo.companyName }}</h1>
                                <p>{{ EnterpriseInfo.companyFullName }}</p>
                                <p>{{ EnterpriseInfo.companyIndustry }}</p>
                            </div>
                        </div>
                        <div class="major-right just-center">
                            <div class="hover hand" @click="nav('enterpriseRegistra')">
                                <div class="icon mr-11">
                                    <i class="iconfont icon-bianji"></i>
                                </div>
                                <div class="test">编辑企业信息</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-title align-center">
                            <div class="spot"></div>
                            <div class="title ml-8">审核通过</div>
                        </div>
                        <div class="describe ml-16">您现在可以发布职位信息、报名招聘会</div>
                    </div>
                </div>
                <div class="btm justify-content">
                    <div class="btm-item  btm-item_hover hand" @click="nav('position')">
                        <div class="just-between">
                            <div class="left">
                                <h3 class="fs-22 h3">{{ EnterpriseInfo.onlinePositionCount }}</h3>
                                <div class="test">在招职位</div>
                            </div>
                            <div class="right mr-14">
                                <img class="icon-home_right_arrow" src="@/assets/images/icon-home_right_arrow.png"
                                    alt="">
                            </div>
                        </div>
                        <div class="just-between">
                            <div class="bottom">
                                <h3 class="fs-22 h3">{{ EnterpriseInfo.sevenRefreshPositionCount }}</h3>
                                <div class="test">七日内刷新过职位</div>
                            </div>
                            <div class="icon-img">
                                <img class="icon-img" src="@/assets/images/icon-home_banner1.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="btm-item btm-item_hover hand" @click="nav('resume')">
                        <div class="just-between">
                            <div class="left">
                                <h3 class="fs-22 h3">0</h3>
                                <div class="test">新简历</div>
                            </div>
                            <div class="right mr-14">
                                <img class="icon-home_right_arrow" src="@/assets/images/icon-home_right_arrow.png"
                                    alt="">
                            </div>
                        </div>
                        <div class="just-between">
                            <div class="bottom">
                                <h3 class="fs-22 h3">{{ EnterpriseInfo.resumeCount }}</h3>
                                <div class="test">未查看简历</div>
                            </div>
                            <div class="icon-img">
                                <img class="icon-img" src="@/assets/images/icon-home_banner2.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="btm-item">
                        <div class="just-between">
                            <div class="left btm-item_hover">
                                <h3 class="fs-22 h3">147</h3>
                                <div class="test">在职招聘会</div>
                            </div>
                            <div class="right mr-14">
                                <img class="icon-home_right_arrow" src="@/assets/images/icon-home_right_arrow.png"
                                    alt="">
                            </div>
                        </div>
                        <div class="just-between">
                            <div class="bottom">
                                <h3 class="fs-22 h3">0</h3>
                                <div class="test">我报名的</div>
                            </div>
                            <div class="icon-img">
                                <img class="icon-img" src="@/assets/images/icon-home_banner3.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="intention mt-16">
                <div class="just-between">
                    <div class="top">
                        <h3>意向学校
                            <span>{{ schoolLen }}</span>/50
                        </h3>
                        <div class="test">
                            <span class="mr-14 mt-17">请尽量选择更多的意向学校</span>
                            <span><img src="@/assets/images/icon-right.png" alt=""></span>
                        </div>
                    </div>
                    <div class="top-el-button">
                        <el-button type="primary" @click="centerDialogVisible = true">选择意向学校</el-button>
                    </div>
                </div>
                <div class="mt-25 text">
                    {{ change }}
                </div>
            </div>

            <div class="vip mt-16">
                <h3>企业VIP会员</h3>
                <div class="notvip-wrap">
                    <div class="left">
                        <h4>企业版VIP会员</h4>
                        <ul>
                            <li>
                                <img src="@/assets/images/icon-home_vipbanner1.png" alt="">
                                <span>在招职位数量解锁</span>
                            </li>
                            <li>
                                <img src="@/assets/images/icon-home_vipbanner2.png" alt="">
                                <span>更多职位刷新点数</span>
                            </li>
                            <li>
                                <img src="@/assets/images/icon-home_vipbanner3.png" alt="">
                                <span>更多邀请投递点数</span>
                            </li>
                        </ul>
                        <div class="btn-wrap flex">
                            <div class="position-card">
                                <div class="content">
                                    <h5>职位自动刷新卡</h5>
                                    <img class="bg-v" src="@/assets/images/home-vip_V.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="more-btn" @click="nav('memberCenter')">查看更多</div>
                    </div>
                    <img src="@/assets/images/home-banner_ads.png" alt="">
                </div>
            </div>
        </div>

        <footer-bar></footer-bar>

        <!-- 弹层 -->
        <el-dialog class="dialog" v-model="centerDialogVisible" align-center :show-close="false" title="Warning"
            width="800px">
            <template #header>
                <h4 class="dialog_header-h4">请选择意向学校</h4>
                <div class="dialog_header-test">每选择一所高校，您的招聘信息都会在该站点优先展示。建议将您想招的学生学校都选上</div>
            </template>
            <div class="dialog_body">
                <div class="dialog_body-header-r">
                    <div class="dialog_body-header-r_test">
                        <b class="c356ffb"> {{ EnterpriseInfo.companyWishSchool.length }} </b>
                        <span>/50</span>
                    </div>
                </div>
                <div class="mt-10 flex-ja-center">
                    <label class="mr-12">意向学校</label>
                    <el-select v-model="selectValue" size="large" multiple filterable allow-create default-first-option
                        :reserve-keyword="false" placeholder="请输入">
                        <el-option v-for="item in schoolList" :key="item.schoolId" :label="item.schoolName"
                            :value="item.schoolId" />
                    </el-select>
                </div>
                <div class="ml-68">可搜索添加意向学校</div>
                <div class="radioBox flex mt-40">
                    <label class="mr-12">展示范围</label>
                    <el-radio-group v-model="radioValue" class="flex-direction-flex-start">
                        <el-radio :label="false">
                            <h5>所有学校</h5>
                            <div>招聘信息会在毕业申所有合作院校的站点展示</div>
                        </el-radio>
                        <el-radio :label="true" class="mt-18">
                            <h5>仅意向学校</h5>
                            <div>招聘信息只在“意向学校”站点展示，曝光度会大大降低</div>
                        </el-radio>
                    </el-radio-group>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { ref, reactive, computed } from 'vue'
import type { Ref } from "vue";
import footerBar from '@/components/footer/footerBar.vue';
// import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
// 路由
// let router = useRouter();
// ajax
const use = useHomeStore();
// 跳转页面的方法
let nav = (name: string) => {
    window.location.href = `${name}.html`
}
// 控制意向学校弹层的开关
const centerDialogVisible = ref(false)
// 意向学校 多选框选择的值
let selectValue = ref([]);
const schoolLen = computed(() => EnterpriseInfo.companyWishSchool.length);
// 意向学校 数据
const schoolList: Ref<Array<{
    schoolId: Number,
    sortId: Number,
    schoolName: string,
}>> = ref([]);
// 获取意向学校的数据
let getSchoolList = async function () {
    let res = await use.getSchoolList()
    Object.assign(schoolList.value, res.data)
    console.log('获取意向学校的数据', schoolList.value);
}
getSchoolList();
// 单选框组的值
const radioValue = ref(false)
// 提交意向学校弹层数据的方法
const confirm = () => {
    console.log('选中的意向学校的 ID：', selectValue.value)
    console.log('单选框选择的是：', radioValue.value, radioValue.value == true ? '仅意向' : '所有学校')
    let companyWishSchool: any = [];
    selectValue.value.forEach(element => {
        companyWishSchool.push(element);
    });
    // 点击提交按钮的时候用  调接口传参
    setEnterpriseSchoolOfIntention({
        companyOnlyWishSchool: radioValue.value,
        companyWishSchool,
        userId: 10000,
    })
}
interface setEnterpriseSchoolOfIntentionType {
    companyOnlyWishSchool: boolean,// 企业仅向意向学校展示职位 
    companyWishSchool: [Number] | any,// 企业意向学校 多选格式1,2,3 ,
    userId: Number,// 用户id
}
// 这是修改意向学校的接口
let setEnterpriseSchoolOfIntention = async function (payload: setEnterpriseSchoolOfIntentionType) {
    let res = await use.setEnterpriseSchoolOfIntention(payload);
    console.log(res)
    if (res.code == 200) {
        ElMessage({
            message: '修改成功！',
            type: 'success',
        })
        getEnterpriseInfo()
        centerDialogVisible.value = false;
    }
}
interface EnterpriseInfoType {
    companyAddr: string,// 企业详细地址
    companyContactEmail: string,// 企业接受简历邮箱
    companyContactName: string,// 企业联系人
    companyContactPhone: string | Number,// 企业联系电话
    companyFullName: string,// 企业全称
    companyId: Number | string,// 企业ID
    companyIndustry: string,// 企业所属行业
    companyIntroducation: string,// 企业简介
    companyLicenseUrl: string,// 企业营业执照URL
    companyLogoUrl: string,//企业LogoUrl
    companyName: string,// 企业简称
    companyNature: string,// 企业性质 
    companyOnlyWishSchool: boolean | string | Number,// 企业仅向意向学校展示职位
    companyRegisterAddr: string,// 企业地址
    companySize: string,// 企业规模
    companySocialCreditCode: string | Number,// 企业社会信用代码
    companyStatus: string,// 企业状态
    companyTag: string,// 企业标签
    companyWebUrl: string,// 企业官网
    companyWishSchool: number[] | [],// 企业意向学校 ,
    companyWishSchool1: string,// 企业意向学校 ,
    invitationTalentCount: Number,// 邀请人才点数 ,
    newResumeCount: Number,// 日内未查看简历数量 ,
    onlinePositionCount: Number,// 在招职位数量 ,
    refreshPositionCardCount: Number,// 职位刷新卡点数 ,
    refreshPositionCount: Number,// 刷新职位点数 ,
    resumeCount: Number,// 未查看简历数量
    sevenRefreshPositionCount: Number,// 7日内刷新职位数量
    smsInvitationCount: Number,// 短信邀请人才点数
    userId: Number,// 用户ID
}
const EnterpriseInfo: EnterpriseInfoType = reactive({
    companyWishSchool: []
}) as EnterpriseInfoType;
// 获取企业详细信息接口
const change = ref<string>('')
let getEnterpriseInfo = async () => {
    let res = await use.getEnterprise({ userId: 10000 });
    Object.assign(EnterpriseInfo, res.data)
    console.log('获取企业详细信息接口', EnterpriseInfo);
    change.value = ''
    schoolList.value.forEach((el: any) => {
        EnterpriseInfo.companyWishSchool.forEach((element: Number) => {
            if (el.schoolId == element) {
                change.value += el.schoolName + '、'
                console.log(change.value)
            }
        });
    });
    if (change.value == '' || change.value == undefined) {
        getEnterpriseInfo()
    }
}
getEnterpriseInfo()

</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

:deep(.dialog) {
    border-radius: 10px;
}

:deep(.el-dialog__header) {
    margin: 0;
    padding: 10px 0 10px 0;

    .dialog_header-h4 {
        padding: 0 0 10px 0;
        border-bottom: 1px solid #e8eaec;
        font-size: 16px;
    }

    .dialog_header-test {
        background-color: #eaf8fe;
        font-size: 13px;
        color: #515a6e;
        padding: 14px 0;
    }
}

:deep(.el-dialog__body) {
    margin: 0;
    padding: 0 40px;

    .dialog_body-header-r {
        padding: 8px 0 0 0;
        height: 14px;
        position: relative;

        .dialog_body-header-r_test {
            position: absolute;
            right: 0;
            display: inline-block;
        }
    }

    .el-input__wrapper {
        width: 620px;
    }
}

.flex-direction-flex-start {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.radioBox {
    box-sizing: border-box;
}

.ml-68 {
    margin: 10px 0 0 68px;
}

.mt-18 {
    margin-top: 18px;
}

.mt-12 {
    margin-top: 12px;
}

.mt-40 {
    margin-top: 40px;
}

img {
    border-style: none;
}

.mr-12 {
    margin-right: 12px;
}

.c356ffb {
    color: #356ffb;
}

.btm-item_hover:hover {
    color: #356ffb !important;
}

.fs-22 {
    font-size: 22px;
}

.mt-16 {
    margin-top: 16px;
}

.mt-15 {
    margin-top: 15px;
}

.mr-10 {
    margin-right: 10px;
}

.bgdf6f7f9 {
    background-color: #f6f7f9;
}

.ml-8 {
    margin-left: 8px;
}

.ml-16 {
    margin-left: 16px;
}

.mr-14 {
    margin-right: 14px;
}

.border-btm {
    border-bottom: 1px solid #eef0f2;
}

.just-between-2 {
    display: flex;
    justify-content: space-between;
}

.justify-content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.mt-17 {
    margin-top: 17px;
}

.mt-25 {
    margin-top: 25px;
}

.mr-16 {
    margin-right: 16px;
}

.mr-11 {
    margin-right: 11px;
}

.home {
    padding-top: 16px;
    height: 100%;
}

.hand {
    cursor: pointer;
}

.brief-introduction {
    background-color: #ffffff;
    padding-left: 32px;

    &>.top {
        padding: 24px 0;

        &>.major {
            width: 807px;

            &>.major-right {
                display: flex;
                align-content: flex-start;
                padding-right: 32px;

                &>.hover {
                    height: 15px;
                }

                .icon {
                    font-size: 14px;
                    display: inline-block;
                }

                .test {
                    display: inline-block;
                    font-size: 14px;
                }

                &>.hover:hover {
                    color: #356ffb;
                }

            }
        }

        &>.left {
            border-right: 1px solid #eef0f2;

            .icon-head-portrait {
                max-height: 84px;
                max-width: 84px;
                border-radius: 5px;
                border: 1px solid #eef0f2;
            }

            .test {
                h1 {
                    font-size: 19px;
                    margin: 6px 0;
                }

                p {
                    font-size: 15px;
                    color: #515a6e;
                    margin-top: 6px;
                }
            }
        }

        &>.right {
            font-size: 13px;
            margin-left: 38px;

            &>.describe {
                margin-top: 20px;
            }

            &>.right-title .spot {
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background-color: #19be6b;
            }
        }
    }

    &>.btm {
        padding: 18px 0;
        height: 160px;
        box-sizing: border-box;

        &>.btm-item {
            width: 245px;
            height: 145px;

            .left h3 {
                margin: 8px 0;
            }

            .test {
                margin-top: 7px;
                font-size: 13px;
                color: #515a6e;
            }

            .right {
                width: 10px;
                height: 18px;

                &>.icon-home_right_arrow {
                    max-width: 10px;
                    max-height: 18px;
                }
            }

            .icon-img {
                max-width: 80px;
                max-height: 60px;
            }

            .bottom h3 {
                margin-top: 21px;
            }

            .bottom .test {
                margin-top: 11px;
            }
        }

    }
}

.intention {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 24px 32px 24px 30px;

    &>.text {
        color: #515a6e;
    }

    .top h3 {
        font-size: 16px;

        span {
            color: #356ffa !important;
        }
    }

    .just-between .top span {
        display: inline-block;
        color: #808695;
    }

    .top img {
        max-width: 12px;
    }
}

.vip {
    padding: 24px 32px 32px 32px;
    box-sizing: border-box;
    background-color: #fff;

    &>h3 {
        font-size: 16px;
        font-weight: 700;
        color: #17233d;
        line-height: 1;
        margin-bottom: 16px;
    }

    &>.notvip-wrap {
        position: relative;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        padding: 48px 64px 48px 48px;
        border-radius: 4px;
        background-color: #1f2020;

        &>.left {
            box-sizing: border-box;

            &>h4 {
                font-size: 32px;
                font-weight: 700;
                color: #eecca7;
            }

            &>ul {
                list-style: none;
                display: flex;
                margin: 32px 0 60px 0;

                &>li {
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    flex-direction: column;
                    -webkit-box-align: center;
                    align-items: center;
                    margin-right: 48px;

                    &>img {
                        width: 64px;
                        height: 64px;
                        margin-bottom: 24px;
                    }

                    &>span {
                        font-size: 16px;
                        color: #ffe7cc;
                    }
                }
            }

            &>.btn-wrap {
                &>.position-card {
                    position: relative;
                    background: linear-gradient(146deg, #ffe7cc, #e2ad7d);
                    border-radius: 2px;
                    padding: 4px;
                    margin-right: 28px;

                    &>.content {
                        box-sizing: border-box;
                        position: relative;
                        z-index: 3;
                        width: 300px;
                        height: 56px;
                        padding: 20px;
                        border: 1px solid #f8ce9f;
                        border-image: linear-gradient(90deg, #f8ce9f, #d98e4b) 10 10;
                        line-height: 1;

                        &>h5 {
                            font-size: 18px;
                            color: #573617;
                            font-weight: 400;
                        }

                        &>img {
                            position: absolute;
                            width: 58px;
                            height: 64px;
                            top: 0;
                            right: 0;
                        }
                    }

                    &>.tip {
                        position: absolute;
                        z-index: 9;
                        width: 68px;
                        height: 25px;
                        top: -24px;
                        right: 0;
                    }
                }
            }
        }

        &>.right {
            display: flex;
            z-index: 6;

            &>.more-btn {
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                align-items: center;
                cursor: pointer;
                width: 160px;
                height: 56px;
                background: linear-gradient(128deg, #fee8cd, #e2ae7e);
                border-radius: 28px;
                font-size: 22px;
                color: #4c2c0e;
            }
        }

        &>img {
            position: absolute;
            top: 0;
            right: 0;
            width: 166px;
            height: 214px;
        }
    }
}
</style>