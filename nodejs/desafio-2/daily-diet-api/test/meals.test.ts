import { execSync } from 'node:child_process'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vitest,
} from 'vitest'
import supertest from 'supertest'
import { app } from '../src/app'
import { knex } from '../src/database'

describe('Users', () => {
  let cookies = ['']

  beforeAll(async () => {
    execSync('npm run knex migrate:latest')
    await app.ready()

    const responseCreateUser = await supertest(app.server).post('/users').send({
      name: 'Test',
    })

    cookies = responseCreateUser.get('Set-Cookie')
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    vitest.clearAllMocks()
    await knex('meals').delete('*')
  })

  describe('POST /meals', () => {
    it('should create a new meal', async () => {
      const responseCreateMeal = await supertest(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'Test',
          description: 'Test',
          date: '2021-01-01',
          is_diet: true,
        })
        .expect(201)

      expect(responseCreateMeal.body).toEqual({
        meal: expect.objectContaining({
          id: expect.any(String),
        }),
      })
    })

    it('should return error if empty property', async () => {
      const response = await supertest(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({})
        .expect(400)

      expect(response.body).toEqual({
        message: 'Invalid request body',
        error: expect.objectContaining({
          name: expect.any(Object),
          description: expect.any(Object),
          date: expect.any(Object),
          is_diet: expect.any(Object),
        }),
      })
    })

    it('should return error if user cookie not found', async () => {
      const response = await supertest(app.server)
        .post('/meals')
        .set('Cookie', 'user_id=8323c8b5-cfe5-49ee-b8af-9a0edde9f70a')
        .send({
          name: 'Test',
          description: 'Test',
          date: '2021-01-01',
          is_diet: true,
        })
        .expect(400)

      expect(response.body).toEqual({
        message: 'User cookie not found',
      })
    })
  })

  describe('GET /meals', () => {
    it('should return all meals', async () => {
      await supertest(app.server).post('/meals').set('Cookie', cookies).send({
        name: 'Test',
        description: 'Test',
        date: '2021-01-01',
        is_diet: true,
      })

      const response = await supertest(app.server)
        .get('/meals')
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toMatchObject({
        meals: [
          {
            name: 'Test',
            description: 'Test',
          },
        ],
      })
    })

    it('should return empty if user cookie not found', async () => {
      const response = await supertest(app.server)
        .get('/meals')
        .set('Cookie', 'user_id=8323c8b5-cfe5-49ee-b8af-9a0edde9f70a')
        .expect(200)

      expect(response.body).toEqual({
        meals: [],
      })
    })
  })

  describe('GET /meals/:id', () => {
    it('should return a meal', async () => {
      const responseCreateMeal = await supertest(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'Test',
          description: 'Test',
          date: '2021-01-01',
          is_diet: true,
        })

      const { meal } = responseCreateMeal.body

      const response = await supertest(app.server)
        .get(`/meals/${meal.id}`)
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toMatchObject({
        meal,
      })
    })

    it('should return error if meal not found', async () => {
      const response = await supertest(app.server)
        .get('/meals/8323c8b5-cfe5-49ee-b8af-9a0edde9f70a')
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        message: 'Meal not found',
      })
    })

    it('should return error if invalid uuid param', async () => {
      const response = await supertest(app.server)
        .get('/meals/invalid-uuid')
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        message: 'Invalid uuid Param',
      })
    })
  })

  describe('PUT /meals/:id', () => {
    it('should update a meal', async () => {
      const responseCreateMeal = await supertest(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'Test',
          description: 'Test',
          date: '2021-01-01',
          is_diet: true,
        })

      const { meal } = responseCreateMeal.body

      await supertest(app.server)
        .put(`/meals/${meal.id}`)
        .set('Cookie', cookies)
        .send({
          name: 'Test 2',
          description: 'Test 2',
          date: '2021-01-01',
          is_diet: false,
        })
        .expect(200)

      const response = await supertest(app.server)
        .get(`/meals/${meal.id}`)
        .set('Cookie', cookies)

      expect(response.body).toMatchObject({
        meal: {
          id: meal.id,
          name: 'Test 2',
          description: 'Test 2',
        },
      })
    })

    it('should return error if meal not found', async () => {
      const response = await supertest(app.server)
        .put('/meals/8323c8b5-cfe5-49ee-b8af-9a0edde9f70a')
        .set('Cookie', cookies)
        .send({
          name: 'Test 2',
          description: 'Test 2',
          date: '2021-01-01',
          is_diet: false,
        })
        .expect(404)

      expect(response.body).toEqual({
        message: 'Meal not found',
      })
    })

    it('should return error if invalid uuid param', async () => {
      const response = await supertest(app.server)
        .put('/meals/invalid-uuid')
        .set('Cookie', cookies)
        .send({
          name: 'Test 2',
          description: 'Test 2',
          date: '2021-01-01',
          is_diet: false,
        })
        .expect(400)

      expect(response.body).toEqual({
        message: 'Invalid uuid Param',
      })
    })

    it('should return error if invalid properties', async () => {
      const responseCreateMeal = await supertest(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'Test',
          description: 'Test',
          date: '2021-01-01',
          is_diet: true,
        })

      const { meal } = responseCreateMeal.body

      const response = await supertest(app.server)
        .put(`/meals/${meal.id}`)
        .set('Cookie', cookies)
        .send({
          name: '',
          description: '',
          date: '',
          is_diet: '',
        })
        .expect(400)

      expect(response.body).toEqual({
        message: 'Invalid request body',
        error: expect.objectContaining({
          name: expect.any(Object),
          description: expect.any(Object),
          date: expect.any(Object),
          is_diet: expect.any(Object),
        }),
      })
    })
  })

  describe('DELETE /meals/:id', () => {
    it('should delete a meal', async () => {
      const responseCreateMeal = await supertest(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'Test',
          description: 'Test',
          date: '2021-01-01',
          is_diet: true,
        })

      const { meal } = responseCreateMeal.body

      await supertest(app.server)
        .delete(`/meals/${meal.id}`)
        .set('Cookie', cookies)
        .expect(204)

      const response = await supertest(app.server)
        .get(`/meals/${meal.id}`)
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        message: 'Meal not found',
      })
    })

    it('should return error if meal not found', async () => {
      const response = await supertest(app.server)
        .delete('/meals/8323c8b5-cfe5-49ee-b8af-9a0edde9f70a')
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        message: 'Meal not found',
      })
    })

    it('should return error if invalid uuid param', async () => {
      const response = await supertest(app.server)
        .delete('/meals/invalid-uuid')
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        message: 'Invalid uuid Param',
      })
    })
  })
})
