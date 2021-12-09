<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">DEMO 管理后台</div>
          <div class="tips">后台管理系统</div>
        </div>
      </div>
      <el-form ref="loginForm" :model="ruleForm" :rules="rules" class="login-form" label-position="top">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="ruleForm.username" autocomplete="off" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="ruleForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue'
// @ts-ignore
import axios from '@/utils/axios'
// @ts-ignore
import md5 from 'js-md5'
import {localSet} from "../utils";
import router from "../router";

export default defineComponent({
  name: 'Login',
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: '',
        password: ''
      },
      checked: true,
      rules: {
        username: [
          {required: 'true', message: '账户不能为空', trigger: 'blur'}
        ],
        password: [
          {required: 'true', message: '密码不能为空', trigger: 'blur'}
        ]
      }
    })
    const submitForm = async () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          // todo 无论输入啥都登录成功
          localSet('token', 'test')
          router.push({path: '/welcome'})
          //axios.post('/users/login', {
          //  account: state.ruleForm.username || '',
          //  password: md5(state.ruleForm.password)
          //}).then(res => {
          //  localSet('token', res.data.data)
          //  router.push({path: '/welcome'})
          //}).catch(()=>{})
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
    const resetForm = () => {
      loginForm.value.resetFields();
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
})
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}

.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}

.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.head .title {
  font-size: 28px;
  color: #1BAEAE;
  font-weight: bold;
}

.head .tips {
  font-size: 12px;
  color: #999;
}

.login-form {
  width: 70%;
  margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}

.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>
