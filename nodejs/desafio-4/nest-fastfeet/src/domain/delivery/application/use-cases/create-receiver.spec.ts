import { InMemoryReceiverRepository } from 'tests/repositories/in-memory-receiver-repository'
import { CreateReceiverUseCase } from './create-receiver'
import { makeReceiver } from 'tests/factories/make-receiver'
import { ReceiverAlreadyExistsError } from './errors/receiver-already-exists-error'
import { makeAddress } from 'tests/factories/make-address'

let sut: CreateReceiverUseCase
let inMemoryReceiverRepository: InMemoryReceiverRepository

describe('Create Receiver use case', () => {
  beforeEach(() => {
    inMemoryReceiverRepository = new InMemoryReceiverRepository()
    sut = new CreateReceiverUseCase(inMemoryReceiverRepository)
  })

  it('should create a receiver', async () => {
    const receiver = makeReceiver()
    const address = makeAddress()

    const result = await sut.execute({
      name: receiver.name,
      cpf: receiver.cpf,
      address,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryReceiverRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cpf: receiver.cpf,
        }),
      ]),
    )
  })

  it('should not create a receiver with same cpf', async () => {
    const receiver = makeReceiver()
    inMemoryReceiverRepository.items.push(receiver)
    const address = makeAddress()

    const result = await sut.execute({
      name: receiver.name,
      cpf: receiver.cpf,
      address,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ReceiverAlreadyExistsError)
    expect(inMemoryReceiverRepository.items).toHaveLength(1)
  })
})
