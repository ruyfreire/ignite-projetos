import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { app } from '../src/app'
import { knex } from '../src/database'

describe('Users', () => {
  beforeAll(async () => {
    execSync('npm run knex migrate:latest')
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await knex('users').delete('*')
  })

  describe('POST /users', () => {
    it('should create a new user and set cookie', async () => {
      const response = await supertest(app.server)
        .post('/users')
        .send({
          name: 'Test',
        })
        .expect(201)

      expect(response.body).toEqual({
        user: expect.objectContaining({
          id: expect.any(String),
        }),
      })

      const cookies = response.headers['set-cookie']

      expect(cookies).toEqual([expect.stringContaining('user_id')])
    })

    it('should return error if user name is empty', async () => {
      const response = await supertest(app.server)
        .post('/users')
        .send({
          name: '',
        })
        .expect(400)

      expect(response.body).toEqual({
        message: 'Invalid request body',
        error: expect.objectContaining({
          name: expect.any(Object),
        }),
      })
    })
  })

  describe('GET /users/metrics', () => {
    it('should return metrics', async () => {
      const responseCreateUser = await supertest(app.server)
        .post('/users')
        .send({
          name: 'Test',
        })

      const cookies = responseCreateUser.get('Set-Cookie')

      await supertest(app.server).post('/meals').set('Cookie', cookies).send({
        name: 'Café da manhã',
        description: 'test description',
        date: '2023-10-08',
        is_diet: false,
      })

      await supertest(app.server).post('/meals').set('Cookie', cookies).send({
        name: 'Almoço',
        description: 'test description',
        date: '2023-10-08',
        is_diet: true,
      })

      const response = await supertest(app.server)
        .get('/users/metrics')
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toEqual({
        metrics: {
          total_meals: 2,
          total_meals_is_diet: 1,
          total_meals_is_not_diet: 1,
          best_sequence_diet: 1,
        },
      })
    })
  })
})
