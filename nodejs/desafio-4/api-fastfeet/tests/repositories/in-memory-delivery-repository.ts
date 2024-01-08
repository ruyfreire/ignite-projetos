import {
  Coordinate,
  Localization,
} from '@/domain/delivery/application/geolocation/localization'
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

  constructor(private localization: Localization) {}

  async create(delivery: Delivery) {
    this.items.push(delivery)
  }

  async findById(id: string) {
    const delivery = this.items.find((item) => item.id === id)

    return delivery || null
  }

  async findManyByCpfReceiver(cpf: string) {
    const delivery = this.items.filter((item) => item.receiver.cpf === cpf)

    return delivery || null
  }

  async findMany(): Promise<Delivery[]> {
    return this.items
  }

  findNearbyDelivery(props: Coordinate): Promise<Delivery[]> {
    const delivery = this.items.filter((item) => {
      const distance = this.localization.getDistanceBetweenCoordinate({
        from: {
          latitude: props.latitude,
          longitude: props.longitude,
        },
        to: {
          latitude: item.receiver.address.latitude,
          longitude: item.receiver.address.longitude,
        },
      })

      return distance <= 10
    })

    return Promise.resolve(delivery)
  }

  async update(delivery: Delivery): Promise<void> {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id === delivery.id,
    )

    this.items[deliveryIndex] = delivery
  }

  async delete(id: string): Promise<void> {
    const deliveryIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(deliveryIndex, 1)
  }
}
