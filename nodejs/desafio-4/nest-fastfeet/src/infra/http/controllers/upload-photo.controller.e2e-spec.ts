import { AppModule } from '@/infra/app.module'
import { RepositoriesModule } from '@/infra/repositories/repositories.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Upload photo (E2E)', () => {
  let app: INestApplication
  let deliverymanFactory: DeliverymanFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, RepositoriesModule],
      providers: [DeliverymanFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliverymanFactory = moduleRef.get(DeliverymanFactory)

    await app.init()
  })

  test('[POST] /photos', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    const token = await deliverymanFactory.getToken(deliveryman)

    const response = await request(app.getHttpServer())
      .post('/photos')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', './tests/e2e/sample-upload.png')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      photo_id: expect.any(String),
    })
  })
})
