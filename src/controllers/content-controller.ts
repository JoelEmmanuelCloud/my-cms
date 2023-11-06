import { Response } from 'express';
import { ContentModel } from '../models/contents'; 
import { Content } from '../interfaces/content-interface';
import { ExtendedRequest } from '../middleware/authenticateUser';



export async function getAllContent(
    req: ExtendedRequest,
    res: Response,
): Promise<Content[]> {
    const userId = req.userId;

    try {
        const allContent = await ContentModel.find({ userId });
        return allContent;
    } catch (error) {
        throw error;
    }
}

export async function createContent(
    req: ExtendedRequest,
    res: Response,
): Promise<Content> {
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

        await newContent.save();

        const createdContent: Content = {
            _id: newContent._id,
            title: newContent.title,
            body: newContent.body,
            slug: newContent.slug,
            categories: newContent.categories,
            tags: newContent.tags,
            status: newContent.status,
            userId: newContent.userId,
        };
        return createdContent;
    } catch (error) {
        throw error;
    }
}

export async function getContentById(
    req: ExtendedRequest,
    res: Response,
): Promise<Content | null> {
    const contentId = req.params.id;
    const userId = req.userId;

    try {
        const content = await ContentModel.findOne({ _id: contentId, userId });
        return content;
    } catch (error) {
        throw error;
    }
}

export async function updateContent(
    req: ExtendedRequest,
    res: Response,
): Promise<Content | null> {
    const userId = req.userId;
    const contentId = req.params.id;
    const updateData = req.body;

    try {
        const updatedContent = await ContentModel.findOneAndUpdate({contentId, userId, updateData}, { new: true });
        return updatedContent;
    } catch (error) {
        throw error;
    }
}

export async function deleteContent(
    req: ExtendedRequest,
    res: Response,
): Promise<{ message: string }> {
    const userId = req.userId;
    const contentId = req.params.id;

    try {
        const deletedContent = await ContentModel.findOneAndDelete({_id: contentId, userId});

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