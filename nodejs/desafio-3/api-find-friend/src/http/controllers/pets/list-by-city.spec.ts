import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List pets by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should list pets by city', async () => {
    const { id: organization_id } = await prisma.organization.create({
      data: {
        name: faker.company.name(),
        address: faker.location.street(),
        city: 'São Paulo',
        phone: faker.helpers.replaceSymbols('119########'),
        email: faker.internet.email(),
        password_hash: await hash(faker.internet.password(), 6),
      },
    })

    await prisma.pet.createMany({
      data: [
        {
          name: 'Doguinho',
          age: 3,
          description: faker.lorem.sentence(),
          size: 'LARGE',
          organization_id,
        },
        {
          name: 'Gatinho',
          age: 2,
          description: faker.lorem.sentence(),
          size: 'MEDIUM',
          organization_id,
        },
        {
          name: 'Passarinho',
          age: 1,
          description: faker.lorem.sentence(),
          size: 'SMALL',
          organization_id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'São Paulo',
        age: 2,
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: 'Gatinho' }),
      expect.objectContaining({ name: 'Passarinho' }),
    ])
  })
})
