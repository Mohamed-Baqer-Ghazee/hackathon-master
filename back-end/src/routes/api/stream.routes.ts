import express from 'express';
import StreamController from '../../controllers/stream.controller';
import { authenticateJWT } from '../../middleWares/jwt.middleware';
import { roleAuth } from '../../middleWares/roleAuth.middleware';
import { UserRole } from '@prisma/client';

const router = express.Router();

// router.get('/', StreamController.getAllStreams);
router.get('/:streamId', StreamController.streamVideo);
// router.get('/:categoryId', StreamController.getStreamByCategoryId);
// router.post('/', authenticateJWT, StreamController.createStream);
// router.put('/:streamId', authenticateJWT, StreamController.updateStream);
// router.delete('/:streamId', authenticateJWT, StreamController.deleteStream);


export default router;
