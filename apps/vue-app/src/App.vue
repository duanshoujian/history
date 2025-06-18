<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 路由相关代码已经配置在 router.ts 中
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
}

.nav {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #42b883;
}

.nav-link.router-link-active {
  background-color: #42b883;
}
</style>
