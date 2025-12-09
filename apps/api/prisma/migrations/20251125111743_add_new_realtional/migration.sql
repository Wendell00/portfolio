/*
  Warnings:

  - Made the column `cognito_id` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Users_avatar_upload_id_key";

-- AlterTable
ALTER TABLE "public"."Users" ALTER COLUMN "cognito_id" SET NOT NULL;
