<template>
    <div class="foot-bar-wrap">
        <div class="foot-bar-container wrap">
            <div class="left">
                <div class="top">
                    <div class="item">
                        <p class="fs-18 fw-700">1000+</p>
                        <p class="fs-14 mt-17">合作高校</p>
                    </div>
                    <div class="item">
                        <p class="fs-18 fw-700">100万+</p>
                        <p class="fs-14 mt-17">覆盖学生</p>
                    </div>
                    <div class="item">
                        <p class="fs-18 fw-700">2万+</p>
                        <p class="fs-14 mt-17">网络招聘会</p>
                    </div>
                    <div class="item">
                        <p class="fs-18 fw-700">100+</p>
                        <p class="fs-14 mt-17">线下招聘会</p>
                    </div>
                </div>
                <div class="btm fs-12">©毕业申 备案号：沪ICP备17007916号-3</div>
            </div>
            <div class="right">
                <div class="contact">
                    <div class="item mb-15">
                        <img src="@/assets/images/icon-wechat.png">
                        <div class="item-text fs-14 ml-12">18018637339</div>
                    </div>
                    <div class="item mb-15">
                        <img src="@/assets/images/icon-xin.png">
                        <div class="item-text fs-14 ml-12">info@applyoffer.com</div>
                    </div>
                    <div class="item">
                        <img src="@/assets/images/icon-telephone.png">
                        <div class="item-text fs-14 ml-12">021-66696957 (9:00-18:00)</div>
                    </div>
                </div>
                <div class="wechat">
                    <img src="@/assets/images/gongzhonghao.png" class="icon">
                    <p class="fs-12">公众号</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.foot-bar-wrap {
    background: #fafafa;
    &>.foot-bar-container {
        display: flex;
        justify-content: space-between;
        &>.left {
            &>.top {
                display: flex;
                padding: 40px 0 25px 0;
                border-bottom: 1px solid #f3f3f3;
                &>.item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-right: 120px;
                }
            }
            &>.btm {
                padding: 26px 0;
            }
        }
        &>.right {
            padding: 35px 0;
            display: flex;
            &>.contact {
                &>.item {
                    display: flex;
                    align-items: center;

                    &>img {
                        width: 24px;
                    }
                }
            }
            &>.wechat {
                margin-left: 26px;
                &>.icon {
                    width: 88px;
                    height: 88px;
                }
                &>p {
                    color: #808695;
                    text-align: center;
                }
            }
        }
    }
    .mt-17{
        margin-top: 17px;
    }
    .fw-700{
        font-weight: 700;
    }
    .ml-12{
        margin-left: 12px;
    }
}
</style>