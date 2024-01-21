import { Either, left, right } from '@/core/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { ReceiverAlreadyExistsError } from './errors/receiver-already-exists-error'
import {
  Address,
  AddressProps,
} from '../../enterprise/entities/value-objects/address'
import { Injectable } from '@nestjs/common'

interface CreateReceiverUseCaseProps {
  name: string
  cpf: string
  address: AddressProps
}

type CreateReceiverUseCaseResponse = Either<
  ReceiverAlreadyExistsError,
  {
    receiver: Receiver
  }
>

@Injectable()
export class CreateReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    name,
    cpf,
    address,
  }: CreateReceiverUseCaseProps): Promise<CreateReceiverUseCaseResponse> {
    const hasReceiver = await this.receiverRepository.findByCpf(cpf)

    if (hasReceiver) {
      return left(new ReceiverAlreadyExistsError())
    }

    const addressObj = new Address({
      zip_code: address.zip_code,
      street: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      complement: address.complement,
      number: address.number,
      latitude: address.latitude,
      longitude: address.longitude,
    })

    const receiver = new Receiver({
      name,
      cpf,
      address: addressObj,
    })

    await this.receiverRepository.create(receiver)

    return right({
      receiver,
    })
  }
}
