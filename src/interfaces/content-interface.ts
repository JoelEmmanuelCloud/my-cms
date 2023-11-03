import { Document } from 'mongoose';

export interface Content {
    _id: string;
    title: string;
    content: string;
    published: boolean;
    userId: string;
}

export interface IContentDocument extends Document {
  title: string;
  content: string;
  published: boolean;
  userId: string;
}