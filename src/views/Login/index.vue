<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LoginForm, RegisterForm } from './type'
import { ElForm, ElMessage } from 'element-plus'
import { useComponentRef } from '@/hooks/useComponentRef'
import { useRouter } from 'vue-router'
import { PHONE_PATTERN, PWD_PATTERN } from '@/constants'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()

defineOptions({
  name: 'Login',
})

const is_login = ref(true)
const loginForm = ref<LoginForm>({
  phone: '',
  password: '',
})
const registerForm = ref<RegisterForm>({
  username: '',
  phone: '',
  password: '',
  passwordSure: '',
})
const form = computed(() => {
  return is_login ? loginForm.value : registerForm.value
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    {
      required: true,
      pattern: PHONE_PATTERN,
      message: '请输入正确的手机号',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: PWD_PATTERN, message: '密码位数6-16', trigger: ['change', 'blur'] },
  ],
  passwordSure: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, cb: any) => {
        if (value === form.value.password) {
          cb()
        } else {
          cb(new Error('两次密码不一致'))
        }
      },
      trigger: ['change', 'blur'],
    },
  ],
}

const formRef = useComponentRef(ElForm)
const loading = ref(false)

const onSubmit = async () => {
  try {
    loading.value = true
    await formRef.value?.validate()
    if (is_login.value) {
      await userStore.login(form.value as LoginForm)
      ElMessage.success('登录成功!')
      setTimeout(() => {
        router.replace('/')
      }, 500)
    } else {
      const res = await userStore.register(form.value as RegisterForm)
      is_login.value = true
      loginForm.value = res
      ElMessage.success('注册成功!')
    }
  } catch (error: any) {
    console.log(error)
    ElMessage.error(error)
  } finally {
    loading.value = false
  }
}
const toggleLogin = () => {
  is_login.value = !is_login.value
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="login-page">
    <el-form class="login-form" :model="form" ref="formRef" :rules="rules" size="large">
      <h2 class="title">{{ is_login ? '登录' : '注册' }}</h2>
      <el-form-item v-if="!is_login" prop="username">
        <el-input v-model="(form as RegisterForm).username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="!is_login" prop="passwordSure">
        <el-input
          v-model="(form as RegisterForm).passwordSure"
          type="password"
          show-password
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="loading" @click="onSubmit">{{
          is_login ? '登录' : '注册'
        }}</el-button>
      </el-form-item>
      <div class="text-row">
        <span class="text" @click="toggleLogin">{{
          is_login ? '没有账号? 去注册' : '已有账号? 去登录'
        }}</span>
      </div>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/img/login-bg.jpg') no-repeat;
  background-size: cover;
}
.login-form {
  margin-top: -150px;
  width: 400px;
  padding: 30px 50px;
  box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  .title {
    margin-bottom: 18px;
    text-align: center;
  }
  .text-row {
    text-align: right;
    .text {
      color: #333;
      &:hover {
        color: #3f9eff;
      }
      cursor: pointer;
    }
  }
  .login-btn {
    width: 100%;
    margin-top: 14px;
  }
}
</style>
