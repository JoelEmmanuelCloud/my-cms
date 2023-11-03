import { Document, Types } from 'mongoose';

export interface Content {
    _id: string;
    title: string;
    body: string;
    published: boolean;
    userId: string;
    slug: string;
    categories: string[];
    tags: string[];
    status: 'draft' | 'published';
    author: Types.ObjectId;
}

export interface IContentDocument extends Document {
    title: string;
    body: string;
    published: boolean;
    userId: string;
    slug: string;
    categories: string[];
    tags: string[];
    status: 'draft' | 'published';
    author: Types.ObjectId; 
}
