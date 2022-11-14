<script setup lang="ts">

</script>

<template>
    <div class="crad-wrap">
        <slot name="header"></slot>
        <slot name="main"></slot>
    </div>

</template>

<style lang="scss" scoped>
.crad-wrap {
    background: white;
    padding: 12px;
    border-radius: 5px;
}
.crad-wrap:hover{
   /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
      box-shadow: 3px 2px 4px 3px rgb(237, 237, 237);
    color: rgb(85, 85, 245);
}
</style>
