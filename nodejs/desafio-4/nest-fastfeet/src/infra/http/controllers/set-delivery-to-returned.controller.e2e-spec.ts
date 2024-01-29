import { OrderDelivered } from '@/domain/delivery/enterprise/entities/value-objects/order-delivered'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliveryFactory } from 'tests/factories/make-delivery'

describe('Set Delivery to Returned (E2E) - [PATCH] /deliveries/:id/returned', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let deliveryFactory: DeliveryFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, DeliveryFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)

    await app.init()
  })

  it('should set delivery to returned', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)
    const delivery = await deliveryFactory.makePrismaDelivery({
      delivered: new OrderDelivered({ photoId: '1', deliveredAt: new Date() }),
    })

    const response = await request(app.getHttpServer())
      .patch(`/deliveries/${delivery.id}/returned`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)

    const deliveryOnDatabase = await prisma.delivery.findUnique({
      where: {
        id: delivery.id,
      },
    })

    expect(deliveryOnDatabase).toMatchObject({
      returnedAt: expect.any(Date),
    })
  })
})
