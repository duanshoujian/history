# 🚀 Vercel 部署配置指南

## 📋 什么是Vercel？

Vercel是一个现代化的前端部署平台，特别适合React、Vue、Next.js等前端项目。

### 🎯 免费额度
- ✅ 个人项目：完全免费
- ✅ 带宽：100GB/月
- ✅ 构建时间：6000分钟/月
- ✅ 自定义域名：免费
- ✅ SSL证书：自动配置

## 🔧 安装和配置步骤

### 步骤1：安装Vercel CLI

```bash
# 使用npm安装（可能需要sudo权限）
sudo npm install -g vercel

# 或者使用pnpm安装
sudo pnpm add -g vercel
```

### 步骤2：登录Vercel

```bash
vercel login
```

这会打开浏览器，让你用GitHub账号登录Vercel。

### 步骤3：初始化Vue项目

```bash
# 进入Vue应用目录
cd apps/vue-app

# 初始化Vercel项目
vercel

# 按提示配置：
# - 项目名称：history-vue-app
# - 是否覆盖：No
# - 构建命令：pnpm build
# - 输出目录：dist
# - 开发命令：pnpm dev
```

### 步骤4：获取配置信息

```bash
# 查看当前用户信息
vercel whoami

# 查看项目列表
vercel projects ls

# 查看项目详情
vercel project ls --token
```

## 🔑 获取GitHub Secrets

### 1. 获取Vercel Token

```bash
# 生成新的token
vercel token add "GitHub Actions"

# 或者查看现有token
vercel token ls
```

### 2. 获取Organization ID

```bash
# 查看组织信息
vercel teams ls
```

### 3. 获取Project ID

```bash
# 查看项目信息
vercel project ls
```

## ⚙️ 配置GitHub Secrets

### 1. 进入GitHub仓库设置

访问：`https://github.com/duanshoujian/history/settings/secrets/actions`

### 2. 添加以下Secrets

点击 "New repository secret" 添加：

```
VERCEL_TOKEN=你的Vercel令牌
VERCEL_ORG_ID=你的组织ID
VERCEL_PROJECT_ID=你的项目ID
```

## 📁 项目配置

### 1. 创建vercel.json配置文件

在 `apps/vue-app/` 目录下创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. 更新package.json

确保Vue应用的package.json有正确的构建脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 🚀 部署流程

### 自动部署（推荐）

1. **推送代码到main分支**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin main
   ```

2. **GitHub Actions自动触发**
   - 构建Vue应用
   - 部署到Vercel
   - 获得一个免费的域名

### 手动部署

```bash
# 进入Vue应用目录
cd apps/vue-app

# 构建项目
pnpm build

# 部署到Vercel
vercel --prod
```

## 🌐 域名配置

### 自动域名

Vercel会自动分配一个域名，格式如：
- `https://history-vue-app.vercel.app`

### 自定义域名

1. **在Vercel控制台添加域名**
2. **配置DNS记录**
3. **等待SSL证书自动配置**

## 📊 监控和分析

### Vercel Analytics（免费）

- 页面访问统计
- 性能监控
- 错误追踪

### 日志查看

```bash
# 查看部署日志
vercel logs

# 查看特定部署
vercel logs --deployment-url=https://xxx.vercel.app
```

## 🔧 常见问题

### 1. 构建失败

检查：
- Node.js版本兼容性
- 依赖是否正确安装
- 构建命令是否正确

### 2. 路由问题

Vue Router的history模式需要配置重写规则：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. 环境变量

在Vercel控制台设置环境变量：
- 进入项目设置
- 添加环境变量
- 重新部署

## 💡 最佳实践

1. **使用环境变量**：不要在代码中硬编码敏感信息
2. **优化构建**：减少构建时间和包大小
3. **监控性能**：定期查看Vercel Analytics
4. **备份配置**：将vercel.json提交到Git

## 🎉 完成！

配置完成后，每次推送代码到main分支，GitHub Actions就会自动构建并部署到Vercel，你就能得到一个免费的、全球加速的网站！ 