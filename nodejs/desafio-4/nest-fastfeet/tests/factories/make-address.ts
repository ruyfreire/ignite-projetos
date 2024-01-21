import {
  Address,
  AddressProps,
} from '@/domain/delivery/enterprise/entities/value-objects/address'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeAddress(override: Partial<AddressProps> = {}) {
  const address = new Address({
    zip_code: override.zip_code || faker.location.zipCode(),
    street: override.street || faker.location.street(),
    neighborhood: override.neighborhood || faker.location.street(),
    city: override.city || faker.location.city(),
    state: override.state || faker.location.state(),
    complement: override.complement || faker.location.secondaryAddress(),
    number: override.number || faker.location.buildingNumber(),
    latitude: override.latitude ?? faker.location.latitude(),
    longitude: override.longitude ?? faker.location.longitude(),
  })

  return address
}
