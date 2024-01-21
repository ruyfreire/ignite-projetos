import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'

describe('Create Receiver (E2E) - [POST] /receiver', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)

    await app.init()
  })

  it('should create receiver by admin token', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const response = await request(app.getHttpServer())
      .post('/receiver')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        cpf: '12345678900',
        address: {
          zip_code: '12345678',
          street: 'Rua A',
          neighborhood: 'Bairro B',
          city: 'Cidade C',
          state: 'São Paulo',
          complement: 'Complemento D',
          number: '123',
          latitude: 123,
          longitude: 123,
        },
      })

    expect(response.statusCode).toBe(201)

    const receiverOnDatabase = await prisma.receiver.findUnique({
      where: {
        cpf: '12345678900',
      },
    })

    expect(receiverOnDatabase).toBeTruthy()
  })
})
