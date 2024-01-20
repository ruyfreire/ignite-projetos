import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'

export class DeliverymanPresenter {
  static toHTTP(deliveryman: Deliveryman) {
    return {
      id: deliveryman.id,
      name: deliveryman.name,
      cpf: deliveryman.cpf,
    }
  }
}
