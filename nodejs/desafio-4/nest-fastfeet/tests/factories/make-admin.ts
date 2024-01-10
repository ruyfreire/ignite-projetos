import { Admin, AdminProps } from '@/domain/delivery/enterprise/entities/admin'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeAdmin(override: Partial<AdminProps> = {}, id?: string) {
  const admin = new Admin(
    {
      name: faker.person.fullName(),
      cpf: faker.number.int({ min: 11, max: 11 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return admin
}
