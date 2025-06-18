import { Request, Response, NextFunction } from 'express';

// 自定义错误类
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// 错误处理中间件
export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // 处理自定义应用错误
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // 处理 Mongoose 验证错误
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: '数据验证失败',
      errors: (err as any).errors
    });
  }

  // 处理 JWT 错误
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: '无效的 token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'token 已过期'
    });
  }

  // 处理其他未知错误
  const statusCode = (err as any).statusCode || 500;
  const message = (err as any).statusCode ? err.message : '服务器内部错误';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 处理中间件
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `找不到路径: ${req.originalUrl}`));
}; 