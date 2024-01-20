import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Fetch Deliveryman (E2E) - [GET] /deliverymen?cpf=', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let deliverymanFactory: DeliverymanFactory
  let token: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, DeliverymanFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)

    const admin = await adminFactory.makePrismaAdmin()
    token = await adminFactory.getToken(admin)

    await app.init()
  })

  it('should fetch all deliverymen', async () => {
    await deliverymanFactory.makePrismaDeliveryman()
    await deliverymanFactory.makePrismaDeliveryman()

    const response = await request(app.getHttpServer())
      .get('/deliverymen')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.deliverymen).toHaveLength(2)
  })
})
