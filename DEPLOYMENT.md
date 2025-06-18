# 🚀 部署指南

这是一个基于Monorepo的历史网站项目，包含Vue前端、React前端和后端API服务。

## 📁 项目结构

```
talent/
├── apps/
│   ├── vue-app/          # Vue.js 前端应用
│   ├── react-app/        # React 前端应用
│   └── server/           # Node.js 后端API
├── packages/
│   └── shared/           # 共享类型和工具
├── .github/workflows/    # CI/CD 配置
└── docker-compose.yml    # 本地开发环境
```

## 🛠️ 本地开发

### 环境要求
- Node.js 18+
- pnpm 8+
- Docker (可选)

### 安装依赖
```bash
pnpm install
```

### 启动开发环境

#### 方式一：使用Docker（推荐）
```bash
# 启动所有服务
pnpm docker:up

# 查看日志
pnpm docker:logs

# 停止服务
pnpm docker:down
```

#### 方式二：本地启动
```bash
# 启动所有应用
pnpm dev

# 或者单独启动
pnpm dev:vue      # Vue应用 (http://localhost:5173)
pnpm dev:react    # React应用 (http://localhost:3000)
pnpm dev:server   # 后端API (http://localhost:3001)
```

## 🚀 部署流程

### 自动部署

项目使用GitHub Actions进行自动部署，支持选择性部署：

1. **推送到main分支**：自动部署到生产环境
2. **推送到develop分支**：自动部署到预览环境
3. **创建Pull Request**：自动构建和测试

### 部署策略

- **Vue应用** → Vercel
- **React应用** → Vercel  
- **后端API** → Railway

### 环境变量配置

在GitHub仓库的Settings → Secrets中配置以下环境变量：

#### Vercel配置
```
VERCEL_TOKEN=你的Vercel令牌
VERCEL_ORG_ID=你的Vercel组织ID
VERCEL_PROJECT_ID=你的Vercel项目ID
VERCEL_REACT_PROJECT_ID=你的React项目ID
```

#### Railway配置
```
RAILWAY_TOKEN=你的Railway令牌
RAILWAY_SERVICE=你的Railway服务名
```

#### 数据库配置
```
MONGODB_URI=生产环境MongoDB连接串
MONGODB_URI_STAGING=预览环境MongoDB连接串
```

## 📋 部署检查清单

### 部署前检查
- [ ] 代码已通过所有测试
- [ ] 环境变量已正确配置
- [ ] 数据库连接正常
- [ ] API端点测试通过

### 部署后验证
- [ ] 前端应用可正常访问
- [ ] API接口响应正常
- [ ] 数据库连接正常
- [ ] 错误监控正常

## 🔧 常用命令

```bash
# 构建所有应用
pnpm build

# 构建特定应用
pnpm build:vue
pnpm build:react
pnpm build:server

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 清理构建文件
pnpm clean
```

## 🐛 故障排除

### 常见问题

1. **构建失败**
   - 检查依赖是否正确安装
   - 确认Node.js版本兼容
   - 查看构建日志

2. **部署失败**
   - 检查环境变量配置
   - 确认部署平台权限
   - 查看GitHub Actions日志

3. **数据库连接问题**
   - 检查MongoDB连接串
   - 确认网络访问权限
   - 验证数据库用户权限

### 获取帮助

- 查看GitHub Actions日志
- 检查部署平台控制台
- 查看应用日志

## 📈 监控和日志

### 应用监控
- Vercel Analytics (前端)
- Railway Metrics (后端)
- MongoDB Atlas (数据库)

### 日志查看
```bash
# 本地日志
pnpm docker:logs

# 生产日志
# 通过各平台控制台查看
```

## 🔄 回滚策略

如果部署出现问题，可以快速回滚：

1. **Vercel回滚**：在Vercel控制台选择之前的部署版本
2. **Railway回滚**：在Railway控制台回滚到之前的版本
3. **代码回滚**：使用Git回滚到之前的提交

```bash
# 代码回滚
git revert HEAD
git push origin main
``` 