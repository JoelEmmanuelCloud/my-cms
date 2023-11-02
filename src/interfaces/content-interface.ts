import { Document } from 'mongoose';

interface IContent extends Document {
  title: string;
  content: string;
  published: boolean;
  userId: string;
}

export default IContent