-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "avatar_upload_id" TEXT,
    "cognito_id" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Upload" (
    "id" TEXT NOT NULL,
    "path_url" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_avatar_upload_id_key" ON "public"."Users"("avatar_upload_id");

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_avatar_upload_id_fkey" FOREIGN KEY ("avatar_upload_id") REFERENCES "public"."Upload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
