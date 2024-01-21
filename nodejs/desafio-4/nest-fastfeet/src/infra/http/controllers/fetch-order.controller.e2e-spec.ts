import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { OrderFactory } from 'tests/factories/make-order'

describe('Fetch Order (E2E) - [GET] /orders?id=', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let orderFactory: OrderFactory
  let token: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, OrderFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    orderFactory = moduleRef.get(OrderFactory)

    const admin = await adminFactory.makePrismaAdmin()
    token = await adminFactory.getToken(admin)

    await app.init()
  })

  it('should fetch all order', async () => {
    await orderFactory.makePrismaOrder()
    await orderFactory.makePrismaOrder()

    const response = await request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(2)
  })
})
