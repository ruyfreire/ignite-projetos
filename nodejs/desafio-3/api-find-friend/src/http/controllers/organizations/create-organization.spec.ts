import { app } from '@/app'
import { faker } from '@faker-js/faker/locale/pt_BR'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new organization', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send({
        name: faker.company.name(),
        address: faker.location.street(),
        city: faker.location.city(),
        phone: faker.helpers.replaceSymbols('119########'),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      organization: expect.objectContaining({ id: expect.any(String) }),
    })
  })
})
