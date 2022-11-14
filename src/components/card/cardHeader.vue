<template>
    <div class="cred-header_box fs-14 c-909090">
        <div>
            <slot></slot>
        </div>
        <div class="time">应聘时间&nbsp;|&nbsp;{{time}}</div>
    </div>
</template>

<script setup lang="ts">
import { defineProps,toRefs } from 'vue'
let props = defineProps<{
    time:string
}>()
   let { time } = toRefs(props)
</script>

<style lang="scss" scoped>
    .cred-header_box {
                padding: 0 10px;
                border-bottom: 1px solid rgb(244, 244, 244);
                padding-bottom: 10px;
                display: flex;
                justify-content: space-between;
            }
</style>
