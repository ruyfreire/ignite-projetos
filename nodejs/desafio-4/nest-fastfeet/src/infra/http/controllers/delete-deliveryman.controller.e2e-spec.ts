import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Delete Deliveryman (E2E) - [DELETE] /deliverymen/:cpf', () => {
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

  it('should delete deliveryman', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()

    const response = await request(app.getHttpServer())
      .delete(`/deliverymen/${deliveryman.cpf}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)

    const deliverymanOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: deliveryman.cpf,
      },
    })

    expect(deliverymanOnDatabase).toBeNull()
  })
})
