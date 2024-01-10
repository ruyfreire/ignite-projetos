import { InMemoryReceiverRepository } from 'tests/repositories/in-memory-receiver-repository'
import { UpdateReceiverUseCase } from './update-receiver'
import { makeReceiver } from 'tests/factories/make-receiver'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'

let sut: UpdateReceiverUseCase
let inMemoryReceiverRepository: InMemoryReceiverRepository

describe('Update Receiver use case', () => {
  beforeEach(() => {
    inMemoryReceiverRepository = new InMemoryReceiverRepository()
    sut = new UpdateReceiverUseCase(inMemoryReceiverRepository)
  })

  it('should update a receiver', async () => {
    const receiver = makeReceiver()
    inMemoryReceiverRepository.items.push(receiver)

    const result = await sut.execute({
      name: 'new name',
      cpf: receiver.cpf,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryReceiverRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'new name',
        }),
      ]),
    )
  })

  it('should not update a receiver not found', async () => {
    const receiver = makeReceiver()

    const result = await sut.execute({
      name: receiver.name,
      cpf: receiver.cpf,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ReceiverNotFoundError)
  })
})
