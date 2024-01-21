import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { ReceiverFactory } from 'tests/factories/make-receiver'

describe('Delete Receiver (E2E) - [DELETE] /receiver/:cpf', () => {
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

  it('should delete receiver', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)
    const receiver = await receiverFactory.makePrismaReceiver()

    const response = await request(app.getHttpServer())
      .delete(`/receiver/${receiver.cpf}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)

    const receiverOnDatabase = await prisma.receiver.findUnique({
      where: {
        cpf: receiver.cpf,
      },
    })

    expect(receiverOnDatabase).toBeNull()
  })
})
