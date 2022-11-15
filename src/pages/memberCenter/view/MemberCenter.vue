<template>
    <div class="member ">
        <header class="wrap flex-ja-center">
            <img class="icon" src="@/assets/images/left.png" alt="">
            <h3 class="fs-24 c-ebab85">升级成为毕业申会员</h3>
            <img class="icon" src="@/assets/images/right.png" alt="">
        </header>
        <main class="container wrap">
            <div class="flex-ja-center banner">
                <img src="@/assets/images/banner1.png" alt="">
                <img src="@/assets/images/banner2.png" alt="">
                <img src="@/assets/images/banner3.png" alt="">
            </div>
            <div class="card">
                <div class="card-desc flex-ja-center">
                    <div class="position-card">
                        <div class="content">
                            <h5 class="fs-20 c-573617 fw-400">职位自动刷新卡 </h5>
                            <p class="c-79593a fs-16 mt-10">使用后5天内，所选职位每天9点、14点、18点自动刷新</p>
                        </div>
                        <img class="bg-v" src="@/assets/images/default_v.png" alt="">
                    </div>
                </div>
                <div class="desc flex-ja-center">
                    <div class="content c-ffffff">
                        <span class="fs-16">曝光率提升 200%</span>
                        <img class="icon-rise" src="@/assets/images/icon-rise.png" alt="">
                    </div>
                </div>
            </div>
        </main>
        <div class="vip-type wrap ">
            <div class="vip-wrap flex mt-30">
                <div class="cate">
                    <div class="title"></div>
                    <div class="subheading flex-ja-center">
                        <p class="fs-16 fw-600 ">权益</p>
                    </div>
                    <ul class="">
                        <li class="flex-ja-center" v-for="item in ulList" :key="item.id">
                            {{ item.title }}
                            <el-tooltip v-if="item.id==3" class="box-item ml-5" effect="light" 
                                content="平台为会员企业不定期刷新其全部在招职位，不占用日常刷新点数和自动刷新卡。"
                                placement="top-start">
                                    <el-icon>
                                        <Warning />
                                    </el-icon>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
                <div class="cate ordinary">
                    <div class="title flex-ja-center fs-24">
                        <p>{{ vipList[0].vipName }}</p>
                    </div>
                    <div class="subheading  flex-wrap">
                    </div>
                    <ul class="">
                        <li class=" flex-ja-center fs-18">
                            <el-icon color="#356ffa" size="22px" v-show="vipList[0].downloadCount">
                                <CircleCheckFilled />
                            </el-icon>
                            <el-icon color="#cfd1d5" size="22px" v-show="!(vipList[0].downloadCount)">
                                <CircleCloseFilled />
                            </el-icon>
                        </li>
                        <li class=" flex-ja-center fs-18">
                            <el-icon color="#356ffa" size="22px" v-show="vipList[0].refreshPosition">
                                <CircleCheckFilled />
                            </el-icon>
                            <el-icon color="#cfd1d5" size="22px" v-show="!(vipList[0].refreshPosition)">
                                <CircleCloseFilled />
                            </el-icon>
                        </li>
                        <li class=" flex-ja-center fs-18">
                            <el-icon color="#356ffa" size="22px" v-show="vipList[0].smsInvitation">
                                <CircleCheckFilled />
                            </el-icon>
                            <el-icon color="#cfd1d5" size="22px" v-show="!(vipList[0].smsInvitation)">
                                <CircleCloseFilled />
                            </el-icon>
                        </li>
                        <li class=" flex-ja-center fs-18">
                            {{ vipList[0].positionCount }}
                        </li>
                        <li class=" flex-ja-center">
                            <span class="fs-18">{{ vipList[0].refreshPositionCount }}</span>/日
                        </li>
                        <li class=" flex-ja-center">
                            <span class="fs-18">{{ vipList[0].invitationTalentCount }}</span> /日
                        </li>
                        <li class=" flex-ja-center fs-18">
                            {{ vipList[0].refreshPositionCardCount }}
                        </li>
                    </ul>
                </div>
                <div class="cate silver" @click="handle(1)">
                    <div class="title flex-ja-center fs-24">
                        <img class="icon" src="@/assets/images/title_silver.png" alt="">
                        <p>{{ vipList[1].vipName }}</p>
                    </div>
                    <div class="subheading flex-wrap">
                        <p class="fs-12 mt-35"><i class="fs-14">￥</i><span class="fs-24">{{ vipList[1].vipPrice
                        }}</span>/月</p>
                        <van-button class="btn">立即开通</van-button>
                    </div>
                    <ul class="">
                        <li class=" flex-ja-center fs-18">
                            <!-- {{ vipList[1].downloadCount? }} -->
                            <el-icon color="#356ffa" size="22px" v-show="vipList[1].downloadCount">
                                <CircleCheckFilled />
                            </el-icon>
                            <el-icon color="#cfd1d5" size="22px" v-show="!(vipList[1].downloadCount)">
                                <CircleCloseFilled />
                            </el-icon>
                        </li>
                        <li class=" flex-ja-center fs-18">
                            <el-icon color="#356ffa" size="22px" v-show="vipList[1].refreshPosition">
                                <CircleCheckFilled />
                            </el-icon>
                            <el-icon color="#cfd1d5" size="22px" v-show="!(vipList[1].refreshPosition)">
                                <CircleCloseFilled />
                            </el-icon>
                        </li>
                        <li class=" flex-ja-center fs-18">
                            <el-icon color="#356ffa" size="22px" v-show="vipList[1].smsInvitation">
                                <CircleCheckFilled />
                            </el-icon>
                            <el-icon color="#cfd1d5" size="22px" v-show="!(vipList[1].smsInvitation)">
                                <CircleCloseFilled />
                            </el-icon>
                        </li>
                        <li class=" flex-ja-center fs-18">
                            {{ vipList[1].positionCount }}
                        </li>
                        <li class=" flex-ja-center">
                            <span class="fs-18">{{ vipList[1].refreshPositionCount }}</span> /日
                        </li>
                        <li class=" flex-ja-center">
                            <span class="fs-18">{{ vipList[1].invitationTalentCount }}</span> /日
                        </li>
                        <li class=" flex-ja-center fs-18">
                            {{ vipList[1].refreshPositionCardCount }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <FooterBar class="mt-60"></FooterBar>
    </div>
</template>

<script setup lang="ts">
import { useVipStore } from "@/stores/vip";
import { reactive, } from "vue";
import { useRouter } from 'vue-router';
import FooterBar from '@/components/footer/footerBar.vue'
let router = useRouter();
let vipList: any = reactive([]);
let useVip = useVipStore();
let getVip = async () => {
    let res = await useVip.getVip({});
    vipList.push(...res.data);
    console.log(res);
}
(async function () {
    await getVip();
    console.log(vipList);
})()
let ulList = [
    {
        id: 1,
        title: '批量下载收到的简历'
    },
    {
        id: 2,
        title: '短信邀请学生投递'
    },
    {
        id: 3,
        title: '自动刷新全部职位'
    },
    {
        id: 4,
        title: '同时在招职位'
    },
    {
        id: 5,
        title: '职位刷新点数'
    },
    {
        id: 6,
        title: '邀请学生点数'
    },
    {
        id: 7,
        title: '职位自动刷新卡'
    },
]
let handle = function (index: number): void {
    router.push({ path: '/MemberDetails', query: vipList[index] })
}

</script>

<style lang="scss" scoped>
.member {
    background-color: #0e2664;

    header {
        gap: 18px;
        padding: 30px 0;

        .icon {
            width: 50px;
        }
    }

    .container {
        border-radius: 2px;
        border: 3px solid #1c3b8d;
        background-color: #112f7d;

        .banner {
            gap: 230px;
            padding: 30px 0;

            img {
                width: 170px;
            }
        }

        .card {
            .card-desc {
                .position-card {
                    height: 116px;
                    width: 520px;
                    padding: 10px;
                    box-sizing: border-box;
                    border-radius: 2px;
                    position: relative;
                    background: linear-gradient(146deg, #ffe7cc, #e2ad7d);

                    .content {
                        border: 1px solid #f8ce9f;
                        box-sizing: border-box;
                        padding: 20px;

                    }

                    .bg-v {
                        position: absolute;
                        height: 116px;
                        top: 0;
                        right: 0;
                    }
                }
            }

            .desc {
                padding: 26px 0;

                .content {
                    padding: 5px 10px;
                    border: 1px solid #ffffff;

                    .icon-rise {
                        width: 15px;
                    }
                }
            }
        }
    }

    .vip-type {
        border-radius: 2px;
        background-color: #ffffff;
        
        .vip-wrap {
            .cate {
                width: 100%;

                .title {
                    height: 80px;

                    .icon {
                        width: 40px;
                    }
                }

                .subheading {
                    height: 120px;
                }

                ul {
                    li {
                        $height: 60px;
                        height: $height;
                        line-height: $height;
                        border-top: 1px solid #ededed;
                    }
                }
            }

            .ordinary {
                .title {
                    background-color: rgb(248, 252, 255);
                }

            }

            .ordinary:hover {
                background-color: rgba(240, 244, 249, 0.5);
            }

            .silver:hover {
                background-color: rgba(246, 246, 246, 0.5);
            }

            .silver {
                .title {
                    background-color: rgb(245, 245, 245);
                }

                .btn {
                    padding: 6px 40px;
                    border-radius: 4px;
                    background: linear-gradient(146deg, #ffe7cc, #e2ad7d);
                }
            }
        }
    }
}
</style>