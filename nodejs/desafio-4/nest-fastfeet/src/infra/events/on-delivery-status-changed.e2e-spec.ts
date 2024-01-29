import { DomainEvents } from '@/core/events/domain-events'
import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryFactory } from 'tests/factories/make-delivery'
import { RepositoriesModule } from '../repositories/repositories.module'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'
import { PrismaService } from '../repositories/prisma/prisma.service'

describe('On delivery status changed (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let deliveryFactory: DeliveryFactory
  let deliverymanFactory: DeliverymanFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, RepositoriesModule],
      providers: [DeliveryFactory, DeliverymanFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('should send a notification when delivery status changed', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    const token = await deliverymanFactory.getToken(deliveryman)
    const delivery = await deliveryFactory.makePrismaDelivery({
      availableAt: new Date(),
      status: 'AVAILABLE',
    })

    await request(app.getHttpServer())
      .patch(`/deliveries/${delivery.id}/deliveryman`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    await vi.waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          receiverId: delivery.receiver.id,
        },
      })

      expect(notificationOnDatabase).not.toBeNull()
    })
  })
})
