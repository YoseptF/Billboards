-- AlterTable
ALTER TABLE "BillboardInPlace" ADD COLUMN     "mapId" TEXT;

-- AddForeignKey
ALTER TABLE "BillboardInPlace" ADD CONSTRAINT "BillboardInPlace_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

