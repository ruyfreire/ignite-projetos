import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { ReceiverFactory } from 'tests/factories/make-receiver'

describe('Fetch Receiver (E2E) - [GET] /receiver?cpf=', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let receiverFactory: ReceiverFactory
  let token: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, ReceiverFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    receiverFactory = moduleRef.get(ReceiverFactory)

    const admin = await adminFactory.makePrismaAdmin()
    token = await adminFactory.getToken(admin)

    await app.init()
  })

  it('should fetch all receiver', async () => {
    await receiverFactory.makePrismaReceiver()
    await receiverFactory.makePrismaReceiver()

    const response = await request(app.getHttpServer())
      .get('/receiver')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.receiver).toHaveLength(2)
  })
})
