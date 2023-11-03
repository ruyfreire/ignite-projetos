import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryCase(checkInsRepository)

  return useCase
}
