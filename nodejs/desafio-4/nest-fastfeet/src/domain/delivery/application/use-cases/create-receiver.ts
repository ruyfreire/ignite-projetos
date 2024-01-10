import { Either, left, right } from '@/core/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { ReceiverAlreadyExistsError } from './errors/receiver-already-exists-error'
import { Address } from '../../enterprise/entities/value-objects/address'

interface CreateReceiverUseCaseProps {
  name: string
  cpf: string
  addressNumber: number
  latitude: number
  longitude: number
}

type CreateReceiverUseCaseResponse = Either<
  ReceiverAlreadyExistsError,
  {
    receiver: Receiver
  }
>

export class CreateReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    name,
    cpf,
    addressNumber,
    latitude,
    longitude,
  }: CreateReceiverUseCaseProps): Promise<CreateReceiverUseCaseResponse> {
    const hasReceiver = await this.receiverRepository.findByCpf(cpf)

    if (hasReceiver) {
      return left(new ReceiverAlreadyExistsError())
    }

    const address = new Address({
      number: addressNumber,
      latitude,
      longitude,
    })

    const receiver = new Receiver({
      name,
      cpf,
      address,
    })

    await this.receiverRepository.create(receiver)

    return right({
      receiver,
    })
  }
}
