import { defineStore } from "pinia";
import Api from "@/api/api";
import {ref} from 'vue'
export const useSearchStore = defineStore("search", () => {
    const searchPosition=ref<number>();
    const setSearchPosition=(val:number)=>{
      searchPosition.value=val
    }
    return {
      searchPosition,setSearchPosition
    };
});
