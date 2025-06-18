import { Router } from 'express';
import { ArticleController } from '../controller/article.controller';

const router = Router();

// 使用工厂函数实现懒加载单例
let articleControllerInstance: ArticleController | null = null;
const getArticleController = () => {
  if (!articleControllerInstance) {
    articleControllerInstance = new ArticleController();
  }
  return articleControllerInstance;
};

// 获取文章列表
router.get('/', async (req, res) => {
  const controller = getArticleController();
  await controller.getArticles(req, res);
});

// 获取单个文章
router.get('/:id', async (req, res) => {
  const controller = getArticleController();
  await controller.getArticleById(req, res);
});

// 获取特定人物的文章
router.get('/person/:personId', async (req, res) => {
  const controller = getArticleController();
  await controller.getArticlesByPersonId(req, res);
});

// 获取特定朝代的文章
router.get('/dynasty/:dynastyId', async (req, res) => {
  const controller = getArticleController();
  await controller.getArticlesByDynastyId(req, res);
});

// 创建文章
router.post('/', async (req, res) => {
  const controller = getArticleController();
  await controller.createArticle(req, res);
});

// 更新文章
router.put('/:id', async (req, res) => {
  const controller = getArticleController();
  await controller.updateArticle(req, res);
});

// 删除文章
router.delete('/:id', async (req, res) => {
  const controller = getArticleController();
  await controller.deleteArticle(req, res);
});

export default router; 