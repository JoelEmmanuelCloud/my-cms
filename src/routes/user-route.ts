import express from 'express';
const router = express.Router();
import { updateUserDetails } from '../controllers/user-controller';
import { updateUserSchema } from '../validators/user-validator';
import { StatusCodes } from 'http-status-codes';
import { authenticateUser } from '../middleware/authenticateUser';

router.put('/:id',authenticateUser, async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const { error, value } = updateUserSchema.validate(updateData);

        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ errors: error.details });
            return;
        }

        const updatedUser = await updateUserDetails(userId, value);

        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

export default router;
