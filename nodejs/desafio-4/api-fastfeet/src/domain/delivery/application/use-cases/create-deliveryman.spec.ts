import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { CreateDeliverymanUseCase } from './create-deliveryman'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { DeliverymanAlreadyExistsError } from './errors/deliveryman-already-exists-error'

let sut: CreateDeliverymanUseCase
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

describe('Create Deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new CreateDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('should create a deliveryman', async () => {
    const deliveryman = makeDeliveryman()

    const result = await sut.execute({
      name: deliveryman.name,
      cpf: deliveryman.cpf,
      password: deliveryman.password,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliverymanRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cpf: deliveryman.cpf,
        }),
      ]),
    )
  })

  it('should not create a deliveryman with same cpf', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      name: deliveryman.name,
      cpf: deliveryman.cpf,
      password: deliveryman.password,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanAlreadyExistsError)
    expect(inMemoryDeliverymanRepository.items).toHaveLength(1)
  })
})
