import { Collection, ObjectId } from 'mongodb';
import { getCollection } from '../mongodb/connection';
// import { Article, ArticleQuery } from '@monorepo/shared';

export class ArticleMapper {
  private collection: Collection<any>;

  constructor() {
    this.collection = getCollection<any>('articles');
  }

  async findById(id: string): Promise<any | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByPersonId(personId: string): Promise<any> {
    return this.collection.findOne({ personId: new ObjectId(personId) });
  }

  async findByDynastyId(dynastyId: string): Promise<any[]> {
    return this.collection.find({ dynastyId: new ObjectId(dynastyId) }).toArray();
  }

  async find(query: any): Promise<any[]> {
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

  async create(article: Omit<any, '_id'>): Promise<any> {
    const result = await this.collection.insertOne(article as any);
    return { ...article, _id: result.insertedId } as any;
  }

  async update(id: string, article: Partial<any>): Promise<boolean> {
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