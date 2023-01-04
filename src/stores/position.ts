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
        return (Api.getPositionData(params) as any);
    }
    function getProfessional(params:any) {
        return (Api.getMajorList(params) as  any);
    }
    function getMonthDay(params:any) {
        return (Api.getMonthDay(params) as any);
    }
    function getEducation(params:any) {
        return (Api.getEducationList(params) as any);
    }
    function getCompanyIndustry(params:any) {
        return (Api.getCompanyIndustry(params) as any);
    }
    function getWishMoney(params:any) {
        return (Api.getWishMoney(params) as any);
    }
    function getInternshipMoney(params:any){
        return (Api.getInternshipMoney(params) as any);
    }
    function addPosition(params:any){
        return (Api.releasePosition(params) as any);
    }
    function deletePosition(params:any){
        return (Api.deletePosition(params) as any);
    }
    function updatePosition(params:any){
        return (Api.modifyPosition(params) as any);
    }
    function updatePositionStatus(params:any){
        return (Api.modifyPositionStatus(params) as any);
    }
    function getPositionDetail(params:any){
        return (Api.getPositionDetail(params) as any);
    }
    function refreshPosition(params:any){
        return (Api.refreshPosition(params) as any);
    }
    function autoRefreshPosition(params:any){
        return (Api.autoRefreshPosition(params) as any);
    }
    return { autoRefreshPosition,getPosition, getProfessional, getMonthDay, getEducation, getCompanyIndustry, getWishMoney,getInternshipMoney,addPosition,deletePosition,updatePosition,updatePositionStatus,getPositionDetail,refreshPosition };
});
