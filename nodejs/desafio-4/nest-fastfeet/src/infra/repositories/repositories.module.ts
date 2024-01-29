import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository'
import { DeliverymanRepository } from '@/domain/delivery/application/repositories/deliveryman-repository'
import { PrismaDeliverymanRepository } from './prisma/repositories/prisma-deliveryman-repository'
import { ReceiverRepository } from '@/domain/delivery/application/repositories/receiver-repository'
import { PrismaReceiverRepository } from './prisma/repositories/prisma-receiver-repostiory'
import { OrderRepository } from '@/domain/delivery/application/repositories/order-repository'
import { PrismaOrderRepository } from './prisma/repositories/prisma-order-repository'
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository'
import { PrismaDeliveryRepository } from './prisma/repositories/prisma-delivery-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notifications-repository'
import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository'
import { PrismaPhotosRepository } from './prisma/repositories/prisma-photos-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
    {
      provide: DeliverymanRepository,
      useClass: PrismaDeliverymanRepository,
    },
    {
      provide: ReceiverRepository,
      useClass: PrismaReceiverRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: DeliveryRepository,
      useClass: PrismaDeliveryRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: PhotosRepository,
      useClass: PrismaPhotosRepository,
    },
  ],
  exports: [
    PrismaService,
    AdminRepository,
    DeliverymanRepository,
    ReceiverRepository,
    OrderRepository,
    DeliveryRepository,
    NotificationsRepository,
    PhotosRepository,
  ],
})
export class RepositoriesModule {}
