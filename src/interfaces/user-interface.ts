import { Document } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
    passwordResetToken?: string;
    passwordResetTokenExpiry?: Date;
}

interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

interface Payload {
    _id: string;
}

interface SignupData {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
}

interface SignInData {
    email: string;
    password: string;
}

export { Payload, IUser, SignupData, IUserDocument, SignInData };
