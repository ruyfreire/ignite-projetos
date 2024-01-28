import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliveryFactory } from 'tests/factories/make-delivery'

describe('Fetch Deliveries (E2E) - [GET] /deliveries', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let deliveryFactory: DeliveryFactory
  let token: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, DeliveryFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)

    const admin = await adminFactory.makePrismaAdmin()
    token = await adminFactory.getToken(admin)

    await app.init()
  })

  it('should fetch all deliveries', async () => {
    await deliveryFactory.makePrismaDelivery()
    await deliveryFactory.makePrismaDelivery()

    const response = await request(app.getHttpServer())
      .get('/deliveries')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.deliveries).toHaveLength(2)
  })
})
