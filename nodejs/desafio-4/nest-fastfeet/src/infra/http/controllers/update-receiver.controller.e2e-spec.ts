import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { makeAddress } from 'tests/factories/make-address'
import { AdminFactory } from 'tests/factories/make-admin'
import { ReceiverFactory } from 'tests/factories/make-receiver'

describe('Update Receiver (E2E) - [PUT] /receiver/:cpf', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let receiverFactory: ReceiverFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, ReceiverFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    receiverFactory = moduleRef.get(ReceiverFactory)

    await app.init()
  })

  it('should update receiver', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const address = makeAddress({ zip_code: '12345678' })
    const receiver = await receiverFactory.makePrismaReceiver({
      name: 'João',
      address,
    })

    const response = await request(app.getHttpServer())
      .put(`/receiver/${receiver.cpf}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Maria',
        address: {
          zip_code: '87654321',
        },
      })

    expect(response.statusCode).toBe(200)

    const receiverOnDatabase = await prisma.receiver.findUnique({
      where: {
        cpf: receiver.cpf,
        name: 'Maria',
        zip_code: '87654321',
      },
    })

    expect(receiverOnDatabase).toBeTruthy()
  })
})
