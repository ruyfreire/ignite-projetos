import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { Address } from '@/domain/delivery/enterprise/entities/value-objects/address'
import { Prisma, Receiver as PrismaReceiver } from '@prisma/client'

export class PrismaReceiverMapper {
  static toDomain(raw: PrismaReceiver) {
    const address = new Address({
      zip_code: raw.zip_code,
      street: raw.street,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      complement: raw.complement,
      number: raw.number,
      latitude: raw.latitude,
      longitude: raw.longitude,
    })

    return new Receiver(
      {
        name: raw.name,
        cpf: raw.cpf,
        address,
      },
      raw.id,
    )
  }

  static toPrisma(receiver: Receiver): Prisma.ReceiverUncheckedCreateInput {
    return {
      id: receiver.id,
      name: receiver.name,
      cpf: receiver.cpf,
      zip_code: receiver.address.zip_code,
      street: receiver.address.street,
      neighborhood: receiver.address.neighborhood,
      city: receiver.address.city,
      state: receiver.address.state,
      complement: receiver.address.complement,
      number: receiver.address.number,
      latitude: receiver.address.latitude,
      longitude: receiver.address.longitude,
    }
  }
}
