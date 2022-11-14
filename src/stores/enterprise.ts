import { defineStore } from "pinia";
import Api from "@/api/api.js";


export const useEnterpriseStore = defineStore("enterprise", () => {

  let getEducation = (payload: {}) => {
    return Api.getEducationList(payload);
  }

  let getResume = (payload: {
    pageIndex?: number
    pageSize?: number,
    companyId: number,
    userId: number,
    deliveryStatus?: number,
    educationId?: number,
    positionId?: number,
    userName?: string,
    invitationStatus?: boolean
  }) => {
    return Api.getResume(payload);
  }

  let getPositionDrop = (payload: { userId: number }) => {
    return Api.getPositionDrop(payload);
  }

  let getStage = (payload: {}) => {
    return Api.getStage(payload);
  }

  let modifyResume = (payload: {
    deliveryId: number,
    interviewAddr: string,
    interviewName: string,
    interviewNote: string,
    interviewPhone: string,
    interviewTime: string,
    positionId: number,
    statusId: number,
    userId: number
  }) => {
    return Api.modifyResume(payload);
  }

  let modifyResumeStatus = (payload: {
    deliveryId: string,
    statusId: number,
    userId: number
  }) => {
    return Api.modifyResumeStatus(payload)
  }

  return { getEducation, getResume, getPositionDrop, getStage, modifyResume, modifyResumeStatus };
});
