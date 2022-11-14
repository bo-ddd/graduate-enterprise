import { defineStore } from "pinia";
import Api from "@/api/api.js";

interface Login {
  phone:string,
  smsCode:string,
  password:string,
  loginType:number,
  inviteCode:number
}

export const useUserStore = defineStore("user", () => {
  function login(payload: Login) {
    return Api.login(payload);
  }
  return { login };
});
