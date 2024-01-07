import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { FetchDeliverymanUseCase } from './fetch-deliveryman'
import { makeDeliveryMan } from 'tests/factories/make-deliveryman'

let sut: FetchDeliverymanUseCase
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

describe('Fetch Deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new FetchDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('should fetch all deliveryman', async () => {
    const deliveryman1 = makeDeliveryMan()
    const deliveryman2 = makeDeliveryMan()
    inMemoryDeliverymanRepository.items.push(deliveryman1)
    inMemoryDeliverymanRepository.items.push(deliveryman2)

    const result = await sut.execute({})

    const deliveryman = result.isRight() ? result.value.deliveryman : []

    expect(result.isRight()).toBeTruthy()
    expect(deliveryman.length).toBe(2)
    expect(result.value).toEqual({
      deliveryman: expect.arrayContaining([
        expect.objectContaining({
          name: deliveryman1.name,
        }),
        expect.objectContaining({
          name: deliveryman2.name,
        }),
      ]),
    })
  })

  it('should fetch unique deliveryman', async () => {
    const deliveryman1 = makeDeliveryMan()
    const deliveryman2 = makeDeliveryMan()
    inMemoryDeliverymanRepository.items.push(deliveryman1)
    inMemoryDeliverymanRepository.items.push(deliveryman2)

    const result = await sut.execute({
      cpf: deliveryman1.cpf,
    })

    const deliveryman = result.isRight() ? result.value.deliveryman : []

    expect(result.isRight()).toBeTruthy()
    expect(deliveryman.length).toBe(1)
    expect(result.value).toEqual({
      deliveryman: expect.arrayContaining([
        expect.objectContaining({
          name: deliveryman1.name,
        }),
      ]),
    })
  })
})
