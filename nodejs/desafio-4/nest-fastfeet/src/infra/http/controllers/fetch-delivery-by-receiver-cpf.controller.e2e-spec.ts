import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliveryFactory } from 'tests/factories/make-delivery'
import { ReceiverFactory } from 'tests/factories/make-receiver'

describe('Fetch Deliveries by receiver CPF (E2E) - [GET] /receiver/:cpf/deliveries', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let deliveryFactory: DeliveryFactory
  let receiverFactory: ReceiverFactory
  let token: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AdminFactory,
        PrismaService,
        DeliveryFactory,
        ReceiverFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    receiverFactory = moduleRef.get(ReceiverFactory)

    const admin = await adminFactory.makePrismaAdmin()
    token = await adminFactory.getToken(admin)

    await app.init()
  })

  it('should fetch deliveries by CPF receiver', async () => {
    const receiver = await receiverFactory.makePrismaReceiver()
    await deliveryFactory.makePrismaDelivery({ receiver })
    await deliveryFactory.makePrismaDelivery()

    const response = await request(app.getHttpServer())
      .get(`/receiver/${receiver.cpf}/deliveries`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const deliveriesOnDatabase = await prisma.delivery.findMany()

    expect(response.statusCode).toBe(200)
    expect(deliveriesOnDatabase).toHaveLength(2)
    expect(response.body.deliveries).toHaveLength(1)
  })
})
