import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Create Deliveryman (E2E) - [POST] /deliverymen', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let deliverymanFactory: DeliverymanFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, DeliverymanFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)

    await app.init()
  })

  it('should create deliveryman by admin token', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const response = await request(app.getHttpServer())
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        cpf: '12345678900',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)

    const deliverymanOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: '12345678900',
        role: 'DELIVERYMAN',
      },
    })

    expect(deliverymanOnDatabase).toBeTruthy()
  })

  it('shouldn`t create deliveryman by deliveryman token', async () => {
    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()
    const token = await deliverymanFactory.getToken(deliveryman)

    const response = await request(app.getHttpServer())
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        cpf: '12345678900',
        password: '123456',
      })

    expect(response.statusCode).toBe(403)
  })
})
