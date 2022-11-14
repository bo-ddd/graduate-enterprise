import { defineStore } from "pinia";
import Api from "@/api/api.js";

export const useVipStore = defineStore("vip", () => {

     let getVip = (payload:{})=>{
        return Api.getVip(payload)
     }

  return { getVip };
});
