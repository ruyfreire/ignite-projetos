import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { makeAddress } from 'tests/factories/make-address'
import { DeliveryFactory } from 'tests/factories/make-delivery'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'
import { ReceiverFactory } from 'tests/factories/make-receiver'

describe('Fetch Deliveries Nearby (E2E) - [GET] /deliveries/nearby', () => {
  let app: INestApplication
  let prisma: PrismaService
  let deliveryFactory: DeliveryFactory
  let deliverymanFactory: DeliverymanFactory
  let receiverFactory: ReceiverFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PrismaService,
        DeliveryFactory,
        DeliverymanFactory,
        ReceiverFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)
    receiverFactory = moduleRef.get(ReceiverFactory)

    await app.init()
  })

  it('should fetch all deliveries nearby', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    const token = await deliverymanFactory.getToken(deliveryman)

    const address1 = makeAddress({ latitude: -23.533773, longitude: -46.62529 })
    const receiver1 = await receiverFactory.makePrismaReceiver({
      address: address1,
    })
    await deliveryFactory.makePrismaDelivery({
      receiver: receiver1,
      status: 'AVAILABLE',
    })

    const address2 = makeAddress({ latitude: 0, longitude: 0 })
    const receiver2 = await receiverFactory.makePrismaReceiver({
      address: address2,
    })
    await deliveryFactory.makePrismaDelivery({
      receiver: receiver2,
      status: 'AVAILABLE',
    })

    const response = await request(app.getHttpServer())
      .get('/deliveries/nearby')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.533773,
        longitude: -46.62529,
      })

    const deliveriesOnDatabase = await prisma.delivery.findMany()

    expect(response.statusCode).toBe(200)
    expect(deliveriesOnDatabase).toHaveLength(2)
    expect(response.body.deliveries).toHaveLength(1)
  })
})
