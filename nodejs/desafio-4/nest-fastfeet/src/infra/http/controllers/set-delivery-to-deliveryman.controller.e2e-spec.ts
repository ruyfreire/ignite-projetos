import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryFactory } from 'tests/factories/make-delivery'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Set Delivery to Deliveryman (E2E) - [PATCH] /deliveries/:id/deliveryman', () => {
  let app: INestApplication
  let prisma: PrismaService
  let deliverymanFactory: DeliverymanFactory
  let deliveryFactory: DeliveryFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DeliverymanFactory, PrismaService, DeliveryFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)

    await app.init()
  })

  it('should set delivery to deliveryman', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    const token = await deliverymanFactory.getToken(deliveryman)
    const delivery = await deliveryFactory.makePrismaDelivery({
      availableAt: new Date(),
    })

    const response = await request(app.getHttpServer())
      .patch(`/deliveries/${delivery.id}/deliveryman`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)

    const deliveryOnDatabase = await prisma.delivery.findUnique({
      where: {
        id: delivery.id,
      },
    })

    expect(deliveryOnDatabase).toMatchObject({
      deliverymanId: deliveryman.id,
    })
  })
})
