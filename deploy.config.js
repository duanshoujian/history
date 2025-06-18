module.exports = {
  // 环境配置
  environments: {
    development: {
      vue: {
        port: 5173,
        url: 'http://localhost:5173'
      },
      react: {
        port: 3000,
        url: 'http://localhost:3000'
      },
      server: {
        port: 3001,
        url: 'http://localhost:3001'
      },
      database: {
        url: 'mongodb://localhost:27017/history'
      }
    },
    staging: {
      vue: {
        url: 'https://talent-vue-staging.vercel.app'
      },
      react: {
        url: 'https://talent-react-staging.vercel.app'
      },
      server: {
        url: 'https://talent-server-staging.railway.app'
      },
      database: {
        url: process.env.MONGODB_URI_STAGING
      }
    },
    production: {
      vue: {
        url: 'https://talent-vue.vercel.app'
      },
      react: {
        url: 'https://talent-react.vercel.app'
      },
      server: {
        url: 'https://talent-server.railway.app'
      },
      database: {
        url: process.env.MONGODB_URI_PROD
      }
    }
  },

  // 应用配置
  apps: {
    'vue-app': {
      name: 'Vue History App',
      buildCommand: 'pnpm build',
      outputDirectory: 'dist',
      deployPlatform: 'vercel',
      environmentVariables: {
        VITE_API_URL: 'process.env.API_URL'
      }
    },
    'react-app': {
      name: 'React History App',
      buildCommand: 'pnpm build',
      outputDirectory: 'dist',
      deployPlatform: 'vercel',
      environmentVariables: {
        REACT_APP_API_URL: 'process.env.API_URL'
      }
    },
    'server': {
      name: 'History API Server',
      buildCommand: 'pnpm build',
      outputDirectory: 'dist',
      deployPlatform: 'railway',
      environmentVariables: {
        NODE_ENV: 'production',
        MONGODB_URI: 'process.env.MONGODB_URI',
        PORT: 'process.env.PORT'
      }
    }
  },

  // 部署策略
  deployment: {
    // 自动部署分支
    autoDeployBranches: ['main'],
    // 预览部署分支
    previewBranches: ['develop', 'feature/*'],
    // 需要手动审批的变更
    requireApproval: ['server/**/*'],
    // 部署超时时间（分钟）
    timeout: 10
  }
}; 