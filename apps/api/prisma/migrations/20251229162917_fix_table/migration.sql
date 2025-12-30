/*
  Warnings:

  - You are about to drop the column `cognito_id` on the `Users` table. All the data in the column will be lost.
  - Added the required column `cognitoId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "cognito_id",
ADD COLUMN     "cognitoId" TEXT NOT NULL;
