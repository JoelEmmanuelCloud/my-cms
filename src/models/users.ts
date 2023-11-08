import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { IUserDocument } from '../interfaces/user-interface';

const isEmailValidator = (value: string) => {
    return validator.isEmail(value);
};

const UserSchema: Schema<IUserDocument> = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide first name'],
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: [true, 'Please provide last name'],
            maxlength: 50,
        },
        birthDate: {
            type: String,
            required: [true, 'Please provide birth date'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please provide email'],
            validate: {
                validator: isEmailValidator,
                message: 'Please provide a valid email',
            },
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 6,
        },

        passwordResetToken: {
            type: String,
        },
        passwordResetTokenExpiry: {
            type: Date,
        },
    },
    { timestamps: true },
);

UserSchema.pre<IUserDocument>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
): Promise<boolean> {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
    'User',
    UserSchema,
);

export default UserModel;
