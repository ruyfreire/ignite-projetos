import { Pet, Prisma } from '@prisma/client'

export type PetFilter = Partial<Pick<Pet, 'name' | 'size' | 'age'>>

export interface PetRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrganizationId(
    organizationId: string,
    filter?: PetFilter,
  ): Promise<Pet[]>
}
