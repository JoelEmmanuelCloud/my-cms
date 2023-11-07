import express from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    createContent,
    getContentById,
    updateContent,
    deleteContent,
    getAllContent,
    uploadImage,
} from '../controllers/content-controller';
import {
    createContentSchema,
    updateContentSchema,
} from '../validators/content-validator';
import {
    authenticateUser,
    ExtendedRequest,
} from '../middleware/authenticateUser';

const router = express.Router();

router.post('/', authenticateUser, async (req: ExtendedRequest, res) => {
    try {
        const validationResult = createContentSchema.validate(req.body);
        if (validationResult.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: validationResult.error.details[0].message });
        }

        const createdContent = await createContent(req, res);
        res.status(StatusCodes.CREATED).json(createdContent);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.get('/', authenticateUser, async (req, res) => {
    try {
        const allContent = await getAllContent(req, res);
        res.status(StatusCodes.OK).json(allContent);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.get('/:id', authenticateUser, async (req: ExtendedRequest, res) => {
    try {
        const content = await getContentById(req, res);
        if (!content) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: 'Content not found' });
        }
        res.status(StatusCodes.OK).json(content);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.put('/:id', authenticateUser, async (req: ExtendedRequest, res) => {
    try {
        const validationResult = updateContentSchema.validate(req.body);
        if (validationResult.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: validationResult.error.details[0].message });
        }

        const updatedContent = await updateContent(req, res);
        if (!updatedContent) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: 'Content not found' });
        }
        res.status(StatusCodes.OK).json(updatedContent);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.delete('/:id', authenticateUser, async (req: ExtendedRequest, res) => {
    try {
        const result = await deleteContent(req, res);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

router.post('/upload', authenticateUser, async (req: ExtendedRequest, res) => {
    try {
        uploadImage(req, res);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage,
        });
    }
});

export default router;
