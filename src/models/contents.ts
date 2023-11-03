  import mongoose, { Schema, Model } from 'mongoose';
  import { IContentDocument } from '../interfaces/content-interface';
  
  const ContentSchema: Schema<IContentDocument> = new Schema(
      {
          title: {
              type: String,
              required: [true, 'Please provide a description'],
          },
          content: {
              type: String,
              required: [true, 'Please provide the day of the week'],
          },
          published: {
              type: Boolean,
              default: false,
          },
          userId: {
            type: String,
            required: true,
        },
      },
      { timestamps: true },
  );
  
  export interface IContentModel extends Model<IContentDocument> {}
  
  export const EventModel: IContentModel = mongoose.model<
      IContentDocument,
      IContentModel
  >('Content', ContentSchema);