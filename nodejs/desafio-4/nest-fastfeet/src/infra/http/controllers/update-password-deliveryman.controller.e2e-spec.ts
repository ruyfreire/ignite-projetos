import { AppModule } from '@/infra/app.module'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'
import { DeliverymanFactory } from 'tests/factories/make-deliveryman'

describe('Update Password Deliveryman (E2E) - [PUT] /deliverymen/:cpf/password', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let deliverymanFactory: DeliverymanFactory
  let bcryptHasher: BcryptHasher

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AdminFactory,
        PrismaService,
        DeliverymanFactory,
        BcryptHasher,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)
    bcryptHasher = moduleRef.get(BcryptHasher)

    await app.init()
  })

  it('should update password deliveryman', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const deliveryman = await deliverymanFactory.makePrismaDeliveryman({
      password: '123456',
    })

    const response = await request(app.getHttpServer())
      .put(`/deliverymen/${deliveryman.cpf}/password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: 'new_password',
      })

    const deliverymanOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: deliveryman.cpf,
      },
    })

    const passwordMatch = await bcryptHasher.compare(
      'new_password',
      deliverymanOnDatabase!.password,
    )

    expect(response.statusCode).toBe(200)
    expect(passwordMatch).toBeTruthy()
  })
})
