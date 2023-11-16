import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get organization contact (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get contact organization', async () => {
    const { id } = await prisma.organization.create({
      data: {
        name: faker.company.name(),
        address: faker.location.street(),
        city: faker.location.city(),
        phone: faker.helpers.replaceSymbols('119########'),
        email: faker.internet.email(),
        password_hash: await hash(faker.internet.password(), 6),
      },
    })

    const response = await request(app.server)
      .get(`/organizations/${id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      organization: expect.objectContaining({
        phone: expect.any(String),
        email: expect.any(String),
      }),
    })
  })
})
