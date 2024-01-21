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
  ],
  exports: [
    PrismaService,
    AdminRepository,
    DeliverymanRepository,
    ReceiverRepository,
    OrderRepository,
  ],
})
export class RepositoriesModule {}
