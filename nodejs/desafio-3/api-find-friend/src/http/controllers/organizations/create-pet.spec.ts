import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
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
      .post(`/organizations/${id}/pets`)
      .send({
        name: faker.animal.cat(),
        age: faker.number.int({ min: 1, max: 15 }),
        description: faker.lorem.sentence(),
        size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      pet: expect.objectContaining({ id: expect.any(String) }),
    })
  })
})
