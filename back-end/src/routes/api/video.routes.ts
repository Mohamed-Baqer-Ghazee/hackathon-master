import express from 'express';
import VideoController from '../../controllers/video.controller';
import { authenticateJWT } from '../../middleWares/jwt.middleware';
import { roleAuth } from '../../middleWares/roleAuth.middleware';
import { UserRole } from '@prisma/client';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        cb(null, './uploads/thumbnails');
      } else {
        cb(null, './uploads/videos');
      }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    if (file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      cb(null, 'thumbnail-' + uniqueSuffix + '.jpg');
    } else {
      cb(null, 'video-' + uniqueSuffix + '.mp4');
    }},
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([{name:"video",maxCount:1},{name:"thumbnail",maxCount:1,}])

const router = express.Router();

router.get('/', VideoController.getAllVideos);
router.get('/images/:imageName', VideoController.getImageByName);
router.get('/categories/:categoryId', VideoController.getVideoByCategoryId);
router.get('/:videoId', VideoController.getVideoById);
router.post('/',authenticateJWT,  multipleUpload, VideoController.createVideo);
router.put('/:videoId', authenticateJWT, VideoController.updateVideo);
router.delete('/:videoId', authenticateJWT, VideoController.deleteVideo);


export default router;
