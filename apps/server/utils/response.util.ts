import { Response } from 'express';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export class ResponseUtil {
  static success<T>(res: Response, data?: T, message: string = 'Success'): void {
    const response: ApiResponse<T> = {
      code: 200,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    res.status(200).json(response);
  }

  static error(res: Response, error: any, code: number = 500): void {
    const response: ApiResponse = {
      code,
      message: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
    res.status(code).json(response);
  }

  static notFound(res: Response, message: string = 'Resource not found'): void {
    const response: ApiResponse = {
      code: 404,
      message,
      timestamp: new Date().toISOString()
    };
    res.status(404).json(response);
  }

  static badRequest(res: Response, message: string = 'Bad request'): void {
    const response: ApiResponse = {
      code: 400,
      message,
      timestamp: new Date().toISOString()
    };
    res.status(400).json(response);
  }
} 