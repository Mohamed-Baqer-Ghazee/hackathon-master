import { Router } from "express";
import userRoutes from './api/user.routes';
import videoRoutes from './api/video.routes';
import reviewRoutes from './api/review.routes';
import categoryRoutes from './api/category.routes';
import streamRoutes from "./api/stream.routes"

const router =  Router();

router.use('/users', userRoutes);
router.use('/videos', videoRoutes);
router.use('/reviews', reviewRoutes);
router.use('/categories', categoryRoutes);
router.use('/streams',streamRoutes)

export default router;