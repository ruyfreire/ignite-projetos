import { AppModule } from '@/infra/app.module'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'tests/factories/make-admin'

describe('Update Password Admin (E2E) - [PUT] /admins/:cpf/password', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let bcryptHasher: BcryptHasher

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AdminFactory, PrismaService, BcryptHasher],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    bcryptHasher = moduleRef.get(BcryptHasher)

    await app.init()
  })

  it('should update password admin', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = await adminFactory.getToken(admin)

    const response = await request(app.getHttpServer())
      .put(`/admins/${admin.cpf}/password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: 'new_password',
      })

    const adminOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: admin.cpf,
      },
    })

    const passwordMatch = await bcryptHasher.compare(
      'new_password',
      adminOnDatabase!.password,
    )

    expect(response.statusCode).toBe(200)
    expect(passwordMatch).toBeTruthy()
  })
})
