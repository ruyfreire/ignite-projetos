import { Organization, Prisma } from '@prisma/client'

export interface OrganizationRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
}
