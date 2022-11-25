<template>
    <div class="wrap-login">
        <!-- 头部logo -->
        <header>
            <img class="logo" src="@/assets/images/logo.png" alt="">
        </header>
        <!-- --------- -->

        <!-- 主要内容 -->
        <div class="flex-ja-center wrap-w">
            <div class="">
                <div class="warp-main just-center mt-72">
                    <!-- 左侧登录注册 -->
                    <main v-show="isOpen == 1">
                        <!-- 标题 -->
                        <div class="header ">
                            <p class="title just-center fs-18 mt-40">2023届毕业生招聘</p>
                            <span class="detail just-center fs-14 mt-8 c-575757">线上线下同步开展</span>
                        </div>
                        <div class="main mt-30">
                            <!-- tabs 登录 -->
                            <el-tabs v-model="activeName" class="demo-tabs">
                                <!-- 密码登录 -->
                                <el-tab-pane label="密码登录" name="first">
                                    <el-form ref="ruleFormPassRef" label-position="right" :model="ruleFormPass"
                                        :rules="rulesPass" label-width="120px" class="demo-ruleForm" size="default">
                                        <el-form-item class="mt-18 item-input" label="" label-width="105px"
                                            prop="phone">
                                            <el-input class="input" v-model="ruleFormPass.phone"
                                                placeholder="请输入注册手机号" />
                                        </el-form-item>
                                        <el-form-item class="mt-22 item-input" label="" label-width="105px"
                                            prop="password">
                                            <el-input class="input" v-model="ruleFormPass.password" placeholder="请输入密码"
                                                type="password" autocomplete="off" />
                                        </el-form-item>
                                        <el-form-item class="" label="" label-width="105px">
                                            <p class="fs-14 c-575757 forget-pass flex" @click="isOpen = 3">忘记密码</p>
                                        </el-form-item>
                                        <el-form-item class="m-0">
                                            <el-button class=" btn fs-16 " color="#2d8cf0" type="primary"
                                                @click="submitFormPass(ruleFormPassRef)">立即登录
                                            </el-button>
                                        </el-form-item>
                                        <el-form-item class="mt-5">
                                            <el-button class=" btn btn-register fs-14" color="#356ffa" type="text"
                                                @click="isOpen = 2">立即注册&nbsp;<img class="icon-right"
                                                    src="@/assets/images/icon-right.png" alt="">
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <!--验证码登录 -->
                                <el-tab-pane label="验证码登录" name="second">
                                    <el-form ref="ruleFormValidateRef" label-position="right" :model="ruleFormValidate"
                                        :rules="rulesValidate" label-width="120px" class="demo-ruleForm" size="default">
                                        <el-form-item class="mt-18 item-input" label="" label-width="105px"
                                            prop="phone">
                                            <!-- 手机号 -->
                                            <el-input class="input" v-model="ruleFormValidate.phone"
                                                placeholder="请输入手机号" />
                                        </el-form-item>
                                        <el-form-item class="mt-22 item-input validate" label="" label-width="105px"
                                            prop="validate">
                                            <!-- 验证码 -->
                                            <div class="just-between validate-flex">
                                                <el-input class="input" v-model="ruleFormValidate.validate"
                                                    placeholder="请输入短信验证码" type="" autocomplete="off" />
                                                <el-button v-show="ruleFormValidate.isCountDown" style="width:102px"
                                                    :disabled="ruleFormValidate.phone.length == 11 ? false : true"
                                                    :color="ruleFormValidate.phone.length == 11 ? '#356ffa' : '#ececec'"
                                                    :class="'btn-validate ' + (ruleFormValidate.phone.length == 11 ? 'c-ffffff' : 'c-b9b9b9')"
                                                    @click="getvalidate($event, ruleFormValidate)">
                                                    获取验证码</el-button>
                                                <el-button v-show="!ruleFormValidate.isCountDown" style="width:102px"
                                                    disabled color='#ececec' class="btn-validate c-b9b9b9">
                                                    {{ `${ruleFormValidate.countDown}秒后重试` }}</el-button>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="m-0">
                                            <el-button class=" btn fs-16 mt-15 " color="#356ffa" type="primary"
                                                @click="submitFormValidate(ruleFormValidateRef)">立即登录
                                            </el-button>
                                        </el-form-item>
                                        <el-form-item class="mt-5">
                                            <span
                                                class="detail fs-12 c-8d9ea7 mt-10">未注册的用户，登录成功后将自动注册为本招聘平台的企业用户。</span>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </main>
                    <main v-show="isOpen == 2">
                        <div class="header just-center mt-40 mb-40">
                            <h3 class="fs-18">新用户注册</h3>
                        </div>
                        <div class="main ">
                            <el-form ref="ruleFormRegisterRef" label-position="right" :model="ruleFormRegister"
                                :rules="rulesRegister" label-width="120px" class="demo-ruleForm" size="default">
                                <el-form-item class="mt-18 item-input" label="" label-width="105px" prop="phone">
                                    <!-- 手机号 -->
                                    <el-input class="input" v-model="ruleFormRegister.phone" placeholder="请输入手机号" />
                                </el-form-item>
                                <el-form-item class="mt-22 item-input validate" label="" label-width="105px"
                                    prop="validate">
                                    <!-- 验证码 -->
                                    <div class="just-between validate-flex">
                                        <el-input class="input" v-model="ruleFormRegister.validate"
                                            placeholder="请输入短信验证码" autocomplete="off" />
                                        <el-button v-show="ruleFormRegister.isCountDown" style="width:102px"
                                            :disabled="ruleFormRegister.phone.length == 11 ? false : true"
                                            :color="ruleFormRegister.phone.length == 11 ? '#356ffa' : '#ececec'"
                                            :class="'btn-validate ' + (ruleFormRegister.phone.length == 11 ? 'c-ffffff' : 'c-b9b9b9')"
                                            @click="getvalidate($event, ruleFormRegister)">
                                            获取验证码</el-button>
                                        <el-button v-show="!ruleFormRegister.isCountDown" style="width:102px" disabled
                                            color='#ececec' class="btn-validate c-b9b9b9">
                                            {{ `${ruleFormRegister.countDown}秒后重试` }}</el-button>
                                    </div>
                                </el-form-item>
                                <el-form-item class="mt-18 item-input" label="" label-width="105px" prop="password">
                                    <!-- 设置密码 -->
                                    <el-input class="input" type="password" v-model="ruleFormRegister.password"
                                        placeholder="请设置6-16位密码" />
                                </el-form-item>
                                <el-form-item class="m-0">
                                    <el-button class=" btn fs-16 mt-15 " color="#2d8cf0" type="primary"
                                        @click="submitFormRegister(ruleFormRegisterRef)">注册
                                    </el-button>
                                </el-form-item>
                                <el-form-item class="mt-5">
                                    <p class="existing-account fs-14 c-8d9ea7 mt-10">已有账号，<span class="to-login"
                                            @click="isOpen = 1">去登录</span></p>
                                </el-form-item>
                            </el-form>
                        </div>
                    </main>
                    <main v-show="isOpen == 3">
                        <div class="header just-center mt-40 mb-40">
                            <h3 class="fs-18">忘记密码</h3>
                        </div>
                        <div class="main ">
                            <el-steps :active="active" finish-status="success" align-center>
                                <el-step title="验证手机号" />
                                <el-step title="重置密码" />
                            </el-steps>
                            <!-- 第一步 -->
                            <el-form ref="ruleFormForgotPwRef" v-show="isNext" label-position="right"
                                :model="ruleFormForgotPw" :rules="rulesForgotPw" label-width="120px"
                                class="demo-ruleForm" size="default">
                                <el-form-item class="mt-18 item-input" label="" label-width="105px" prop="phone">
                                    <!-- 手机号 -->
                                    <el-input class="input" v-model="ruleFormForgotPw.phone" placeholder="请输入注册手机号" />
                                </el-form-item>
                                <el-form-item class="mt-22 item-input validate" label="" label-width="105px"
                                    prop="validate">
                                    <!-- 验证码 -->
                                    <div class="just-between validate-flex">
                                        <el-input class="input" v-model="ruleFormForgotPw.validate"
                                            placeholder="请输入短信验证码" autocomplete="off" />
                                        <el-button v-show="ruleFormForgotPw.isCountDown" style="width:102px"
                                            :disabled="ruleFormForgotPw.phone.length == 11 ? false : true"
                                            :color="ruleFormForgotPw.phone.length == 11 ? '#356ffa' : '#ececec'"
                                            :class="'btn-validate ' + (ruleFormForgotPw.phone.length == 11 ? 'c-ffffff' : 'c-b9b9b9')"
                                            @click="getvalidate($event, ruleFormForgotPw)">
                                            获取验证码</el-button>
                                        <el-button v-show="!ruleFormForgotPw.isCountDown" style="width:102px" disabled
                                            color='#ececec' class="btn-validate c-b9b9b9">
                                            {{ `${ruleFormForgotPw.countDown}秒后重试` }}</el-button>
                                    </div>
                                </el-form-item>
                                <el-form-item class="m-0">
                                    <el-button class=" btn fs-16 mt-15 " color="#2d8cf0" type="primary"
                                        @click="submitFormForgotPw(ruleFormForgotPwRef)">找回密码
                                    </el-button>
                                </el-form-item>
                                <el-form-item class="mt-5">
                                    <p class="existing-account fs-14 c-8d9ea7 mt-10"><span class="to-login"
                                            @click="isOpen = 1">返回登录</span></p>
                                </el-form-item>
                            </el-form>
                            <!-- 第二步 -->
                            <el-form ref="ruleFormResetPwRef" v-show="!isNext" label-position="right"
                                :model="ruleFormResetPw" :rules="rulesResetPw" label-width="120px" class="demo-ruleForm"
                                size="default">
                                <el-form-item class="mt-18 item-input" label="" label-width="105px" prop="password">
                                    <!-- 重置密码 -->
                                    <el-input class="input" v-model="ruleFormResetPw.password" placeholder="请输入6-16位新密码"
                                        type="password" />
                                </el-form-item>
                                <el-form-item class="mt-22 item-input " label="" label-width="105px" prop="checkPass">
                                    <!-- 再次输入密码 -->
                                    <el-input class="input" v-model="ruleFormResetPw.checkPass" placeholder="请再次输入密码"
                                        type="password" autocomplete="off" />
                                </el-form-item>
                                <el-form-item class="m-0">
                                    <el-button class=" btn fs-16 mt-15 " color="#2d8cf0" type="primary"
                                        @click="submitFormResetPw(ruleFormResetPwRef)">确认
                                    </el-button>
                                </el-form-item>
                                <el-form-item class="mt-5">
                                    <p class="existing-account fs-14 c-8d9ea7 mt-10"><span class="to-login"
                                            @click="isOpen = 1">返回登录</span></p>
                                </el-form-item>
                            </el-form>
                        </div>
                    </main>
                    <!-- 右侧背景图 -->
                    <img class="schools" src="@/assets/images/schools_login.png" alt="">
                </div>
                <!-- ------------- -->
                <!-- 页脚------ -->
                <footer class="footer">
                    <ul class="just-center mt-30 fs-14">
                        <li class="just-center " v-for="item in footer" :key="item.id">
                            <p>{{ item.title }}</p>
                            <span class="fs-16">{{ item.quantity }}</span>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
        <!-- ------------------ -->
    </div>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
const router = useRouter();

interface Res {
    code: number,
    data: string | [],
    msg: string,
}

let user = useUserStore();

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

// 页脚
const footer = [
    {
        id: 1,
        title: '合作高校',
        quantity: '1000+',
    },
    {
        id: 2,
        title: '覆盖学校',
        quantity: '100万+',
    },
    {
        id: 3,
        title: '网络招聘会',
        quantity: '2万+',
    },
    {
        id: 4,
        title: '线下招聘会',
        quantity: '100+',
    },
]

// 登录注册忘记密码
let isOpen = ref(1);//1是登录，2是注册，3是忘记密码
// 步骤条
const active = ref(0);
let isNext = ref(true);
const next = () => {
    if (active.value++ > 2) active.value = 0;
    isNext.value = false
}
// tabs--------------------
const activeName = ref('first');
// ----------------------

// from表单----------------
let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
let validatePhone = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入正确的手机号'))
    } else {
        if (regPhone.test(value)) {
            callback()
        } else if (!regPhone.test(value)) {
            callback(new Error('请输入正确的手机号'))
        }
    }
}


// 密码登录
const ruleFormPassRef = ref<FormInstance>()
const ruleFormPass = reactive({
    phone: '',
    password: '',
})

const rulesPass = reactive<FormRules>({
    // phone: [
    //     { required: true, message: '请输入手机号', trigger: 'blur' },
    //     { validator: validatePhone, }
    // ],
    // password: [
    //     { required: true, message: '请输入密码', trigger: 'blur' },
    //     { min: 6, max: 20, message: '6-20位之间', trigger: 'blur' },
    // ],
})


const submitFormPass = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 登录
            let login = async (options: any) => {
                const res: any | Res = await user.login(options);
                if (res.code == 200) {
                    sessionStorage.setItem('token', res.data)
                    window.location.href = `/`;
                    console.log(res)
                }
            }
            login({
                phone: ruleFormPass.phone,
                password: ruleFormPass.password,
                loginType: 0,
            })
        } else {

        }
    })
}
//验证码登录
const ruleFormValidateRef = ref<FormInstance>()
const ruleFormValidate = reactive({
    phone: '',
    validate: '',
    countDown: 60,
    isCountDown: true
})

const rulesValidate = reactive<FormRules>({
    // phone: [
    //     { required: true, message: '请输入手机号', trigger: 'blur' },
    //     { validator: validatePhone, }
    // ],
    // validate: [
    //     { required: true, message: '请输入验证码', trigger: 'blur' },
    //     { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' },
    // ],
})

const submitFormValidate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 登录
            let login = async (options: any) => {
                const res: any | Res = await user.login(options);
                if (res.code == 200) {
                    sessionStorage.setItem('token', res.data)
                    // window.location.href = `/`;
                    console.log(res)
                }
            }
            login({
                phone: ruleFormValidate.phone,
                smsCode: ruleFormValidate.validate,
                loginType: 1,
            })
        } else {
            ElMessage({
                message: '验证码错误或手机号不正确',
                type: 'warning',
            });
        }
    })
}

//注冊
const ruleFormRegisterRef = ref<FormInstance>()
const ruleFormRegister = reactive({
    phone: '',
    validate: '',
    password: '',
    countDown: 60,
    isCountDown: true
})

const rulesRegister = reactive<FormRules>({
    // phone: [
    //     { required: true, message: '请输入手机号', trigger: 'blur' },
    //     { validator: validatePhone, }
    // ],
    // validate: [
    //     { required: true, message: '请输入验证码', trigger: 'blur' },
    //     { min: 4, max: 4, message: '请输入6位验证码', trigger: 'blur' },
    // ],
    // password: [
    //     { required: true, message: '请输入密码', trigger: 'blur' },
    //     { min: 6, max: 20, message: '6-20位之间', trigger: 'blur' },
    // ],
})

const submitFormRegister = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 注册接口
            let register = async (options: any) => {
                const res: any | Res = await user.login(options);
                if (res.code == 200) {
                    ElMessage({
                        message: '注册成功，请登录',
                        type: 'success',
                    });
                    isOpen.value = 1;
                } else {
                    ElMessage({
                        message: '账号已存在，请登录',
                        type: 'warning',
                    });
                }
            }
            register({
                phone: ruleFormRegister.phone,
                smsCode: ruleFormRegister.validate,
                password: ruleFormRegister.password,
                loginType: 2,
                inviteCode: 0,
            })
        } else {
        }
    })
}
//忘记密码
const ruleFormForgotPwRef = ref<FormInstance>()
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
    await formEl.validate((valid, fields) => {
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
    await formEl.validate((valid, fields) => {
        if (valid) {
            //重置密码
            let register = async (options: any) => {
                const res: any | Res = await user.login(options);
                if (res.code == 200) {
                    ElMessage({
                        message: '重置成功，请登录',
                        type: 'success',
                    });
                    isOpen.value = 1;
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

// -------------------------
</script>

<style lang="scss" scoped>
// 需要在main.css里的样式
.mt-72 {
    margin-top: 72px;
}

.mt-8 {
    margin-top: 8px;
}

.m-0 {
    margin: 0;
}

.mt-5 {
    margin-top: 5px;
}

.mt-18 {
    margin-top: 18px;
}

.mt-22 {
    margin-top: 22px;
}

.c-575757 {
    color: #575757;
}

.c-ffffff {
    color: #ffffff !important;
}

.c-b9b9b9 {
    color: #b9b9b9 !important;
}

// 少量的只在此页用到的公共样式
$margin-auto: 0 auto;
$border-radius: 8px;
$width100: 100%;

// element 样式穿透
:deep(.el-tabs__nav) {
    --height: 40px;
    height: var(--height);
    line-height: var(--height);
}

:deep(.el-tabs__content) {

    padding: 0 2px;
}

:deep(.is-active) {
    --el-color-primary: #000000;
    // --el-color-primary:#000000;
    font-weight: 700;
    font-size: 16px;
}

:deep(.el-tabs__active-bar) {
    height: 3px;
    width: 56px !important;
    left: 10%;
}

:deep(.el-tabs__item) {
    font-size: 16px;
    width: 160px;
    text-align: center;
    text-indent: -18px;
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


.wrap-w {
    height: 90vh;
}

.wrap-login {
    height: 100vh;
    background-image: url(@/assets/images/bg_login.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-size: cover;

    // 头部
    header {
        font-size: 0;
        width: 64%;
        margin: $margin-auto;
        padding-top: 16px;

        // logo
        .logo {
            width: 142px;
            height: 40px;
        }
    }

    // 主要内容
    .warp-main {
        gap: 0 16px;

        // 右边背景图
        .schools {
            width: 344px;
            height: 470px;
            border-radius: $border-radius;
        }

        // 左边登录注册
        main {
            width: 472px;
            background-color: #ffffff;
            border-radius: $border-radius;

            .main {
                padding: 0 76px;

                .item-input {
                    border-radius: 5px;
                    background-color: #f6f7f9;
                }

                .forget-pass {
                    width: $width100;
                    line-height: 24px;
                    margin-right: 2px;
                    justify-content: right;
                }

                .btn {
                    width: $width100;
                    height: 42px;
                }

                .btn-register {
                    color: #515a6e !important;

                    .icon-right {
                        width: 18px;
                    }
                }

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

                .detail {
                    line-height: 18px;
                }

                .to-login {
                    color: #00157c;
                }

                .existing-account {
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }

    // 页脚
    footer {
        padding-bottom: 68px;

        ul {
            li {
                padding: 0 25px;
                border-right: 1px solid #a4a4a4;
                line-height: 16px;

                &:last-child {
                    border: 0;
                }

                p {
                    margin-right: 10px;
                }

                span {
                    font-weight: 700;
                }
            }
        }
    }
}
</style>