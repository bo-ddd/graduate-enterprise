import { defineStore } from "pinia";
import Api from "@/api/api.js";

export interface PositionParam {
    pageIndex: number,	//当前页
    userId: number, //用户id
    pageSize: number,//每页数量
    positionStatus: number	//职位状态 1审核 2在招 3已下线 4未通过
};
interface Res{
    code:number,
    data:any,
    msg:string
}
export const usePositionStore = defineStore("position", () => {

    function getPosition(params:any) {
        return Api.getPositionData(params) as Res;
    }
    function getProfessional() {
        return Api.getMajorList() as Res;
    }
    function getMonthDay() {
        return Api.getMonthDay() as Res;
    }
    function getEducation() {
        return Api.getEducationList() as Res;
    }
    function getCompanyIndustry() {
        return Api.getCompanyIndustry() as Res;
    }
    function getWishMoney() {
        return Api.getWishMoney() as Res;
    }
    function getInternshipMoney(){
        return Api.getInternshipMoney() as Res
    }
    function addPosition(params:any){
        return Api.releasePosition(params) as Res
    }
    function deletePosition(params:any){
        return Api.deletePosition(params) as Res
    }
    function updatePosition(params:any){
        return Api.modifyPosition(params) as Res
    }
    function updatePositionStatus(params:any){
        return Api.modifyPositionStatus(params) as Res
    }
    function getPositionDetail(params:any){
        return Api.getPositionDetail(params) as Res
    }
    function refreshPosition(params:any){
        return Api.refreshPosition(params) as Res
    }
    return { getPosition, getProfessional, getMonthDay, getEducation, getCompanyIndustry, getWishMoney,getInternshipMoney,addPosition,deletePosition,updatePosition,updatePositionStatus,getPositionDetail,refreshPosition };
});
