export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  coverImageUrl?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author?: string;
}

export interface Comment {
  _id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: string;
}
