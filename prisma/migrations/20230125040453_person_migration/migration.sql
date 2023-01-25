-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SINGLE', 'MARRIED');

-- CreateEnum
CREATE TYPE "MutationType" AS ENUM ('CREATED', 'DELETED', 'UPDATED');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "status" "Status" NOT NULL,
    "birthdate" TEXT NOT NULL,
    "haveChild" BOOLEAN NOT NULL,
    "children" INTEGER[],
    "parents" INTEGER[],

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
