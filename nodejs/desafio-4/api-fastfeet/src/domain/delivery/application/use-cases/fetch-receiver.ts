import { Either, right } from '@/core/either'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { Receiver } from '../../enterprise/entities/receiver'

interface FetchReceiverUseCaseProps {
  cpf?: string
}

type FetchReceiverUseCaseResponse = Either<
  null,
  {
    receiver: Receiver[]
  }
>

export class FetchReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    cpf,
  }: FetchReceiverUseCaseProps): Promise<FetchReceiverUseCaseResponse> {
    let receiver: Receiver[] = []

    if (cpf) {
      const receiverFound = await this.receiverRepository.findByCpf(cpf)

      receiver = receiverFound ? [receiverFound] : []
    } else {
      receiver = await this.receiverRepository.findMany()
    }

    return right({
      receiver,
    })
  }
}
