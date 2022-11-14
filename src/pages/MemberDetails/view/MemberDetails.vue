<template>
    <div>
        <div class="wrap">
            <header class="mt-35 flex-ja-center">
                <img class="icon" src="@/assets/images/icon_silver.png" alt="">
                <p class="fs-24 fw-600">银卡会员</p>
            </header>
        </div>
        <div class="wrap ">
            <VipSwitch.Wrap v-model="selectVip" class="mt-10" @handclick="isVipActive">
                <VipSwitch.Item :name="1" :list="data" :count="1"></VipSwitch.Item>
                <VipSwitch.Item :name="3" :list="data" :count="3"></VipSwitch.Item>
                <VipSwitch.Item :name="9" :list="data" :count="9"></VipSwitch.Item>
                <VipSwitch.Item :name="12" :list="data" :count="12"></VipSwitch.Item>
            </VipSwitch.Wrap>
        </div>
        <div class="flex-ja-center mt-45 ">
            <p class="fs-16">应付金额</p>
            <p class="c-ff4400 "><span class="mlr-10 fs-24 fw-700">{{ selectVip * data.vipPrice }}</span>元</p>
        </div>
        <div class="mt-20">
            <PaymentSwitch.Wrap v-model="selectPayment" @handPaymentClick="isPaymentActive">
                <!-- 1 支付宝  2 对公转账 -->
                <PaymentSwitch.Item :name="1">
                    <template #logo>
                        <img class="icon-alipay" src="@/assets/images/alipay.png" alt="">
                    </template>
                    <template #btn>
                        <el-button @click="toPayment" :disabled="selectPayment == 1 ? false : true" class=""
                            type="success" color="#53afff">
                            支付宝支付
                        </el-button>
                    </template>
                </PaymentSwitch.Item>
                <PaymentSwitch.Item :name="2">
                    <template #logo>
                        <div v-if="selectPayment == 2">
                            <img class="icon-company" src="@/assets/images/company_fanjia_3.png" alt="">
                        </div>
                        <div v-else>
                            <img class="icon-public" src="@/assets/images/public.png" alt="">
                            <p class="fs-14 c-515a6e mt-20">对公转账</p>
                        </div>
                    </template>
                    <template #details>
                        <p v-if="selectPayment == 2" class="public-details fs-14 c-8d9ea7">对公转账的细节请询问您的专属客服</p>
                    </template>
                    <template #btn>
                        <span class="fs-14 c-515a6e cursor-p">对公转账</span>
                    </template>
                </PaymentSwitch.Item>
            </PaymentSwitch.Wrap>
            <p class="mt-30 fs-12 flex-ja-center c-8d9ea7"> 付费即表示同意《 <span class="agreement cursor-p">毕业申增值服务协议</span>》
            </p>
        </div>
        <div class="div" v-html="params"></div>
        <FooterBar class="mt-60"></FooterBar>
    </div>
</template>

<script setup lang="ts" >
import VipSwitch from '@/components/vipSwitch'
import PaymentSwitch from '@/components/paymentSwitch'
import FooterBar from '@/components/footer/footerBar.vue'
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router'
import { usePaymentStore } from '@/stores/payment'
// 支付接口
let payment = usePaymentStore();
// 路由
let router = useRouter();
let route = useRoute();
// vip
let selectVip = ref(1);

let isVipActive = function (name: number): void {
    selectVip.value = name
}
// 支付
let selectPayment = ref(1);

let isPaymentActive = function (name: number): void {
    selectPayment.value = name
}
let data = route.query as any;
console.log(data);
let order = {
    orderPrice: selectPayment.value * data.vipPrice,
    vipName: data.vipName,
    vipCount: selectPayment.value,
    vipLevel:Number(data.vipLevel)
}
let params =ref('');
let toPayment = function () {
    let usePayment = async(options:any)=>{
        let res = await payment.payment(options);
        console.log(res);
        if(res.code==200){
            router.push({ path: '/payment', query: { ...order } })
            params = res.data
        }
    }
    console.log('--------params----------------')
    console.log(params)
    usePayment({
        userId:10000,
        companyId:10000,
        month:selectPayment.value,
        vipId:Number(data.vipLevel) 
})
}

</script>

<style lang="scss" scoped>
.active {
    border: 1px solid #f75736 !important;
}

header {
    border: 1px solid #eef0f2;
    padding: 10px 0;
    gap: 10px;

    .icon {
        width: 50px;
    }
}

.agreement {
    text-decoration: underline;
}

.icon-alipay {
    width: 80px;
}

.icon-public {
    width: 50px;
}

.icon-company {
    width: 180px;
}

.public-details {
    width: 120px;
}
</style>