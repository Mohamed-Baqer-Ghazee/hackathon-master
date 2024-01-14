import { NextFunction, Request, Response } from 'express';
import VideoModel from '../models/video.model';
import { User } from '@prisma/client';
import { CreateVideoSchema } from '../DTOs/video.dto';
import { fromZodError } from 'zod-validation-error';
import fs from 'fs';
import path from 'path';
import { WebSocket, WebSocketServer } from 'ws';

class VideoController {
    async createVideo(req: Request, res: Response) {
        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const vpath = files.video[0].path
            const video = vpath.slice(15, vpath.length);
            const thumpath = files.thumbnail[0].path;
            const thumbnail = thumpath.slice(19, thumpath.length)



            const user = req.user as User;
            const loggedUserId = user.id
            console.log(loggedUserId);

            const videoData = req.body;
            req.body.video = video;
            req.body.thumbnail = thumbnail;
            req.body.categoriesIds = [1, 2, 3];
            console.log(req.body);
            req.body.private = (req.body.private === 'true')
            const validatedVideo = CreateVideoSchema.safeParse(req.body);
            if (validatedVideo.success) {
                const video = await VideoModel.createVideo(videoData, loggedUserId);
                res.status(201).json(video);
            }
            else
                res.send(fromZodError(validatedVideo.error).message)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getAllVideos(req: Request, res: Response) {
        try {
            const videos = await VideoModel.GetAllVideos();
            if (videos.length != 0)
                res.json(videos);
            else
                res.status(404).json({ message: "No video Found" });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }


    async getImageByName(req: Request, res: Response) {
        const imageName = req.params.imageName;
        console.log(imageName);
        const imagePath = path.join(__dirname, '../../uploads/thumbnails/', imageName);
        // const imagePath = path.join(__dirname, 'uploads/thumbnails', imageName);

        fs.stat(imagePath, (err, stats) => {
            if (err) {
                console.error('An error occurred', err);
                return res.sendStatus(404);
            }

            res.sendFile(imagePath);
        });
    }

    async getVideoById(req: Request, res: Response) {
        try {

            const video = await VideoModel.findVideoById(parseInt(req.params.videoId));
            if (video) {
                res.json(video);
            } else {
                res.status(404).json({ message: 'Video not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getVideoByCategoryId(req: Request, res: Response) {
        try {
            const videos = await VideoModel.findVideosByCategoryId(parseInt(req.params.categoryId));
            if (videos.length != 0) {
                res.json(videos);
            } else {
                res.status(404).json({ message: 'no videos found in this category' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateVideo(req: Request, res: Response) {
        try {
            const user = req.user as User;
            const loggedUserId = user.id
            const video = await VideoModel.updateVideo(parseInt(req.params.videoId), req.body, loggedUserId);
            res.json(video);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteVideo(req: Request, res: Response) {
        try {
            const user = req.user as User;
            const loggedUserId = user.id
            await VideoModel.deleteVideo(parseInt(req.params.videoId), loggedUserId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new VideoController();
