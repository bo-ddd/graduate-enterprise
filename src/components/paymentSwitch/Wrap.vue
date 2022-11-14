<template>
    <div class="payment flex-ja-center">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { toRefs, provide } from 'vue';

let props = defineProps<{
    modelValue: number;
}>();
let { modelValue } = toRefs(props);

// 设置v-model的值
let emit = defineEmits(['update:modelValue', 'handclick']);

let handleTabClick = function (name: number): void {
    emit('handclick', name)
    emit('update:modelValue', name);
};
provide('selected', modelValue);
// 把设置参数的方法提供给子组件
provide('handleTabClick', handleTabClick);
 
</script>

<style lang="scss" scoped>
.payment{
      gap: 140px;
}
</style>