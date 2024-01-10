import { InMemoryReceiverRepository } from 'tests/repositories/in-memory-receiver-repository'
import { DeleteReceiverUseCase } from './delete-receiver'
import { makeReceiver } from 'tests/factories/make-receiver'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'

let sut: DeleteReceiverUseCase
let inMemoryReceiverRepository: InMemoryReceiverRepository

describe('Delete Receiver use case', () => {
  beforeEach(() => {
    inMemoryReceiverRepository = new InMemoryReceiverRepository()
    sut = new DeleteReceiverUseCase(inMemoryReceiverRepository)
  })

  it('should delete a receiver', async () => {
    const receiver = makeReceiver()
    inMemoryReceiverRepository.items.push(receiver)

    const result = await sut.execute({
      cpf: receiver.cpf,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryReceiverRepository.items).toHaveLength(0)
  })

  it('should not delete a receiver not found', async () => {
    const receiver = makeReceiver()

    const result = await sut.execute({
      cpf: receiver.cpf,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ReceiverNotFoundError)
  })
})
