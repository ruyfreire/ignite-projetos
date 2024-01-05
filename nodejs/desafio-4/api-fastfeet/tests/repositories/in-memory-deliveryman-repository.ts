import {
  UserRepository,
  UserTypes,
} from '@/domain/delivery/application/repository/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: UserTypes[] = []

  async findByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf)

    return user || null
  }

  async create(user: UserTypes) {
    this.items.push(user)

    return user
  }
}
