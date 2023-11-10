import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create: (pet: Prisma.PetCreateInput, organizationId: string) => Promise<Pet>
}
