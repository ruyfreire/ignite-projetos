import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  organizations: Organization[] = []

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      password_hash: data.password_hash,
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
    }

    this.organizations.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find((org) => org.email === email)

    return organization || null
  }

  async findById(id: string) {
    const organization = this.organizations.find((org) => org.id === id)

    return organization || null
  }
}
