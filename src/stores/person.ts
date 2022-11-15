import { ref } from 'vue'
import { defineStore } from 'pinia'
import Api from "@/api/api.js";
export const usePersonStore = defineStore('person', () => {
  const count = ref(0)  
  function getEducation(params:{}|null){
    return Api.getEducationList(params);
  }
  function getMajorList(params:{}|null){
    return Api.getMajorList(params);
  }
  function getSexList(params:{}|null){
    return Api.getSexList(params);
  }
  function getPositionList(params:any|null){
    return Api.getPositionDrop(params);
  }
  function getWishMoney(params:any|null){
    return Api.getWishMoney(params);
  }
  function getTalentList(params:any|null){
    return Api.getTalentList(params);
  }
  //获取人才列表
  function getInviteList(params:any|null){
    return Api.getInvite(params);
  }
  //邀请人才
  function inviteTalent(params:any|null){
    return Api.inviteTalent(params);
  }
  //获取职位类别
  function getPosition(params:any|null){
    return Api.getPosition(params);
  }
   //邀请人才下拉框
   function getInviteDrop(params:any|null){
    return Api.getInviteDrop(params);
  }
  return { count , getEducation, getMajorList,getSexList,getPositionList,getWishMoney,getTalentList,getInviteList,inviteTalent,getPosition,getInviteDrop}
})
