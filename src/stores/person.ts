import { ref } from 'vue'
import { defineStore } from 'pinia'
import Api from "@/api/api.js";
export const usePersonStore = defineStore('person', () => {
  const count = ref(0)  
  function getEducation(params:{}){
    return Api.getEducationList(params);
  }
  function getMajorList(params:{}){
    return Api.getMajorList(params);
  }
  function getSexList(params:{}){
    return Api.getSexList(params);
  }
  function getPositionList(params:{}){
    return Api.getPositionDrop(params);
  }
  function getWishMoney(params:{}){
    return Api.getWishMoney(params);
  }
  function getTalentList(params:{}){
    return Api.getTalentList(params);
  }
  //获取人才列表
  function getInviteList(params:{}){
    return Api.getInvite(params);
  }
  //邀请人才
  function inviteTalent(params:any){
    return Api.inviteTalent(params);
  }
  //获取职位类别
  function getPosition(params:any){
    return Api.getPosition(params);
  }
   //邀请人才下拉框
   function getInviteDrop(params:{}){
    return Api.getInviteDrop(params);
  }
  return { count , getEducation, getMajorList,getSexList,getPositionList,getWishMoney,getTalentList,getInviteList,inviteTalent,getPosition,getInviteDrop}
})
