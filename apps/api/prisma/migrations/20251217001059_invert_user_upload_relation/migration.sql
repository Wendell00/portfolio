/*
  Warnings:

  - You are about to drop the column `avatar_upload_id` on the `Users` table. All the data in the column will be lost.
  - Added the required column `type` to the `Upload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UploadType" AS ENUM ('AVATAR', 'POST', 'DOCUMENT', 'OTHER');

-- DropForeignKey
ALTER TABLE "public"."Users" DROP CONSTRAINT "Users_avatar_upload_id_fkey";

-- AlterTable
ALTER TABLE "public"."Upload" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "public"."UploadType" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "avatar_upload_id";

-- AddForeignKey
ALTER TABLE "public"."Upload" ADD CONSTRAINT "Upload_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
