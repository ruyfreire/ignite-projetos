import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryFactory } from 'tests/factories/make-delivery'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'
import { PhotoFactory } from 'tests/factories/make-photo'

describe('Set Delivery to Delivered (E2E) - [PATCH] /deliveries/:id/delivered', () => {
  let app: INestApplication
  let prisma: PrismaService
  let deliveryFactory: DeliveryFactory
  let deliverymanFactory: DeliverymanFactory
  let photoFactory: PhotoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PrismaService,
        DeliveryFactory,
        DeliverymanFactory,
        PhotoFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    photoFactory = moduleRef.get(PhotoFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)

    await app.init()
  })

  it('should set delivery to delivered', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    const token = await deliverymanFactory.getToken(deliveryman)
    const delivery = await deliveryFactory.makePrismaDelivery({
      status: 'ASSIGNED',
      deliveryman,
    })

    const photo = await photoFactory.makePrismaPhoto()
    const response = await request(app.getHttpServer())
      .patch(`/deliveries/${delivery.id}/delivered`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        photo_id: photo.id,
      })

    expect(response.statusCode).toBe(200)

    const deliveryOnDatabase = await prisma.delivery.findUnique({
      where: {
        id: delivery.id,
      },
    })

    expect(deliveryOnDatabase).toMatchObject({
      deliveredAt: expect.any(Date),
      status: 'DELIVERED',
      photoId: photo.id,
    })
  })
})
