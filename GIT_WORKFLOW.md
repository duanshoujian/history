# 📚 Git工作流程指南

## 🏗️ 仓库结构

我们使用**单一Git仓库**管理整个Monorepo项目：

```
talent/
├── apps/
│   ├── vue-app/          # Vue.js 前端应用
│   ├── react-app/        # React 前端应用
│   └── server/           # Node.js 后端API
├── packages/
│   └── shared/           # 共享类型和工具
└── .github/workflows/    # CI/CD 配置
```

## 🌿 分支策略

### 主要分支

- **`main`** - 生产环境分支
  - 只接受来自 `develop` 的合并
  - 自动部署到生产环境
  - 必须通过所有测试和代码审查

- **`develop`** - 开发环境分支
  - 集成所有功能分支
  - 自动部署到预览环境
  - 用于集成测试

### 功能分支

- **`feature/功能名称`** - 新功能开发
  - 从 `develop` 分支创建
  - 完成后合并回 `develop`
  - 例如：`feature/vue-app-user-profile`

- **`fix/问题描述`** - Bug修复
  - 从 `develop` 分支创建
  - 修复完成后合并回 `develop`
  - 例如：`fix/server-api-timeout`

- **`hotfix/紧急修复`** - 紧急修复
  - 从 `main` 分支创建
  - 修复后同时合并到 `main` 和 `develop`
  - 例如：`hotfix/security-vulnerability`

## 📝 提交规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 提交类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(vue-app): add user profile page` |
| `fix` | 修复bug | `fix(server): resolve API timeout issue` |
| `docs` | 文档更新 | `docs: update deployment guide` |
| `style` | 代码格式调整 | `style: format code with prettier` |
| `refactor` | 代码重构 | `refactor(shared): optimize utility functions` |
| `test` | 测试相关 | `test(vue-app): add unit tests for user component` |
| `chore` | 构建过程或辅助工具 | `chore(deps): update dependencies` |
| `perf` | 性能优化 | `perf(react-app): optimize bundle size` |
| `ci` | CI/CD相关 | `ci: add GitHub Actions workflow` |
| `build` | 构建相关 | `build: update webpack configuration` |
| `revert` | 回滚 | `revert: revert previous commit` |

### 影响范围

| 范围 | 说明 |
|------|------|
| `vue-app` | Vue应用相关变更 |
| `react-app` | React应用相关变更 |
| `server` | 后端服务相关变更 |
| `shared` | 共享包相关变更 |
| `ci` | CI/CD配置变更 |
| `deps` | 依赖更新 |
| `docs` | 文档变更 |
| `config` | 配置文件变更 |

### 提交示例

```bash
# 新功能
feat(vue-app): add historical figure comparison feature

# 修复bug
fix(server): resolve database connection timeout

# 文档更新
docs: update API documentation

# 依赖更新
chore(deps): update axios to v1.9.0

# 代码重构
refactor(shared): extract common validation logic
```

## 🔧 开发工作流程

### 1. 开始新功能开发

```bash
# 确保在develop分支
git checkout develop
git pull origin develop

# 创建功能分支
git checkout -b feature/vue-app-user-profile

# 开发完成后
git add .
git commit -m "feat(vue-app): add user profile page"

# 推送到远程
git push origin feature/vue-app-user-profile
```

### 2. 使用交互式提交

```bash
# 安装依赖后，使用交互式提交
pnpm commit

# 或者使用传统方式
git commit -m "feat(vue-app): add user profile page"
```

### 3. 代码审查流程

1. **创建Pull Request**
   - 从功能分支到 `develop` 分支
   - 填写PR模板
   - 添加相关标签

2. **代码审查**
   - 至少需要1个审查者批准
   - 所有CI检查必须通过
   - 解决所有审查意见

3. **合并PR**
   - 使用 "Squash and merge"
   - 保持提交历史整洁

### 4. 发布流程

```bash
# 合并到main分支
git checkout main
git merge develop

# 创建发布标签
pnpm release

# 推送到远程
git push origin main --tags
```

## 🧪 测试策略

### 提交前检查

每次提交前会自动运行：

```bash
# 代码格式检查
pnpm lint

# 类型检查
pnpm type-check

# 单元测试
pnpm test
```

### 测试覆盖范围

- **Vue应用**: 组件测试、路由测试
- **React应用**: 组件测试、状态管理测试
- **后端服务**: API测试、数据库测试
- **共享包**: 工具函数测试

## 📋 常用Git命令

### 分支管理

```bash
# 查看所有分支
git branch -a

# 创建并切换到新分支
git checkout -b feature/new-feature

# 删除本地分支
git branch -d feature/old-feature

# 删除远程分支
git push origin --delete feature/old-feature
```

### 提交管理

```bash
# 查看提交历史
git log --oneline --graph

# 查看特定文件的变更
git log -p filename

# 撤销最后一次提交
git reset --soft HEAD~1

# 修改最后一次提交信息
git commit --amend
```

### 合并和变基

```bash
# 合并分支
git merge feature/branch

# 变基操作
git rebase develop

# 解决冲突后继续变基
git rebase --continue

# 取消变基
git rebase --abort
```

## 🚨 注意事项

### 不要做的事情

- ❌ 直接提交到 `main` 分支
- ❌ 强制推送 `main` 或 `develop` 分支
- ❌ 提交不完整的代码
- ❌ 提交敏感信息（密码、密钥等）
- ❌ 提交过大的变更（超过1000行）

### 最佳实践

- ✅ 经常提交小变更
- ✅ 写清晰的提交信息
- ✅ 在提交前运行测试
- ✅ 及时处理代码审查意见
- ✅ 保持分支整洁

## 🔍 故障排除

### 常见问题

1. **提交被拒绝**
   ```bash
   # 检查提交信息格式
   git log --oneline -5
   
   # 修改最后一次提交
   git commit --amend
   ```

2. **合并冲突**
   ```bash
   # 查看冲突文件
   git status
   
   # 解决冲突后
   git add .
   git commit
   ```

3. **撤销错误提交**
   ```bash
   # 撤销最后一次提交
   git reset --soft HEAD~1
   
   # 撤销到特定提交
   git reset --hard commit-hash
   ```

## 📚 相关资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/) 