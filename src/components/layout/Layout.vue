<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeStore } from '@/stores/home';
import { useUserStore } from '@/stores/user';
import type { FormRules } from 'element-plus/es/tokens/form';
import type { FormInstance } from 'element-plus/es/components/form';
import { ElMessage } from 'element-plus';

interface Res {
  code: number,
  data: string | [],
  msg: string,
}
let user = useUserStore();
const use = useHomeStore();
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
let acitveIndex: Ref<number> = ref(list.find(item => item.url == route.path)?.id!);
const handleSelect = (key: any) => {
  if (route.path == key.url) return;
  window.location.href = key.url;
  if (key.url == "/login.html") {
    sessionStorage.removeItem('token');
  }
}
const dialogFormVisible = ref(false);

// 修改密码
const changePassword = () => {
  dialogFormVisible.value = true;
  active.value = 0;
  isNext.value = true
}

// 步骤条
const active = ref(0);
let isNext = ref(true);
const next = () => {
  if (active.value++ > 2) active.value = 0;
  isNext.value = false
}

//忘记密码
const ruleFormForgotPwRef: any = ref();
const ruleFormForgotPw = reactive({
  phone: '',
  validate: '',
  countDown: 60,
  isCountDown: true
})

const rulesForgotPw = reactive<FormRules>({
  // phone: [
  //     { required: true, message: '请输入手机号', trigger: 'blur' },
  //     { validator: validatePhone, }
  // ],
  // validate: [
  //     { required: true, message: '请输入验证码', trigger: 'blur' },
  //     { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' },
  // ],
})

const submitFormForgotPw = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: boolean) => {
    if (valid) {
      localStorage.setItem('phone', ruleFormForgotPw.phone)
      localStorage.setItem('smsCode', ruleFormForgotPw.validate)
      next();
    } else {
    }
  })
}

//重置密码
const ruleFormResetPwRef = ref<FormInstance>()
const ruleFormResetPw = reactive({
  password: '',
  checkPass: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新的密码'))
  } else {
    if (ruleFormResetPw.checkPass !== '') {
      if (!ruleFormResetPwRef.value) return
      ruleFormResetPwRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleFormResetPw.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}
const rulesResetPw = reactive<FormRules>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitFormResetPw = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: boolean) => {
    if (valid) {
      //重置密码
      let register = async (options: any) => {
        const res: any | Res = await user.login(options);
        console.log(res)
        if (res.code == 200) {
          ElMessage({
            message: '重置成功，请登录',
            type: 'success',
          });
        }
      }
      register({
        phone: localStorage.getItem('phone'),
        password: ruleFormResetPw.password,
        smsCode: localStorage.getItem('smsCode'),
        loginType: 3,
        inviteCode: 0,
      })

    } else {
    }
  })
}

// 获取验证码后
let getvalidate = (e: any, rule: any) => {
  let count = rule.countDown;
  rule.isCountDown = false
  e.target.disabled = true
  let interval = setInterval(() => {
    rule.countDown--;
    if (rule.countDown == 0) {
      clearInterval(interval)
      rule.countDown = count;
      rule.isCountDown = true;
    }
  }, 1000);
}

let enterpriseInfo: any = ref({});
const getEnterpriseInfo = async function () {
  let res: any = await use.getEnterprise();
  if (res.code == 200) {
    enterpriseInfo.value = res.data
  }
};
getEnterpriseInfo();
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
          <el-menu-item v-for="item, index in list" :key="`${index}`" :index="`${index}`" @click="handleSelect(item)">
            {{ item.title }}</el-menu-item>
        </el-menu>
      </div>
      <div class="user align-center">
        <p class="fs-14">Hi,</p>{{ enterpriseInfo.companyFullName }}
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="avator" :src="enterpriseInfo.companyLogoUrl" alt="">
            <el-icon class="el-icon--right">
              <!-- <arrow-down /> -->
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item>联系客服</el-dropdown-item>
              <el-dropdown-item @click="handleSelect({
                url: '/login.html'
              })">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-dialog width="400px" v-model="dialogFormVisible" align-center>
        <div class="c-000000 just-center mt-40 mb-40">
          <h3 class="fs-18">忘记密码</h3>
        </div>
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="验证手机号" />
          <el-step title="重置密码" />
        </el-steps>
        <!-- 第一步 -->
        <el-form ref="ruleFormForgotPwRef" v-show="isNext" label-position="right" :model="ruleFormForgotPw"
          :rules="rulesForgotPw" label-width="120px" class="demo-ruleForm" size="default">
          <el-form-item class="mt-18 item-input" label="" label-width="0px" prop="phone">
            <!-- 手机号 -->
            <el-input class="input" v-model="ruleFormForgotPw.phone" placeholder="请输入注册手机号" />
          </el-form-item>
          <el-form-item class="mt-22 item-input validate" label="" label-width="0px" prop="validate">
            <!-- 验证码 -->
            <div class="just-between validate-flex">
              <el-input class="input" v-model="ruleFormForgotPw.validate" placeholder="请输入短信验证码" autocomplete="off" />
              <el-button v-show="ruleFormForgotPw.isCountDown" style="width:102px"
                :disabled="ruleFormForgotPw.phone.length == 11 ? false : true"
                :color="ruleFormForgotPw.phone.length == 11 ? '#356ffa' : '#ececec'"
                :class="'btn-validate ' + (ruleFormForgotPw.phone.length == 11 ? 'c-ffffff' : 'c-b9b9b9')"
                @click="getvalidate($event, ruleFormForgotPw)">
                获取验证码</el-button>
              <el-button v-show="!ruleFormForgotPw.isCountDown" style="width:102px" disabled color='#ececec'
                class="btn-validate c-b9b9b9">
                {{ `${ruleFormForgotPw.countDown}秒后重试` }}</el-button>
            </div>
          </el-form-item>
          <el-form-item class="m-0">
            <el-button class=" btn fs-16 mt-15 " color="#2d8cf0" type="primary"
              @click="submitFormForgotPw(ruleFormForgotPwRef)">找回密码
            </el-button>
          </el-form-item>
        </el-form>
        <!-- 第二步 -->
        <el-form ref="ruleFormResetPwRef" v-show="!isNext" label-position="right" :model="ruleFormResetPw"
          :rules="rulesResetPw" label-width="120px" class="demo-ruleForm" size="default">
          <el-form-item class="mt-18 item-input" label="" label-width="0px" prop="password">
            <!-- 重置密码 -->
            <el-input class="input" v-model="ruleFormResetPw.password" placeholder="请输入6-16位新密码" type="password" />
          </el-form-item>
          <el-form-item class="mt-22 item-input " label="" label-width="0px" prop="checkPass">
            <!-- 再次输入密码 -->
            <el-input class="input" v-model="ruleFormResetPw.checkPass" placeholder="请再次输入密码" type="password"
              autocomplete="off" />
          </el-form-item>
          <el-form-item class="m-0">
            <el-button class=" btn fs-16 mt-15 " color="#2d8cf0" type="primary"
              @click="submitFormResetPw(ruleFormResetPwRef)">修改密码
            </el-button>
          </el-form-item>
        </el-form>
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

:deep(.el-form-item__content) {
  margin: 0 !important;
}

:deep(.el-input__wrapper) {
  padding: 0 !important;
  border-radius: 5px;
  background-color: #f6f7f9;
  box-shadow: 0 0 0 0 !important;
}

:deep(.el-input__inner) {
  height: 42px;
  margin-left: 7px;
}

:deep(.el-form-item__error) {
  padding: 6px;
}

:deep(.el-step__line) {
  width: 200% !important;
  left: 0 !important;
  height: 0 !important;
  background-color: rgb(232, 232, 232);
  border: 1px dashed rgb(255, 255, 255);
}

:deep(.el-step__title) {
  font-weight: 500 !important;
  font-size: 14px;
}

:deep(.el-step__icon-inner) {
  font-weight: 500 !important;
  font-size: 14px;
}

:deep(.el-step__head.is-process>.el-step__icon.is-text) {
  background-color: #2d8cf0;
}

:deep(.el-step__icon) {
  background-color: #ababab;
}

:deep(.el-step__icon.is-text) {
  --size: 22px;
  color: #ffffff;
  border: 0;
  width: var(--size);
  height: var(--size);
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

.wrap {
  .validate {
    background-color: #ffffff;

    .input {
      width: 198px;
    }

    .validate-flex {
      width: 100%;
    }

    .btn-validate {
      height: 42px;
    }
  }
}

.btn {
  width: 100% !important;
  height: 42px;
  border-radius: 0;
}
</style>
