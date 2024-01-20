import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create Admin (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /admins', async () => {
    const response = await request(app.getHttpServer()).post('/admins').send({
      name: 'John Doe',
      cpf: '12345678900',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const adminOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: '12345678900',
        role: 'ADMIN',
      },
    })

    expect(adminOnDatabase).toBeTruthy()
  })
})
