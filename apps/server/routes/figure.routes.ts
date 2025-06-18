import { Router } from 'express';
import { FigureController } from '../controller/figure.controller';

const router = Router();

// 使用工厂函数实现懒加载单例
let figureControllerInstance: FigureController | null = null;
const getFigureController = () => {
  if (!figureControllerInstance) {
    figureControllerInstance = new FigureController();
  }
  return figureControllerInstance;
};

// 获取所有历史人物
router.get('/', async (req, res) => {
  const controller = getFigureController();
  await controller.getAllFigures(req, res);
});

// 获取指定字段的历史人物
router.get('/fields', async (req, res) => {
  const controller = getFigureController();
  await controller.getFiguresByFields(req, res);
});

// 获取指定朝代的历史人物
router.get('/dynasty/:dynasty', async (req, res) => {
  console.log('getFiguresByDynasty', req.params);
  const controller = getFigureController();
  await controller.getFiguresByDynasty(req, res);
});

export default router; 