import mongoose, { Schema, Document, Model } from 'mongoose';
import { IContentDocument  } from '../interfaces/content-interface';

const ContentSchema: Schema<IContentDocument> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    body: {
      type: String,
      required: [true, 'Please provide the body content'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a unique slug'],
      unique: true,
    },
    categories: [{
      type: String,
    }],
    tags: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    
    },
  { timestamps: true },
);

export interface IContentModel extends Model<IContentDocument> {}

export const ContentModel: IContentModel = mongoose.model<IContentDocument, IContentModel>('Content', ContentSchema);
