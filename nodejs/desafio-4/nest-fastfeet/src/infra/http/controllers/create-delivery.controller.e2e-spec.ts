import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { OrderFactory } from 'tests/factories/make-order'
import { ReceiverFactory } from 'tests/factories/make-receiver'

describe('Create Delivery (E2E) - [POST] /deliveries', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let receiverFactory: ReceiverFactory
  let orderFactory: OrderFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, ReceiverFactory, OrderFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    receiverFactory = moduleRef.get(ReceiverFactory)
    orderFactory = moduleRef.get(OrderFactory)

    await app.init()
  })

  it('should create delivery', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)
    const receiver = await receiverFactory.makePrismaReceiver()
    const order = await orderFactory.makePrismaOrder()

    const response = await request(app.getHttpServer())
      .post('/deliveries')
      .set('Authorization', `Bearer ${token}`)
      .send({
        order_id: order.id,
        receiver_cpf: receiver.cpf,
      })

    expect(response.statusCode).toBe(201)

    const deliveryOnDatabase = await prisma.delivery.findFirst({
      where: {
        receiverId: receiver.id,
        orderId: order.id,
      },
    })

    expect(deliveryOnDatabase).toBeTruthy()
  })
})
