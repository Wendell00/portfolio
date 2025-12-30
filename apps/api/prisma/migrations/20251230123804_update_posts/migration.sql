/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Posts" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_id_key" ON "public"."Posts"("id");
