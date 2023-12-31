-- AlterTable
ALTER TABLE "Billboard" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

