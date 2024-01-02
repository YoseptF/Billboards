-- DropForeignKey
ALTER TABLE "BillboardInPlace" DROP CONSTRAINT "BillboardInPlace_mapId_fkey";

-- AlterTable
ALTER TABLE "Billboard" ADD COLUMN     "mapId" TEXT;

-- AlterTable
ALTER TABLE "BillboardInPlace" DROP COLUMN "mapId";

-- AddForeignKey
ALTER TABLE "Billboard" ADD CONSTRAINT "Billboard_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

