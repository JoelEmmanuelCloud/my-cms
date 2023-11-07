import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBlacklistedToken extends Document {
    userId: string;
    token: string;
    createdAt: Date;
}

const BlacklistedTokenSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d',
    },
});

const BlacklistedTokenModel: Model<IBlacklistedToken> =
    mongoose.model<IBlacklistedToken>(
        'BlacklistedToken',
        BlacklistedTokenSchema,
    );

export default BlacklistedTokenModel;
