import { ref } from 'vue'

/**
 * 
 * @param _component vue组件(element组件)
 * @returns 组件ref
 */
export const useComponentRef = <T extends abstract new (...args: any) => any>(_component: T) => {
  return ref<InstanceType<T>>()
}
