import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'

export class DeliveryPresenter {
  static toHTTP(delivery: Delivery) {
    const deliveryHTTP = {
      id: delivery.id,
      order: {
        id: delivery.order.id,
        title: delivery.order.title,
      },
      receiver: {
        id: delivery.receiver.id,
        name: delivery.receiver.name,
        cpf: delivery.receiver.cpf,
        address: {
          zip_code: delivery.receiver.address.zip_code,
          street: delivery.receiver.address.street,
          number: delivery.receiver.address.number,
          neighborhood: delivery.receiver.address.neighborhood,
          complement: delivery.receiver.address.complement,
          city: delivery.receiver.address.city,
          state: delivery.receiver.address.state,
        },
      },
      deliveryman: delivery.deliveryman
        ? {
            id: delivery.deliveryman.id,
            name: delivery.deliveryman.name,
            cpf: delivery.deliveryman.cpf,
          }
        : null,
      available_at: delivery.availableAt,
      delivered_at: delivery.delivered ? delivery.delivered.deliveredAt : null,
      returned_at: delivery.returnedAt,
      status: delivery.status,
    }

    return deliveryHTTP
  }
}
