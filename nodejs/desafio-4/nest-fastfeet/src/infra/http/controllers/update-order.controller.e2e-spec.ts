import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { OrderFactory } from 'tests/factories/make-order'

describe('Update Order (E2E) - [PUT] /orders/:id', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let orderFactory: OrderFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, OrderFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    orderFactory = moduleRef.get(OrderFactory)

    await app.init()
  })

  it('should update order', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const order = await orderFactory.makePrismaOrder({
      title: 'Samsung',
    })

    const response = await request(app.getHttpServer())
      .put(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Motorola',
      })

    expect(response.statusCode).toBe(200)

    const orderOnDatabase = await prisma.order.findUnique({
      where: {
        title: 'Motorola',
      },
    })

    expect(orderOnDatabase).toBeTruthy()
  })
})
