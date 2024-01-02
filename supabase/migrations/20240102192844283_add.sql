-- AlterTable
ALTER TABLE "Place" DROP COLUMN "east",
DROP COLUMN "north",
DROP COLUMN "south",
DROP COLUMN "west";

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "geoJson" JSONB NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

