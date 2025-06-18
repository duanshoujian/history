module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档更新
        'style',    // 代码格式调整
        'refactor', // 代码重构
        'test',     // 测试相关
        'chore',    // 构建过程或辅助工具的变动
        'perf',     // 性能优化
        'ci',       // CI/CD相关
        'build',    // 构建相关
        'revert'    // 回滚
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'vue-app',    // Vue应用
        'react-app',  // React应用
        'server',     // 后端服务
        'shared',     // 共享包
        'ci',         // CI/CD配置
        'deps',       // 依赖更新
        'docs',       // 文档
        'config'      // 配置文件
      ]
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72]
  }
}; 