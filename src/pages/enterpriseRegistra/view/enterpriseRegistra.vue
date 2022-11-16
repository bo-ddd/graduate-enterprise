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
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview()">
                                            <el-icon>
                                                <zoom-in />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleDownload()">
                                            <el-icon>
                                                <Download />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleRemove()">
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
                        <el-cascader placeholder="请输入" class="el-input_240" v-model="form.companyRegisterAddr"
                            :options="cityJson" :props="{ 'label': 'name', 'value': 'name' }" clearable>
                        </el-cascader>
                    </el-form-item>

                    <!-- 详细注册地址 -->
                    <el-form-item label="详细注册地址">
                        <el-input placeholder="详细注册地址" class="el-input_560-40" v-model="form.companyAddr" />
                    </el-form-item>

                    <!-- 禁用状态的选择器 disabled -->
                    <el-form-item label="所属行业">
                        <el-cascader placeholder="请选择" v-model="companyIndustry" class="el-input_240"
                            :options="forbiddenData">
                            <template #value>
                                <span>{{ forbiddenData[0] }}</span>
                            </template>
                        </el-cascader>
                    </el-form-item>

                    <el-form-item label="企业性质">
                        <el-select v-model="form.companyNature" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseNature" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业规模">
                        <el-select v-model="form.companySize" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseScale" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业标签">
                        <el-select v-model="form.companyTag" placeholder="请选择" size="large">
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
                            <!--<el-upload class="avatar-uploader" :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>-->
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
                    <el-form-item label="企业官网" class="mt-20">
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
                                <el-select size="large" class="school-input" v-model="form.companyWishSchool" multiple
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
import footerBar from '@/components/footer/footerBar.vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import { useHomeStore } from '@/stores/home';
import cityJson from "@/assets/json/city.json";
import { ElMessage } from 'element-plus'
// import type { UploadProps } from 'element-plus'
// const imageUrl = ref('');
const use = useHomeStore();

// const beforeAvatarUpload: UploadProps['beforeUpload'] =async (rawFile) => {
//     console.log('--------上传图片之前---------');
//     let formData = new FormData();
//     formData.append('userId', 10000);
//     formData.append('companyLicense', rawFile);
//     const res = await use.UploadFilled(formData);
//     console.log(res);
//     console.log('log ~ rawFile', rawFile);
// }
// ajax
interface Form {
    companyAddr?: string,
    companyContactEmail?: string,
    companyContactName?: string,
    companyContactPhone?: string,
    companyFullName?: string,
    companyIndustryLeft?: string,
    companyIndustryRight?: string,
    companyIntroducation?: string,
    companyLicense?: string,
    companyLogo?: any,
    companyName?: string,
    companyNature?: number,
    companyRegisterAddr?: string | any,
    companySize?: number,
    companySocialCreditCode?: string,
    companyStatus?: number,
    companyTag?: number,
    companyWebUrl?: string,
    companyWishSchool?: string,
    userId: number
}

// 所属行业 绑定的数据
let companyIndustry: any = ref([]) as any;
// form 表单数据
const form: Form = reactive({
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
    companyContactName: '',// 企业联系人
    companyContactPhone: '',// 企业联系电话
    companyContactEmail: '',// 企业接收简历邮箱
    companyIntroducation: '',// 企业简介
    companyWebUrl: '',// 企业官网
    companyWishSchool: '',// 企业意向学校
    userId: 10000,
});

// 点击提交按钮走的方法
console.log('cityJson', cityJson)
const onSubmit = async () => {
    console.log('form', form)
    let obj: Form | any = {};
    let key: keyof Form;
    for (key in form) {
        if (form[key]) {
            obj[key] = form[key]
        }
    }
    console.log('校验完要传给后端的', obj)
    console.log('所属行业选中的', companyIndustry.value);
    // console.log('企业注册地区', form.companyRegisterAddr.join(','))
    // companyContactEmail: form.companyContactEmail,
    // companyContactName: form.companyContactName,
    // companyContactPhone: form.companyContactPhone,

    // companyIntroducation: form.companyIntroducation,
    // companyLicense: form.companyLicense,
    // companyLogo: form.companyLogo,
    // companyNature: form.companyNature,
    // companySocialCreditCode: form.companySocialCreditCode,
    // companyStatus: form.companyStatus,
    // companyTag: form.companyTag,
    // companyWebUrl: form.companyWebUrl,
    // companyWishSchool: form.companyWishSchool,
    const res: any | Res = await use.setModifyEnterpriseInfo({
        // companyRegisterAddr: (form.companyRegisterAddr as any).join(','),
        // companyFullName: form.companyFullName,
        // companyName: form.companyName,
        // companySize: form.companySize,
        // companyAddr: form.companyAddr,
        companyIndustryLeft: companyIndustry.value[0],
        companyIndustryRight: companyIndustry.value[1],
        userId: form.userId,
    });
    if (res.code == 200) {
        ElMessage({
            message: '修改成功！',
            type: 'success',
        })
        getEnterprise();
    };

    // setModifyEnterpriseInfo({
    //     companyFullName: form.companyFullName,
    //     companyName: form.companyName,
    //     companySize: form.companySize,
    //     userId: form.userId,
    // });
};
// companyWebUrl
// 调用 获取企业详细信息接口 
const getEnterprise = async function () {
    const res = await use.getEnterprise({ userId: 10000 });
    console.log(res.data)
    Object.assign(form, res.data);
    companyIndustry.value = res.data.companyIndustry.split(' - ');
    forbiddenData.value.forEach((element: any) => {
        if (companyIndustry.value[0] == element.label) {
            companyIndustry.value[0] = element.value;
            element.children.forEach((elementChildren: any) => {
                if (companyIndustry.value[1] == elementChildren.label) {
                    companyIndustry.value[1] = elementChildren.value
                }
            });
        }
    });
};
getEnterprise();


interface EnterpriseInfoType {
    companyAddr?: string,
    companyContactEmail?: string,
    companyContactName?: string,
    companyContactPhone?: string,
    companyFullName?: string,
    companyIndustryLeft?: string,
    companyIndustryRight?: string,
    companyIntroducation?: string,
    companyLicense?: string,
    companyLogo?: any,
    companyName?: string,
    companyNature?: number,
    companyRegisterAddr?: string,
    companySize?: number,
    companySocialCreditCode?: string,
    companyStatus?: number,
    companyTag?: number,
    companyWebUrl?: string,
    companyWishSchool?: string,
    userId: number
};
interface Res {
    code: number,
    data: string | [] | any,
    msg: string,
}
// 修改企业详细信息接口
const setModifyEnterpriseInfo = async function (payload: EnterpriseInfoType) {
    const res: any | Res = await use.setModifyEnterpriseInfo(payload);
    if (res.code == 200) {
        ElMessage({
            message: '修改成功！',
            type: 'success',
        })
        getEnterprise();
    };
};
// 所属行业
const forbiddenData: any = ref([]);
const getIndustryList = async function () {
    const res = await use.getIndustryList();
    Object.assign(forbiddenData.value, res.data);
};
getIndustryList();
const dialogVisible = ref(false);
const disabled = ref(false);
const handleRemove = (): any | void => { };
const handlePictureCardPreview = (): any | void => dialogVisible.value = true;
const handleDownload = (): any | void => { };
let enterpriseNature: any = ref([]);
const getEnterpriseNatureList = async function () {
    const res = await use.getEnterpriseNatureList();
    Object.assign(enterpriseNature.value, res.data);
};
getEnterpriseNatureList();
let enterpriseScale: any = ref([]);
// 调用 获取企业规模下拉框
const getEnterpriseSizeList = async function () {
    const res = await use.getEnterpriseSizeList();
    Object.assign(enterpriseScale.value, res.data);
};
getEnterpriseSizeList();

// 企业标签
interface EnterpriseLabel {
    createTime: null | Date,
    label: string,
    modifyTime: null | Date,
    value: number,
};
let enterpriseLabel: any | EnterpriseLabel = ref([]);
// 调用 获取企业标签下拉框
const getEnterpriseTagList = async function () {
    const res = await use.getEnterpriseTagList();
    Object.assign(enterpriseLabel.value, res.data);
};
getEnterpriseTagList();

const schoolListVal: any = ref([]);
// 学校列表
interface SchoolListType {
    schoolId: number,
    schoolName: string,
    sortId: number,
};
const schoolList: any | SchoolListType = ref([]);
const getSchoolList = async function () {
    const res = await use.getSchoolList();
    Object.assign(schoolList.value, res.data);
};
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
</style>