import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();

// 使用工厂函数实现懒加载单例
let userControllerInstance: UserController | null = null;
const getUserController = () => {
  if (!userControllerInstance) {
    userControllerInstance = new UserController();
  }
  return userControllerInstance;
};

// Register route
router.post('/register', async (req, res) => {
  const controller = getUserController();
  await controller.register(req, res);
});

// Login route
router.post('/login', async (req, res) => {
  const controller = getUserController();
  await controller.login(req, res);
});

export default router; 