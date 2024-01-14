import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class VideoModel {
    async createVideo(videoData: { title: string; description: string; categoriesIds: number[];video:string; thumbnail:string,private:boolean;}, loggedUserId: number) {
        try {
            const { categoriesIds, ...otherData } = videoData;
            const video = await prisma.video.create({
                data: {
                    ...otherData,
                    userId: loggedUserId
                },
            });
        
            return video;
        } catch (error) {
            console.log(error);
            
            throw new Error("Error creating video");
        }
    }

    async GetAllVideos() {
        try {
            return await prisma.video.findMany();
            // return await prisma.video.findMany({where:{private:false}});
        } catch (error) {
            throw new Error("Error getting all videos");
        }
    }

    async findVideoById(videoId: number) {
        try {
            return await prisma.video.findFirst({
                where: { id: videoId }
            });
        } catch (error) {
            console.log(error);
            
            throw new Error("Error finding video by ID");
        }
    }

    async findVideosByCategoryId(categoryId: number) {
        try {
            return await prisma.video.findMany({
                where: { 
                    categories: {
                        some: {
                            categoryId
                        }
                    }}
            });
        } catch (error) {
            throw new Error("Error finding videos by category ID");
        }
    }

    async updateVideo(videoId: number, updateData: { title?: string; description?: string;},loggedUserId:number) {
        try {
            const video = await prisma.video.findUnique({
                where: { id: videoId }
            });

            // Check if the video exists and if the user is the owner
            if (!video) {
                throw new Error("Video not found.");
            }

            if (video.userId !== loggedUserId) {
                throw new Error("You are not authorized to update this video.");
            }

            return await prisma.video.update({
                where: { id: videoId},
                data: updateData
            });
        } catch (error) {
            throw new Error("Error updating video");
        }
    }

    async deleteVideo(videoId: number,loggedUserId:number) {
        try {
            const video = await prisma.video.findUnique({
                where: { id: videoId }
            });

            // Check if the video exists and if the user is the owner
            if (!video) {
                throw new Error("Video not found.");
            }

            if (video.userId !== loggedUserId) {
                throw new Error("You are not authorized to delete this video.");
            }

            // Proceed with the deletion
            return await prisma.video.delete({
                where: { id: videoId }
            });
        } catch (error) {
            throw new Error("Error deleting video");
        }
    }
}

export default new VideoModel();
