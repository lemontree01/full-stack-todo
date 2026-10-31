-- AlterTable
ALTER TABLE "users" ALTER COLUMN "login" DROP NOT NULL,
ALTER COLUMN "password_hash" DROP NOT NULL;
