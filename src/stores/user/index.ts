import { LOGIN_USER, REGISTERED_LIST } from '@/constants'
import { storage } from '@/utils'
import type { User } from './type'
import { defineStore } from 'pinia'
import type { LoginForm, RegisterForm } from '@/views/Login/type'
import { imitateHttp } from '@/utils/imitateHttp'

export const useUserStore = defineStore('user', () => {
  const registeredList: User[] = storage.get(REGISTERED_LIST) ?? []

  const register = (user: RegisterForm): Promise<LoginForm> => {
    return imitateHttp((success, fail) => {
      const matchedUser = registeredList.find(u => u.phone === user.phone)
      if (matchedUser) fail('该手机号已注册!')
      const { username, phone, password } = user
      const id = +phone.slice(5).padStart(6, '0')
      registeredList.push({ id, username, phone, password })
      storage.set(REGISTERED_LIST, registeredList)
      success({ phone, password })
    })
  }
  const login = (user: LoginForm) => {
    return imitateHttp((success, fail) => {
      const matchedUser = registeredList.find(u => u.phone === user.phone)
      if (!matchedUser) fail('用户不存在!')
      const isMatched = matchedUser?.password === user.password
      if (isMatched) {
        storage.set(LOGIN_USER, matchedUser)
        success()
      } else {
        fail('手机号或密码错误!')
      }
    })
  }

  return {
    register,
    login,
  }
})
