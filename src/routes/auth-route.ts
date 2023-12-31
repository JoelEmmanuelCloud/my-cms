import express from 'express';
const router = express.Router();
import { createJWT } from '../utils/jwt';
import {
    signUpUser,
    signInUser,
    signOutUser,
} from '../controllers/auth-controller';
import { signupSchema, signInSchema } from '../validators/user-validator';
import { StatusCodes } from 'http-status-codes';

router.post('/sign-up', async (req, res) => {
    const newUserSignupData = req.body;

    try {
        const { error, value } = signupSchema.validate(newUserSignupData);

        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ errors: error.details });
            return;
        }
        const user = await signUpUser(value);

        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        res.status(StatusCodes.CREATED).json(userWithoutPassword);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.post('/sign-in', async (req, res) => {
    const signInData = req.body;

    try {
        const { error, value } = signInSchema.validate(signInData);

        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ errors: error.details });
            return;
        }

        const user = await signInUser(value);

        const token = createJWT({ payload: { _id: user._id } });

        res.status(StatusCodes.OK).json({
            token,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.post('/sign-out', async (req, res) => {
    const { userId, token } = req.body;

    try {
        const success = await signOutUser(userId, token);

        if (success) {
            res.status(StatusCodes.OK).json({
                message: 'signed out successful',
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'sign out failed',
            });
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

export default router;
