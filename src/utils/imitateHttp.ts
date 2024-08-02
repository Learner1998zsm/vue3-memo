/**
 * 模拟网络请求
 * @param cb 
 * @param timeout 
 * @returns 
 */
export const imitateHttp = <T>(cb: (s: Function, f: Function) => void, timeout = 1000) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => cb(resolve, reject), timeout)
  })
}
