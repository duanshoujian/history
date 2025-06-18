import { User } from '../types/user.ts';
import { Collection, ObjectId } from 'mongodb';
import { getCollection } from '../mongodb/connection.ts';

export class UserMapper {
  private collection: Collection<User>;

  constructor() {
    this.collection = getCollection<User>('users');
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.collection.findOne({ username });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.collection.findOne({ email });
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const result = await this.collection.insertOne({
      ...user,
      id: new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return this.collection.findOne({ _id: result.insertedId }) as Promise<User>;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    await this.collection.updateOne(
      { id },
      { 
        $set: {
          ...user,
          updatedAt: new Date()
        }
      }
    );
    return this.collection.findOne({ id });
  }
} 