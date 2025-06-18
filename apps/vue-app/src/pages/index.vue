<template>
  <div class="auth-container">
    <div class="auth-card">
      <a-tabs default-active-key="login">
        <a-tab-pane key="login" title="登录">
          <a-form
            :model="loginForm"
            @submit="handleLogin"
            class="auth-form"
          >
            <a-form-item field="username" label="用户名" validate-trigger="blur">
              <a-input v-model="loginForm.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" validate-trigger="blur">
              <a-input-password v-model="loginForm.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" long>登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        
        <a-tab-pane key="register" title="注册">
          <a-form
            :model="registerForm"
            @submit="handleRegister"
            class="auth-form"
          >
            <a-form-item field="username" label="用户名" validate-trigger="blur">
              <a-input v-model="registerForm.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" validate-trigger="blur">
              <a-input-password v-model="registerForm.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item field="confirmPassword" label="确认密码" validate-trigger="blur">
              <a-input-password v-model="registerForm.confirmPassword" placeholder="请再次输入密码" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" long>注册</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { post, setToken } from '../utils/request';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginForm = reactive({
  username: '',
  password: ''
});

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const handleLogin = async () => {
  try {
    const res = await post('/users/login', {
      username: loginForm.username,
      password: loginForm.password
    });
    
    if (res.success) {
      // 存储token
      setToken(res.data.token);
      Message.success('登录成功');
      // 跳转到首页
      router.push('/');
    }
  } catch (error) {
    // 错误已经在请求拦截器中处理
    console.error('Login failed:', error);
  }
};

const handleRegister = async () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    Message.error('两次输入的密码不一致');
    return;
  }

  try {
    const res = await post('/users/register', {
      username: registerForm.username,
      password: registerForm.password
    });
    
    if (res.success) {
      Message.success('注册成功');
      // 清空表单
      registerForm.username = '';
      registerForm.password = '';
      registerForm.confirmPassword = '';
    }
  } catch (error) {
    // 错误已经在请求拦截器中处理
    console.error('Register failed:', error);
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  width: 400px;
  padding: 24px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.auth-form {
  margin-top: 24px;
}

:deep(.arco-tabs-nav-tab) {
  justify-content: center;
}

:deep(.arco-form-item-label) {
  font-weight: 500;
}
</style> 