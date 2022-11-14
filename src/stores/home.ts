import { defineStore } from "pinia";
import Api from "@/api/api";


export const useHomeStore = defineStore("home", () => {
    // 获取企业详细信息接口
    function getEnterprise(payload: { userId: number }) {
        return Api.getEnterpriseInfo(payload);
    }
    // 修改企业详细信息接口
    // companyAddr: string,
    // companyContactEmail: string,
    // companyContactName: string,
    // companyContactPhone: string,
    // companyFullName: string,
    // companyIndustryLeft: string,
    // companyIndustryRight: string,
    // companyIntroducation: string,
    // companyLicense: string,
    // companyLogo: any,
    // companyName: string,
    // companyNature: number,
    // companyRegisterAddr: string,
    // companySize: number,
    // companySocialCreditCode: string,
    // companyStatus: number,
    // companyTag: number,
    // companyWebUrl: string,
    // companyWishSchool: string,
    function setModifyEnterpriseInfo(payload: {
        companyAddr: string,
        userId: number
    }) {
        return Api.setModifyEnterpriseInfo(payload);
    }
    // 获取所属行业下拉框
    function getIndustryList(payload = {}) {
        return Api.getIndustryList(payload);
    }

    // 获取企业性质下拉框
    function getEnterpriseNatureList(payload = {}) {
        return Api.getEnterpriseNatureList(payload);
    }

    // 获取企业规模下拉框
    function getEnterpriseSizeList(payload = {}) {
        return Api.getEnterpriseSizeList(payload);
    }

    // 获取企业标签下拉框
    function getEnterpriseTagList(payload = {}) {
        return Api.getEnterpriseTagList(payload);
    }

    // 获取学校下拉框
    function getSchoolList(payload = {}) {
        return Api.getSchoolList(payload);
    }
    /**
     * @describe 修改企业意向学校
     * @param companyOnlyWishSchool 企业仅向意向学校展示职位 
     * @param companyWishSchool 企业意向学校 多选格式1,2,3  
     * @param userId 用户id  
     */
    function setEnterpriseSchoolOfIntention(payload:{
        companyOnlyWishSchool: boolean,// 企业仅向意向学校展示职位 
        companyWishSchool: string,// 企业意向学校 多选格式1,2,3 ,
        userId:Number,// 用户id
    }) {
        return Api.setEnterpriseSchoolOfIntention(payload);
    }
    // 获取职位列表
    function getPositionList(payload: {
        pageIndex: number,
        pageSize: number,
        positionStatus: number,
        userId: number
    }) {
        return Api.getPositionData(payload);
    }

    return {
        getEnterprise,
        setModifyEnterpriseInfo,
        getIndustryList,
        getEnterpriseNatureList,
        getEnterpriseSizeList,
        getEnterpriseTagList,
        getSchoolList,
        getPositionList,
        setEnterpriseSchoolOfIntention,
    };
});
