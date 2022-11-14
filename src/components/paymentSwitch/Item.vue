<template>
    <div>
        <div class="item-wrap flex-ja-center">
            <div :class="`item flex-ja-center ${name == selected ? 'active' : ''}`" @click="handleTabItemClick">
                <div class="logo flex-ja-center">
                    <slot name='logo'></slot>
                </div>
            </div>
            <slot name="details"></slot>
        </div>
        <div class="btn mt-20 just-center">
            <slot name="btn"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, inject, } from 'vue';
import type { Ref } from 'vue';
const props = defineProps<{
    name: number,
}>()
const { name } = toRefs(props);

let selected = inject('selected') as Ref<number>;
let handleTabClick = inject('handleTabClick') as (name: number) => void;

let handleTabItemClick = function () {
    handleTabClick(name.value);
}
</script>

<style lang="scss" scoped>

$size:200px;

.item-wrap{
    gap: 20px;
}

.item {
    text-align: center;

    .logo {
        width: $size;
        height: $size;
        border: 1px solid #f4f2f1 !important;
        cursor: pointer;
        box-sizing: border-box;
    }
}

.btn {
    width: $size;

    button {
        width:$size;
    }
}

.active {
    border: 1px solid #53afff;
}
</style>