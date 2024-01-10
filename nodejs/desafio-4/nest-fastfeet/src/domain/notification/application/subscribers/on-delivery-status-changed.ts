import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { DeliveryStatusChangedEvent } from '@/domain/delivery/enterprise/events/delivery-status-changed'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

export class OnDeliveryStatusChanged implements EventHandler {
  constructor(private sendNotification: SendNotificationUseCase) {}

  initSubscriptions(): void {
    DomainEvents.register(
      this.sendDeliveryChangedNotification.bind(this),
      DeliveryStatusChangedEvent.name,
    )
  }

  private getDeliveryStatusText(status: string) {
    switch (status) {
      case 'AVAILABLE':
        return 'Aguardando retirada'
      case 'DELIVERED':
        return 'Entregue'
      case 'RETURNED':
        return 'Devolvido'
      default:
        return 'Em processamento'
    }
  }

  private async sendDeliveryChangedNotification({
    delivery,
  }: DeliveryStatusChangedEvent) {
    await this.sendNotification.execute({
      recipientId: delivery.receiver.id,
      title: 'O status da sua encomenda foi atualizado',
      content: `Status alterado para: ${this.getDeliveryStatusText(
        delivery.status || '',
      )}`,
    })
  }
}
