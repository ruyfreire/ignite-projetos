import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript 01',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Typescript 02',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript 01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript 01' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript 21' }),
      expect.objectContaining({ title: 'Javascript 22' }),
    ])
  })
})
