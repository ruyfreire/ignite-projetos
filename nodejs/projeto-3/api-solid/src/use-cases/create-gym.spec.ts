import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GymUserCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: GymUserCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymUserCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: 'Gym 01 description',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
