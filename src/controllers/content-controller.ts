import { Response } from 'express';
import { ContentModel } from '../models/contents'; 
import { IContentDocument } from '../interfaces/content-interface';
import { ExtendedRequest } from '../middleware/authenticateUser';

export async function createContent(
    req: ExtendedRequest,
    res: Response,
): Promise<IContentDocument> {
    const { title, body, slug, categories, tags, status } = req.body;
    const userId = req.userId;

    try {
        const newContent = new ContentModel({
            title,
            body,
            slug,
            categories,
            tags,
            status,
            userId,
            
        });

        const createdContent = await newContent.save();
        return createdContent;
    } catch (error) {
        throw error;
    }
}

export async function getContentById(
    req: ExtendedRequest,
    res: Response,
): Promise<IContentDocument | null> {
    const contentId = req.params.id;

    try {
        const content = await ContentModel.findById(contentId);
        return content;
    } catch (error) {
        throw error;
    }
}

export async function updateContent(
    req: ExtendedRequest,
    res: Response,
): Promise<IContentDocument | null> {
    const contentId = req.params.id;
    const updateData = req.body;

    try {
        const updatedContent = await ContentModel.findByIdAndUpdate(contentId, updateData, { new: true });
        return updatedContent;
    } catch (error) {
        throw error;
    }
}

export async function deleteContent(
    req: ExtendedRequest,
    res: Response,
): Promise<{ message: string }> {
    const contentId = req.params.id;

    try {
        const deletedContent = await ContentModel.findByIdAndDelete(contentId);

        if (!deletedContent) {
            return {
                message: `No content with ID ${contentId} found.`,
            };
        }

        return {
            message: `Content with ID ${contentId} has been deleted successfully.`,
        };
    } catch (error) {
        throw error;
    }
}
