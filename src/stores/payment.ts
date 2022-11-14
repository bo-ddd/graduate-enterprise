import { defineStore } from "pinia";
import Api from "@/api/api.js";

interface Payment {
    userId:number,
    companyId:number,
    month:number,
    vipId:number,
}

export const usePaymentStore = defineStore("payment", () => {
  function payment(payload: Payment) {
    return Api.payment(payload);
  }

  return { payment };
});
