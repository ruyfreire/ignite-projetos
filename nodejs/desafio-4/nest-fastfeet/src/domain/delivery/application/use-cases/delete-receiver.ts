import { Either, left, right } from '@/core/either'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteReceiverUseCaseProps {
  cpf: string
}

type DeleteReceiverUseCaseResponse = Either<ReceiverNotFoundError, null>

@Injectable()
export class DeleteReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    cpf,
  }: DeleteReceiverUseCaseProps): Promise<DeleteReceiverUseCaseResponse> {
    const receiver = await this.receiverRepository.findByCpf(cpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    await this.receiverRepository.delete(cpf)

    return right(null)
  }
}
