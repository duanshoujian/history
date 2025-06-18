
export interface Article {
  _id?: string;
  title: string;
  content: string;
  personId: string;
  dynastyId: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  viewCount: number;
  isPublic: boolean;
}

export interface ArticleQuery {
  personId?: string;
  dynastyId?: string;
  title?: string;
  status?: string;
  isPublic?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ArticleResponse {
  _id: string;
  title: string;
  content: string;
  personId: string;
  dynastyId: string;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  viewCount: number;
  isPublic: boolean;
} 