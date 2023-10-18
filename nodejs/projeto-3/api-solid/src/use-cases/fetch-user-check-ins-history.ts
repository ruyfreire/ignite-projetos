import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryCaseRequest): Promise<FetchUserCheckInsHistoryCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
