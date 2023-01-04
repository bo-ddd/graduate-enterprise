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
  // 登录
  function login(payload: Login) {
    return Api.login(payload);
  };
  // 验证码
  function testsms(params:any) {
    return Api.testsms(params);
  };

  return { login ,testsms};
});
