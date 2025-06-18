import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { LoginRequest, RegisterRequest } from '../types/user';
import { ResponseUtil } from '../utils/response.util';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request<{}, {}, RegisterRequest>, res: Response) {
    try {
      const user = await this.userService.register(req.body);
      ResponseUtil.success(res, { user }, 'User registered successfully');
    } catch (error) {
      if (error instanceof Error) {
        ResponseUtil.badRequest(res, error.message);
      } else {
        ResponseUtil.error(res, error);
      }
    }
  }

  async login(req: Request<{}, {}, LoginRequest>, res: Response) {
    try {
      const result = await this.userService.login(req.body);
      ResponseUtil.success(res, result, 'Login successful');
    } catch (error) {
      if (error instanceof Error) {
        ResponseUtil.error(res, error, 401);
      } else {
        ResponseUtil.error(res, error);
      }
    }
  }
} 