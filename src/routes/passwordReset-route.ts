import express, { Request, Response } from 'express';
import { requestPasswordReset } from '../controllers/passwordResetController';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        if (!email) {
            res.status(400).json({ message: 'Email is required for password reset' });
            return;
        }

        const result = await requestPasswordReset(email);
        res.status(200).json({ message: result });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

export default router;
