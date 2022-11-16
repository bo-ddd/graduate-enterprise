<script setup lang="ts">
import { ref, reactive } from 'vue'
import {  useRoute } from 'vue-router'
let showGuid = ref(false);//展示导航
//是否展开导航
let handleGuideChange = (bool: boolean) => {
  showGuid.value = bool;
}
let list = reactive([
  {
    id: 1,
    title: '首页',
    url: '/',
  },
  {
    id: 2,
    title: '职位管理',
    url: '/position.html',
  },
  {
    id: 3,
    title: '简历管理',
    url: '/resume.html',
  },
  {
    id: 4,
    title: '寻找人才',
    url: '/findPersonnel.html',
  },
  {
    id: 5,
    title: '会员中心',
    url: '/memberCenter.html',
  },
])

let route = useRoute();
let acitveIndex:any = ref(list.find(item=>item.url == route.path)?.id);
const handleSelect = (key: any) => {  
    if(window.location.href == window.location.origin + key.url) return;
    window.location.href = window.location.origin + key.url;
}
const dialogFormVisible = ref(false)
</script>

<template>
  <header class="header c-ffffff ">
    <div class="wrap just-between">
      <div class="just-between titlt-menu">
        <div class="title">
          <p class="fs-14">榕树云</p>
          <span class="fs-12 c-dadada">校园招聘平台</span>
        </div>
        <!-- 菜单 -->
        <el-menu :ellipsis="false" :default-active="acitveIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item v-for="item,index in list" :key="`${index}`" :index="index" @click="handleSelect(item)">{{item.title}}</el-menu-item>
        </el-menu>
      </div>
      <div class="user align-center">
        <p class="fs-14">Hi,中谷百科</p>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="avator" src="@/assets/images/avator.png" alt="">
            <el-icon class="el-icon--right">
              <!-- <arrow-down /> -->
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialogFormVisible = true">修改密码</el-dropdown-item>
              <el-dropdown-item>联系客服</el-dropdown-item>
              <el-dropdown-item @click="handleSelect({
                url:'/login.html'
              })">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-dialog width="400px" v-model="dialogFormVisible" title="修改密码" align-center>
        <el-form>
          <el-steps :active="1" align-center>
            <el-step title="验证手机号" />
            <el-step title="重置密码" />
          </el-steps>



        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </header>
  <div class="container">
      <div :class="['consulting-service', 'absolute-wrap', showGuid ? 'close-animate' : 'show-animate']">
        <div class="top">
          <img src="@/assets/images/company_fanjia_3.png" class="or-code">
          <p class="tip fs-12">如有任何疑问请咨询</p>
        </div>
        <img src="@/assets/images/icon-close.png" @click="handleGuideChange(true)">
      </div>

      <!-- 这个是点击弹出咨询的容器 -->
      <div class="seek-advice absolute-wrap box-shadow" v-show="showGuid" @click="handleGuideChange(false)">
        <img src="@/assets/images/icon-kefu.png">
      </div>
    </div>

    <!-- 这个是疑问咨询的图片 -->
</template>


<style lang="scss" scoped>
:deep(.el-dialog__header) {
  text-align: center;
}

.c-dadada {
  color: #dadada;
}

:deep(.el-menu) {
  background-color: #2a2d34;
}

:deep(.el-menu-item) {
  width: 120px;
  box-sizing: border-box;
}

:deep(.el-menu--horizontal) {
  border: 0;
}

:deep(.el-menu--horizontal>.el-menu-item.is-active) {
  border-bottom: 2px solid #2a2d34;
  background: #21242c !important;
  color: #ffffff !important;
}

:deep(.el-menu--horizontal .el-menu-item:not(.is-disabled)):hover {
  background-color: #21242c !important;
  color: #ffffff !important;
}

:deep(.el-menu-item) {
  color: #d4d4d4 !important;
}

:deep(.el-dropdown-link .el-icon) {
  display: none;
}

.container {

  &>.consulting-service {
    text-align: center;
    &>.top {
      padding: 12px 12px 0;
      box-shadow: 2px 3px 0 rgb(215 214 214 / 50%);
      background: #ffffff;

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

  &>.seek-advice {
    padding: 10px 10px 6px;
    background: #fff;

    &>img {
      width: 38px;
    }
  }

  &>.seek-advice:hover {
    cursor: pointer;
  }
}

.absolute-wrap {
  position: fixed !important;
  right: 20px;
  top: 90px;
  z-index: 2;
}


.header {
  background-color: #2a2d34;

  .titlt-menu {
    gap: 30px;
  }

  .user {
    gap: 16px;

    .avator {
      $size: 34px;
      width: $size;
      height: $size;
      border-radius: $size;
    }
  }
}

.close-animate {
  animation-name: closeAnimate; //动画名称
  animation-duration: 2s; //动画持续时间
  animation-timing-function: ease; //动画播放速度
  animation-fill-mode: forwards; //动画完毕后停留在那里
}

.show-animate {
  animation-name: showAnimate; //动画名称
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

.box-shadow {
  box-shadow: 0 2px 6px 0 #edeff3;
}

.absolute-wrap {
  position: absolute;
  right: 20px;
  top: 90px;
  z-index: 2;
}
</style>
