import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Authenticate Admin (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let hashGenerator: HashGenerator

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    hashGenerator = moduleRef.get(HashGenerator)

    await app.init()
  })

  test('[POST] /admins/authenticate', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        cpf: '12345678900',
        password: await hashGenerator.hash('123456'),
        role: 'ADMIN',
      },
    })

    const response = await request(app.getHttpServer())
      .post('/admins/authenticate')
      .send({
        cpf: '12345678900',
        password: '123456',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
