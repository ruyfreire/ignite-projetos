import { Either, left, right } from '@/core/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { Address } from '../../enterprise/entities/value-objects/address'

interface UpdateReceiverUseCaseProps {
  name?: string
  addressNumber?: number
  latitude?: number
  longitude?: number
  cpf: string
}

type UpdateReceiverUseCaseResponse = Either<
  ReceiverNotFoundError,
  {
    receiver: Receiver
  }
>

export class UpdateReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    name,
    addressNumber,
    latitude,
    longitude,
    cpf,
  }: UpdateReceiverUseCaseProps): Promise<UpdateReceiverUseCaseResponse> {
    const receiver = await this.receiverRepository.findByCpf(cpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    if (name) {
      receiver.name = name
    }

    if (addressNumber || latitude || longitude) {
      const address = {
        number: addressNumber || receiver.address.number,
        latitude: latitude || receiver.address.latitude,
        longitude: longitude || receiver.address.longitude,
      }

      receiver.address = new Address(address)
    }

    await this.receiverRepository.update(receiver)

    return right({
      receiver,
    })
  }
}
