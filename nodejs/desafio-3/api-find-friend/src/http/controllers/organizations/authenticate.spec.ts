import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate organization', async () => {
    await prisma.organization.create({
      data: {
        name: faker.company.name(),
        address: faker.location.street(),
        city: faker.location.city(),
        phone: faker.helpers.replaceSymbols('119########'),
        email: 'org@email.com',
        password_hash: await hash('123456', 6),
      },
    })

    const response = await request(app.server)
      .post('/organizations/auth')
      .send({
        email: 'org@email.com',
        password: '123456',
      })

    const cookies = response.get('Set-Cookie')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(cookies).toEqual([expect.stringContaining('refreshToken')])
  })
})
