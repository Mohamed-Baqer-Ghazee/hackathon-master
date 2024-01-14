import express from 'express';
import ReviewController from '../../controllers/review.controller';
import { authenticateJWT } from '../../middleWares/jwt.middleware';

const router = express.Router();

router.post('/', authenticateJWT, ReviewController.createReview);
router.get('/:reviewId', authenticateJWT, ReviewController.getReviewById);
router.put('/:reviewId', authenticateJWT, ReviewController.updateReview);
router.delete('/:reviewId', authenticateJWT, ReviewController.deleteReview);

export default router;
