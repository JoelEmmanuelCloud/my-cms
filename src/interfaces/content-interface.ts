import { Document } from 'mongoose';

export interface Content {
    _id: string;
    title: string;
    body: string;
    userId: string;
    slug: string;
    categories: string[];
    tags: string[];
    status: 'draft' | 'published';
}

export interface IContentDocument extends Document {
    title: string;
    body: string;
    userId: string;
    slug: string;
    categories: string[];
    tags: string[];
    status: 'draft' | 'published';
}