<template>
    <div :class="`vip-wrap ${name == selected ? 'active' : ''}`" @click="handleTabItemClick">
        <img class="download" src="@/assets/images/download.png" alt="" v-show="name == selected">
        <img class="bg_recommend" v-show="count == 12" src="@/assets/images/bg_recommend.png" alt="">
        <h5 class="fs-20">{{ count }}个月</h5>
        <ul>
            <li class="just-between">
                <p class="fs-16 c-515a6e"> <span class="yuan"></span>同时在招职位</p>
                <span class="count mr-15 fs-18"> {{ list.positionCount }}</span>
            </li>
            <li class="just-between">
                <p class="fs-16 c-515a6e"> <span class="yuan"></span>职位刷新点数</p>
                <span class="count mr-15"> <span class="fs-18">{{ list.refreshPositionCount }}</span> <span
                        class="fs-14 c-515a6e">/日</span> </span>
            </li>
            <li class="just-between">
                <p class="fs-16 c-515a6e"> <span class="yuan"></span>邀请学生点数</p>
                <span class="count mr-15"> <span class="fs-18">{{ list.invitationTalentCount }}</span> <span
                        class="fs-14 c-515a6e">/日</span> </span>
            </li>
            <li class="just-between">
                <p class="fs-16 c-515a6e"> <span class="yuan"></span>职位自动刷新卡 <span class="fs-12 ml-20 c-8d9ea7">有效期{{
                        count
                }}个月</span></p>

                <span class="count mr-15 fs-18"> {{ list.refreshPositionCardCount * count }}</span>
            </li>
        </ul>
        <div class="buy align-center c-ff4400 fs-14">
            <span class=" fs-28 fw-700"> {{ Number(list.vipPrice) * count }}</span>
            元
            <p v-if="list.vipDiscountPrice != null" class="fs-12 c-8d9ea7 buy-discount">{{list.vipDiscountPrice }}折</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, inject, } from 'vue';
import type {Ref} from 'vue'

const props = defineProps<{
    list: any,
    count: number,
    name: number
}>()
const { list, count, name } = toRefs(props);

let selected = inject('selected') as Ref<number>;
let handleTabClick = inject('handleTabClick') as (name: number) => void;

let handleTabItemClick = function () {
    handleTabClick(name.value);
}
</script>

<style lang="scss" scoped>
.vip-wrap {
    width: 301px;
    border: 1px solid #f4f2f1 !important;
    border-left: none;
    cursor: pointer;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;

    h5 {
        border-bottom: 1px solid #f4f2f1;
        line-height: 56px;
    }

    .bg_recommend {
        width: 82px;
        position: absolute;
        right: -20px;
        top: -25px;
    }

    .download {
        width: 28px;
        position: absolute;
        left: 0;
    }

    ul {

        li {
            $height: 48px;
            height: $height;
            line-height: $height;


            .yuan {
                content: "";
                display: inline-block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                border: 1px solid #c5c8ce;
                margin-right: 8px;
                background-color: transparent;
            }

        }
    }

    .buy {
        margin: 16px 0 32px 4px;
        gap: 5px;
        .buy-discount{
            width: 30px;
            border: 1px solid #8d9ea7;
        }
    }
}
</style>