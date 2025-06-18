import { Request, Response } from 'express';
import { ArticleService } from '../service/article.service';
import { Article, ArticleQuery } from '@monorepo/shared';
import { ResponseUtil } from '../utils/response.util';

export class ArticleController {
    private articleService: ArticleService;

    constructor() {
        this.articleService = new ArticleService();
    }

    async getArticleById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const article = await this.articleService.getArticleById(id);
            
            if (!article) {
                ResponseUtil.notFound(res, 'Article not found');
                return;
            }
            
            ResponseUtil.success(res, article);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async getArticlesByPersonId(req: Request, res: Response): Promise<void> {
        try {
            const { personId } = req.params;
            const articles = await this.articleService.getArticlesByPersonId(personId);
            ResponseUtil.success(res, articles);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async getArticlesByDynastyId(req: Request, res: Response): Promise<void> {
        try {
            const { dynastyId } = req.params;
            const articles = await this.articleService.getArticlesByDynastyId(dynastyId);
            ResponseUtil.success(res, articles);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async getArticles(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query as ArticleQuery;
            const articles = await this.articleService.getArticles(query);
            ResponseUtil.success(res, articles);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async createArticle(req: Request, res: Response): Promise<void> {
        try {
            const articleData = req.body as Omit<Article, '_id'>;
            const article = await this.articleService.createArticle(articleData);
            ResponseUtil.success(res, article);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async updateArticle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const articleData = req.body as Partial<Article>;
            const success = await this.articleService.updateArticle(id, articleData);
            
            if (!success) {
                ResponseUtil.notFound(res, 'Article not found');
                return;
            }
            
            ResponseUtil.success(res, { message: 'Article updated successfully' });
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async deleteArticle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const success = await this.articleService.deleteArticle(id);
            
            if (!success) {
                ResponseUtil.notFound(res, 'Article not found');
                return;
            }
            
            ResponseUtil.success(res, { message: 'Article deleted successfully' });
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }
} 