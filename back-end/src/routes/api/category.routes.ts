import express from 'express';
import CategoryController from '../../controllers/category.controller';
import { authenticateJWT } from '../../middleWares/jwt.middleware';
import { roleAuth } from '../../middleWares/roleAuth.middleware';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get("/",CategoryController.getAllCategories)
router.post('/', authenticateJWT,roleAuth(UserRole.MODERATOR) ,roleAuth(UserRole.ADMIN), CategoryController.createCategory);
router.get('/:categoryId', authenticateJWT,roleAuth(UserRole.MODERATOR) ,roleAuth(UserRole.ADMIN), CategoryController.getCategoryById);
router.put('/:categoryId', authenticateJWT,roleAuth(UserRole.MODERATOR) ,roleAuth(UserRole.ADMIN), CategoryController.updateCategory);
router.delete('/:categoryId', authenticateJWT,roleAuth(UserRole.MODERATOR) ,roleAuth(UserRole.ADMIN), CategoryController.deleteCategory);

export default router;
