import IContent from "../interfaces/content-interface";
import mongoose, { Schema } from 'mongoose';

const ContentSchema = new Schema<IContent>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    userId: {
      type: String,
      required: true,
  },
},
{ timestamps: true },
  );
  
  const Content = mongoose.model<IContent>('Content', ContentSchema);
  
  export default Content;