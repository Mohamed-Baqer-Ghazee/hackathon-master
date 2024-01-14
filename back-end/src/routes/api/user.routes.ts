import express from 'express';
import UserController from '../../controllers/user.controller';
import { authenticateJWT } from '../../middleWares/jwt.middleware';

const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', authenticateJWT, UserController.updateUser);
router.delete('/:userId', authenticateJWT, UserController.deleteUser);

export default router;
