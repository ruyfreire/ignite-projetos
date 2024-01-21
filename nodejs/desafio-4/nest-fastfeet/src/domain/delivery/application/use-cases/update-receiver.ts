import { Either, left, right } from '@/core/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import {
  Address,
  AddressProps,
} from '../../enterprise/entities/value-objects/address'
import { Injectable } from '@nestjs/common'

interface UpdateReceiverUseCaseProps {
  cpf: string
  name?: string
  address?: Partial<AddressProps>
}

type UpdateReceiverUseCaseResponse = Either<
  ReceiverNotFoundError,
  {
    receiver: Receiver
  }
>

@Injectable()
export class UpdateReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    name,
    cpf,
    address,
  }: UpdateReceiverUseCaseProps): Promise<UpdateReceiverUseCaseResponse> {
    const receiver = await this.receiverRepository.findByCpf(cpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    if (name) {
      receiver.name = name
    }

    if (address) {
      const addressObj = Object.assign({}, receiver.address, address)
      receiver.address = new Address(addressObj)
    }

    await this.receiverRepository.update(receiver)

    return right({
      receiver,
    })
  }
}
