<template>
    <div class="enterprise-registra">
        <div class="wrap container">
            <div class="title-wrap">
                <h2>企业信息编辑</h2>
            </div>
            <el-form :model="form" label-width="120px">
                <div class="form">
                    <h3>基本信息</h3>
                    <!-- 企业全称 -->
                    <el-form-item label="企业全称">
                        <el-input class="el-input_560-40" placeholder="需与营业执照一致" v-model="form.companyFullName" />
                    </el-form-item>

                    <!-- 品牌全称 -->
                    <el-form-item label="品牌名称">
                        <el-input class="brand-name" placeholder="品牌名称或企业简称,一般不超过6个字" v-model="form.companyName" />
                    </el-form-item>

                    <!-- 企业logo -->
                    <el-form-item label="企业logo">
                        <el-upload action="#" list-type="picture-card" :auto-upload="false">
                            <el-icon class="uplpoad-icon flex-column-center">
                                <div>
                                    <Plus />
                                </div>
                                <div class="fs-13">上传图片</div>
                            </el-icon>

                            <template #file="{ file }">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)">
                                            <el-icon>
                                                <zoom-in />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleDownload(file)">
                                            <el-icon>
                                                <Download />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleRemove(file)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </span>
                                    </span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>

                    <!-- 企业注册地区 -->
                    <el-form-item label="企业注册地区">
                        <el-cascader placeholder="请输入" class="el-input_240" :options="RegisteredArea" clearable>

                        </el-cascader>
                    </el-form-item>

                    <!-- 详细注册地址 -->
                    <el-form-item label="详细注册地址">
                        <el-input placeholder="详细注册地址" class="el-input_560-40" v-model="form.companyAddr" />
                    </el-form-item>

                    <!-- 禁用状态的选择器 disabled -->
                    <el-form-item label="所属行业">
                        <el-cascader placeholder="请选择" class="el-input_240" v-model="forbidden" :options="forbiddenData"
                            @change="handleChange">
                            <template #value>
                                <span>{{ forbiddenData[0] }}</span>
                            </template>
                        </el-cascader>
                    </el-form-item>


                    <!-- 正常状态的选择器 -->
                    <el-form-item label="企业性质">
                        <el-select v-model="enterpriseNatureVal" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseNature" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业规模">
                        <el-select v-model="enterpriseScaleVal" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseScale" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业标签">
                        <el-select v-model="enterpriseLabelVal" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseLabel" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>

                <div class="form">
                    <h3>认证信息</h3>
                    <!-- 社会信用代码 -->
                    <el-form-item label="社会信用代码">
                        <el-input placeholder="社会信用代码" class="input_280-40" v-model="form.companySocialCreditCode" />
                    </el-form-item>

                    <!-- 营业执照 -->
                    <div class="align-center">
                        <el-form-item label="营业执照"></el-form-item>
                        <div>
                            <el-upload action="#" :on-success="abc" list-type="picture-card" :auto-upload="false">
                                <el-icon class="uplpoad-icon flex-column-center">
                                    <div>
                                        <Plus />
                                    </div>
                                    <div class="fs-13">上传图片</div>
                                </el-icon>
                                <template #file="{ file }">
                                    <div @click="add(file)">
                                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview"
                                                @click="handlePictureCardPreview(file)">
                                                <el-icon>
                                                    <zoom-in />
                                                </el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @change="handleDownload(file)">
                                                <el-icon>
                                                    <Download />
                                                </el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @click="handleRemove(file)">
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </el-upload>
                            <div class="business-license_test mt-10">
                                <p>
                                    请上传清晰的营业执照, 执照中的<b>社会信用代码、企业名称</b>需与上方填写的一致。
                                </p>
                                <p>图片大小不可超过<b>2M</b>, 格式为jpg,jpeg或png</p>
                            </div>
                        </div>
                    </div>

                    <div class="horizontal-line"></div>

                    <div>
                        <h3>联系信息</h3>
                        <!-- 联系人 -->
                        <el-form-item label="联系人">
                            <el-input placeholder="填写联系人" class="input_280-40" v-model="form.companyContactName" />
                        </el-form-item>

                        <!-- 联系方式 -->
                        <el-form-item label="联系方式">
                            <el-input placeholder="填写联系方式" class="input_280-40" v-model="form.companyContactPhone" />
                        </el-form-item>

                        <!-- 接受简历邮箱 -->
                        <el-form-item label="接受简历邮箱">
                            <el-input placeholder="填写接受简历邮箱" class="input_280-40" v-model="form.companyContactEmail" />
                        </el-form-item>
                    </div>
                </div>

                <div class="form footer">
                    <h3>企业简介</h3>

                    <!-- 企业简介 -->
                    <div class="align-center mb-24">
                        <el-form-item label="企业简介"></el-form-item>
                        <el-input class="textarea_560-184" v-model="form.companyIntroducation" type="textarea" />
                    </div>

                    <!-- 企业官网 -->
                    <el-form-item label="企业官网">
                        <el-input placeholder="非必填" class="input_280-40" v-model="form.companyWebUrl" />
                    </el-form-item>

                    <div class="horizontal-line"></div>

                    <div class="school-of-intention">
                        <div class="flex">
                            <h3>意向学校</h3>
                            <p class="ml-16 intention-description">企业的招聘信息在所选学校会优先展示</p>
                        </div>

                        <div class="align-center">
                            <el-form-item label="学校">
                                <el-select size="large" class="school-input" v-model="schoolListVal" multiple
                                    placeholder="请输入">
                                    <el-option v-for="item in schoolList" :key="item.sortId" :label="item.schoolName"
                                        :value="item.schoolId" />
                                </el-select>
                            </el-form-item>
                        </div>
                        <div></div>
                    </div>
                </div>

                <div>
                    <!-- 提交 -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script setup lang="ts">
// 底部
import footerBar from '@/components/footer/footerBar.vue';
// 这个是企业注册地区的数据
import RegisteredArea from './registeredArea';
// 这个是form表单要用的
import { reactive } from 'vue';
// 这个是企业LOGO上传头像需要用到的
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { useHomeStore } from '@/stores/home';
// ajax
const use = useHomeStore();

// form 表单数据
const form = reactive({
    companyFullName: '',// 企业全称
    companyName: '',// 企业简称 (品牌名称)
    companyStatus: 0,// 企业状态 integer 整数类型
    companyLogo: '',// 企业Logo
    companyRegisterAddr: '',// 企业地址
    companyAddr: '',// 企业详细地址
    companyIndustryLeft: '',// 企业所属行业
    companyIndustryRight: '',// 企业所属行业
    companyNature: 0,// 企业性质 integer
    companySize: 0,// 企业规模 integer
    companyTag: 0,// 企业标签 integer
    companySocialCreditCode: '',//企业社会信用代码
    companyLicense: '',// 企业营业执照 file
    companyLicenseUrl: '',// 企业营业执照Url 不填
    companyContactName: '',// 企业联系人
    companyContactPhone: '',// 企业联系电话
    companyContactEmail: '',// 企业接收简历邮箱
    companyIntroducation: '',// 企业简介
    companyWebUrl: '',// 企业官网
    companyWishSchool: '',// 企业意向学校
});

function add(file: any) {
    console.log(file)
}

function abc(value: any) {
    console.log(value)
}
// 点击提交按钮走的方法
const onSubmit = () => {
    console.log(form)
};
// companyWebUrl
let getEnterpriseData = reactive<any[]>([]);
// 调用 获取企业详细信息接口 报错
let getEnterprise = async function () {
    let res = await use.getEnterprise({ userId: 10000 });
    Object.assign(getEnterpriseData, res.data);
    console.log('获取企业详细信息接口', getEnterpriseData);
    Object.assign(form, res.data);
}
getEnterprise();

// 调用 修改企业详细信息接口 报错
// let setModifyEnterpriseInfo = async function () {
//     let res = await use.setModifyEnterpriseInfo({
//         companyAddr: '山西',
//         userId: 10000
//     });
//     console.log(res);
// }
// setModifyEnterpriseInfo();


// 所属行业
const forbidden = ref('');
const forbiddenData = ref(<any>[]);
const handleChange = (value: any) => {
    console.log(value)
}

// 调用 获取所属行业下拉框接口 报错
let getIndustryList = async function () {
    let res = await use.getIndustryList();
    Object.assign(forbiddenData.value, res.data)
    console.log(forbiddenData.value)
}
getIndustryList();

// 上传企业LOGO的逻辑
const dialogVisible = ref(false);
const disabled = ref(false);
const handleRemove = (file: UploadFile) => {
    console.log(file)
};
const handlePictureCardPreview = (file: UploadFile) => {
    console.log('log ~ file', file);
    dialogVisible.value = true;
    console.log(1);

};
const handleDownload = (file: UploadFile) => {
    console.log(file)
    console.log('log ~ file.url', file.url);
};

// 企业性质
const enterpriseNatureVal = ref('其他')
// 企业规模
const enterpriseScaleVal = ref('100-499人')
// 企业标签
const enterpriseLabelVal = ref('其他')

// 企业性质
interface EnterpriseNature {
    label: string,
    value: number,
    createTime: null,
    modifyTime: null
}
let enterpriseNature = reactive<EnterpriseNature[]>([]);
// 调用 获取企业性质下拉框
let getEnterpriseNatureList = async function () {
    let res = await use.getEnterpriseNatureList();
    Object.assign(enterpriseNature, res.data)
}
getEnterpriseNatureList();

// 企业规模
interface EnterpriseScale {
    createTime: null,
    label: string,
    modifyTime: null,
    value: number,
}
let enterpriseScale = reactive<EnterpriseScale[]>([])
// 调用 获取企业规模下拉框
let getEnterpriseSizeList = async function () {
    let res = await use.getEnterpriseSizeList();
    Object.assign(enterpriseScale, res.data)
}
getEnterpriseSizeList();

// 企业标签
interface EnterpriseLabel {
    createTime: null,
    label: string,
    modifyTime: null,
    value: number,
}
let enterpriseLabel = reactive<EnterpriseLabel[]>([]);
// 调用 获取企业标签下拉框
let getEnterpriseTagList = async function () {
    let res = await use.getEnterpriseTagList();
    Object.assign(enterpriseLabel, res.data);
}
getEnterpriseTagList();


const schoolListVal = ref([]);
// 学校列表
interface SchoolList {
    schoolId: number,
    schoolName: string,
    sortId: number,
}
const schoolList = reactive<SchoolList[]>([]);
let getSchoolList = async function () {
    let res = await use.getSchoolList();
    Object.assign(schoolList, res.data);
}
getSchoolList();
</script>

<style lang="scss" scoped>
.flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.uplpoad-icon {
    width: 100%;
    height: 100%;
}

.business-license_test {
    color: #808695;
}

.fs-13 {
    font-size: 13px;
}

.ml-16 {
    margin-left: 16px;
}

:deep(.el-input__inner) {
    height: 40px;
}

:deep(.el-input_240) {
    width: 240px;
    height: 40px;
}

:deep(.school-input) {
    max-width: 240px !important;
}

:deep(.el-select) {
    width: 240px;
    // height: 40px;
}

:deep(.el-button) {
    width: 268px;
    height: 40px;
    margin: 32px 0 64px 156px;
}

:deep(textarea) {
    width: 560px !important;
    height: 184px;
}

:deep(el-select) {
    max-width: 560px;
    height: 192px;
}

:deep(.input_280-40) {
    width: 280px;
    height: 40px;
}


.enterprise-registra {
    background-color: #f6f7f9;
    font-family: MicrosoftYaHei;
    overflow: hidden;

    &>.container {
        &>.title-wrap {
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            align-items: center;

            &>h2 {
                font-size: 28px;
                font-weight: 400;
                color: #17233d;
                line-height: 1;
                margin: 32px 0;
            }
        }

        .form {
            background-color: #fff;
            box-sizing: border-box;
            padding: 32px;
            border-radius: 4px;
            margin-bottom: 16px;

            .school_test {
                margin-left: 24px;

                b {
                    color: #356ffa;
                    font-size: 19px;
                    font-weight: 700;
                    font-style: normal;
                }

                span {
                    font-size: 14px;
                }
            }

            h3 {
                font-size: 18px;
                line-height: 1;
                margin-bottom: 32px;
                font-weight: 400;
                color: #17233d;
            }

            .horizontal-line {
                height: 1px;
                border-top: 1px solid #eef0f2;
                margin-bottom: 32px;
                margin-top: 8px;
            }

            .el-input_560-40 {
                width: 560px;
                height: 40px;
            }

            .brand-name {
                width: 280px;
                height: 40px;
            }

            .el-upload--picture-card {
                width: 104px;
                height: 104px;
            }

            .intention-description {
                font-size: 14px;
                color: #808695;
            }
        }
    }
}

.mb-24 {
    margin-bottom: 24px;
}
</style>