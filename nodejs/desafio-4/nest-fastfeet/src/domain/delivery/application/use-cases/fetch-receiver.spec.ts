import { InMemoryReceiverRepository } from 'tests/repositories/in-memory-receiver-repository'
import { FetchReceiverUseCase } from './fetch-receiver'
import { makeReceiver } from 'tests/factories/make-receiver'

let sut: FetchReceiverUseCase
let inMemoryReceiverRepository: InMemoryReceiverRepository

describe('Fetch Receiver use case', () => {
  beforeEach(() => {
    inMemoryReceiverRepository = new InMemoryReceiverRepository()
    sut = new FetchReceiverUseCase(inMemoryReceiverRepository)
  })

  it('should fetch all receiver', async () => {
    const receiver1 = makeReceiver()
    const receiver2 = makeReceiver()
    inMemoryReceiverRepository.items.push(receiver1)
    inMemoryReceiverRepository.items.push(receiver2)

    const result = await sut.execute({})

    const receiver = result.isRight() ? result.value.receiver : []

    expect(result.isRight()).toBeTruthy()
    expect(receiver.length).toBe(2)
    expect(result.value).toEqual({
      receiver: expect.arrayContaining([
        expect.objectContaining({
          cpf: receiver1.cpf,
        }),
        expect.objectContaining({
          cpf: receiver2.cpf,
        }),
      ]),
    })
  })

  it('should fetch unique receiver', async () => {
    const receiver1 = makeReceiver()
    const receiver2 = makeReceiver()
    inMemoryReceiverRepository.items.push(receiver1)
    inMemoryReceiverRepository.items.push(receiver2)

    const result = await sut.execute({
      cpf: receiver1.cpf,
    })

    const receiver = result.isRight() ? result.value.receiver : []

    expect(result.isRight()).toBeTruthy()
    expect(receiver.length).toBe(1)
    expect(result.value).toEqual({
      receiver: expect.arrayContaining([
        expect.objectContaining({
          cpf: receiver1.cpf,
        }),
      ]),
    })
  })
})
