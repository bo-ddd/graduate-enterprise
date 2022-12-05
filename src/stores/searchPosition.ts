import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
export const useSearchPosition = defineStore('position', () => {
  const positionIdValue = ref<number|string>()

  const setPositionId = (val: number) => {
    positionIdValue.value = val;
  }
  return { positionIdValue, setPositionId }
})
