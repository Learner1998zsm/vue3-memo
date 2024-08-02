export { default as storage } from './storage'

export const padZero = (str: string | number) => {
  return (str + '').padStart(2, '0')
}

export const formatTime = (time: Date | string) => {
  const date = new Date(time)
  const y = date.getFullYear(),
    m = padZero(date.getMonth() + 1),
    d = padZero(date.getDate()),
    h = padZero(date.getHours()),
    mm = padZero(date.getMinutes())

  return `${y}/${m}/${d} ${h}:${mm}`
}

// 生成随机数id
export const geneId = () => {
  return Math.floor(Math.random() * 939874)
}