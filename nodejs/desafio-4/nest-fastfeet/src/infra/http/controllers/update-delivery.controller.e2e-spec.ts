import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliveryFactory } from 'tests/factories/make-delivery'

describe('Update Delivery (E2E) - [put] /deliveries', () => {
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

  it('should create delivery', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)
    const delivery = await deliveryFactory.makePrismaDelivery({
      availableAt: new Date('2024-01-01 00:00:00'),
    })

    const response = await request(app.getHttpServer())
      .put(`/deliveries/${delivery.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        available_at: new Date('2024-01-02 00:00:00').toISOString(),
      })

    expect(response.statusCode).toBe(200)

    const deliveryOnDatabase = await prisma.delivery.findUnique({
      where: {
        id: delivery.id,
      },
    })

    expect(deliveryOnDatabase).toMatchObject({
      availableAt: new Date('2024-01-02 00:00:00'),
    })
  })
})
