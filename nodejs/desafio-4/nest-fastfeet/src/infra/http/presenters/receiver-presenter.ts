import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

export class ReceiverPresenter {
  static toHTTP(receiver: Receiver) {
    return {
      id: receiver.id,
      name: receiver.name,
      cpf: receiver.cpf,
      address: {
        zip_code: receiver.address.zip_code,
        street: receiver.address.street,
        neighborhood: receiver.address.neighborhood,
        city: receiver.address.city,
        state: receiver.address.state,
        complement: receiver.address.complement,
        number: receiver.address.number,
        latitude: receiver.address.latitude,
        longitude: receiver.address.longitude,
      },
    }
  }
}
