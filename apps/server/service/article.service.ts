import { Article, ArticleQuery, ArticleResponse } from '@monorepo/shared';
import { ArticleMapper } from '../mapper/article.mapper';

export class ArticleService {
  private articleMapper: ArticleMapper;

  constructor() {
    this.articleMapper = new ArticleMapper();
  }

  async getArticleById(id: string): Promise<ArticleResponse | null> {
    const article = await this.articleMapper.findById(id);
    if (!article) return null;
    
    // 增加浏览次数
    await this.articleMapper.incrementViewCount(id);
    
    return this.formatArticleResponse(article);
  }

  async getArticlesByPersonId(personId: string): Promise<ArticleResponse> {
    const articles = await this.articleMapper.findByPersonId(personId);
    return this.formatArticleResponse(articles)
  }

  async getArticlesByDynastyId(dynastyId: string): Promise<ArticleResponse[]> {
    const articles = await this.articleMapper.findByDynastyId(dynastyId);
    return articles.map(this.formatArticleResponse);
  }

  async getArticles(query: ArticleQuery): Promise<ArticleResponse[]> {
    const articles = await this.articleMapper.find(query);
    return articles.map(this.formatArticleResponse);
  }

  async createArticle(article: Omit<Article, '_id'>): Promise<ArticleResponse> {
    const newArticle = await this.articleMapper.create(article);
    return this.formatArticleResponse(newArticle);
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<boolean> {
    return this.articleMapper.update(id, article);
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articleMapper.delete(id);
  }

  private formatArticleResponse(article: Article): ArticleResponse {
    return {
      _id: article._id?.toString() || '',
      title: article.title,
      content: article.content,
      personId: article.personId.toString(),
      dynastyId: article.dynastyId.toString(),
      author: article.author,
      status: article.status,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      tags: article.tags,
      viewCount: article.viewCount,
      isPublic: article.isPublic
    };
  }
} 