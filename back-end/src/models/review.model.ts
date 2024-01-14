import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ReviewModel {
    async createReview(reviewData: { content: string; rating: number; streamId: number; userId: number }) {
        try {
            return await prisma.review.create({
                data: reviewData
            });
        } catch (error) {
            throw new Error('Failed to create a review');
        }
    }

    async findReviewById(reviewId: number) {
        try {
            return await prisma.review.findUnique({
                where: { id: reviewId }
            });
        } catch (error) {
            throw new Error('Failed to find a review by ID');
        }
    }

    async updateReview(reviewId: number, updateData: { content?: string; rating?: number }) {
        try {
            return await prisma.review.update({
                where: { id: reviewId },
                data: updateData
            });
        } catch (error) {
            throw new Error('Failed to update a review');
        }
    }

    async deleteReview(reviewId: number) {
        try {
            return await prisma.review.delete({
                where: { id: reviewId }
            });
        } catch (error) {
            throw new Error('Failed to delete a review');
        }
    }
}

export default new ReviewModel();
