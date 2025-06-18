import { Collection, ObjectId } from 'mongodb';
import { getCollection } from '../mongodb/connection';
import { Article, ArticleQuery } from '@monorepo/shared';

export class ArticleMapper {
  private collection: Collection<Article>;

  constructor() {
    this.collection = getCollection<Article>('articles');
  }

  async findById(id: string): Promise<Article | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByPersonId(personId: string): Promise<Article> {
    return this.collection.findOne({ personId: new ObjectId(personId) });
  }

  async findByDynastyId(dynastyId: string): Promise<Article[]> {
    return this.collection.find({ dynastyId: new ObjectId(dynastyId) }).toArray();
  }

  async find(query: ArticleQuery): Promise<Article[]> {
    const filter: any = {};
    
    if (query.personId) {
      filter.personId = new ObjectId(query.personId);
    }
    if (query.dynastyId) {
      filter.dynastyId = new ObjectId(query.dynastyId);
    }
    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.status) {
      filter.status = query.status;
    }
    if (query.isPublic !== undefined) {
      filter.isPublic = query.isPublic;
    }

    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const skip = (page - 1) * pageSize;

    return this.collection
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .toArray();
  }

  async create(article: Omit<Article, '_id'>): Promise<Article> {
    const result = await this.collection.insertOne(article as Article);
    return { ...article, _id: result.insertedId } as Article;
  }

  async update(id: string, article: Partial<Article>): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...article, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async incrementViewCount(id: string): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { viewCount: 1 } }
    );
    return result.modifiedCount > 0;
  }
} 