import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliveryFactory } from 'tests/factories/make-delivery'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Fetch Deliveries by deliveryman CPF (E2E) - [GET] /deliverymen/:cpf/deliveries', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let deliveryFactory: DeliveryFactory
  let deliverymanFactory: DeliverymanFactory
  let token: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AdminFactory,
        PrismaService,
        DeliveryFactory,
        DeliverymanFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)

    const admin = await adminFactory.makePrismaAdmin()
    token = await adminFactory.getToken(admin)

    await app.init()
  })

  it('should fetch deliveries by CPF deliveryman', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    await deliveryFactory.makePrismaDelivery({ deliveryman })
    await deliveryFactory.makePrismaDelivery()

    const response = await request(app.getHttpServer())
      .get(`/deliverymen/${deliveryman.cpf}/deliveries`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const deliveriesOnDatabase = await prisma.delivery.findMany()

    expect(response.statusCode).toBe(200)
    expect(deliveriesOnDatabase).toHaveLength(2)
    expect(response.body.deliveries).toHaveLength(1)
  })
})
