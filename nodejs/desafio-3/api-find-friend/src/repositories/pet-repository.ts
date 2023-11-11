import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
