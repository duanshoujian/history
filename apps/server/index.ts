// 导入依赖
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { connectToDatabase, closeDatabaseConnection } from './mongodb/connection';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error';

// 服务器配置
const SERVER_CONFIG = {
  port: Number(process.env.PORT) || 3000,
  publicPath: './public',
  nodeEnv: process.env.NODE_ENV || 'development'
} as const;

// 验证必要的环境变量
const requiredEnvVars = ['MONGODB_URI', 'DB_NAME', 'JWT_SECRET'] as const;
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please create a .env file based on .env.example');
  process.exit(1);
}

// 创建 Express 应用实例
const app = express();

// 基础中间件配置
app.use(express.json());
app.use(express.static(SERVER_CONFIG.publicPath)); // 前缀是第一个参数

// CORS 中间件配置
const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("X-Powered-By", 'Express');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    res.status(200).end();
    return;
  }
  
  next();
};

app.use(corsMiddleware);
app.use(routes);

// 注册错误处理中间件
app.use(notFoundHandler); // 404 处理要放在路由之后
app.use(errorHandler);    // 错误处理要放在最后

/**
 * 启动服务器
 * 按顺序执行：
 * 1. 连接数据库
 * 2. 注册路由
 * 3. 启动 HTTP 服务器
 */
async function startServer() {
  try {
    // 连接数据库
    await connectToDatabase();
    console.log('Database connected successfully');
    
    // 注册路由
    app.use(routes);
    console.log('Routes registered successfully');
    
    // 启动服务器
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server is running on port ${SERVER_CONFIG.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    // 确保在启动失败时关闭数据库连接
    await closeDatabaseConnection();
    process.exit(1);
  }
}

// 优雅关闭处理
const gracefulShutdown = async () => {
  console.log('Received shutdown signal: closing HTTP server and database connection');
  try {
    await closeDatabaseConnection();
    console.log('Database connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// 注册进程信号处理
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// 启动服务器
startServer(); 
