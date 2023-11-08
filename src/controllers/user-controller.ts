import {
    BadRequestError,
    NotFoundError,
} from '../errors/api-errors';
import UserModel from '../models/users';
import { IUser, IUserDocument } from '../interfaces/user-interface';

async function updateUserDetails(userId: string, updateData: IUser): Promise<IUserDocument> {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        Object.keys(updateData).forEach((key) => {
            // @ts-ignore
            user[key] = updateData[key];
        });

        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}

export { updateUserDetails };
