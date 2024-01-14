/*
  Warnings:

  - You are about to drop the `Stream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- DropForeignKey
ALTER TABLE "StreamCategory" DROP CONSTRAINT "StreamCategory_streamId_fkey";

-- DropTable
DROP TABLE "Stream";

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "thumbnail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamCategory" ADD CONSTRAINT "StreamCategory_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
