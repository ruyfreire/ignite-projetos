-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('AVAILABLE', 'DELIVERED', 'RETURNED');

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "available_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "returned_at" TIMESTAMP(3),
    "photo_id" TEXT,
    "status" "DeliveryStatus",
    "order_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "receiver_latitude" DOUBLE PRECISION NOT NULL,
    "receiver_longitude" DOUBLE PRECISION NOT NULL,
    "deliveryman_id" TEXT,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "receivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryman_id_fkey" FOREIGN KEY ("deliveryman_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
