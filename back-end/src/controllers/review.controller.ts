import { Request, Response } from 'express';
import ReviewModel from '../models/review.model';

class ReviewController {
    async createReview(req: Request, res: Response) {
        try {
            const review = await ReviewModel.createReview(req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getReviewById(req: Request, res: Response) {
        try {
            const review = await ReviewModel.findReviewById(parseInt(req.params.reviewId));
            if (review) {
                res.json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateReview(req: Request, res: Response) {
        try {
            const review = await ReviewModel.updateReview(parseInt(req.params.reviewId), req.body);
            res.json(review);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteReview(req: Request, res: Response) {
        try {
            await ReviewModel.deleteReview(parseInt(req.params.reviewId));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Additional methods as needed.
}

export default new ReviewController();
