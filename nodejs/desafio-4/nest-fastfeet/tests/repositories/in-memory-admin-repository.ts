import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = []

  async create(admin: Admin) {
    this.items.push(admin)
  }

  async findByCpf(cpf: string) {
    const admin = this.items.find((item) => item.cpf === cpf)

    return admin || null
  }

  async update(admin: Admin): Promise<void> {
    const adminIndex = this.items.findIndex((item) => item.cpf === admin.cpf)

    this.items[adminIndex] = admin
  }

  async delete(cpf: string): Promise<void> {
    const adminIndex = this.items.findIndex((item) => item.cpf === cpf)

    this.items.splice(adminIndex, 1)
  }
}
