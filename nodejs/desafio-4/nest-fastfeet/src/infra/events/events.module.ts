import { Module } from '@nestjs/common'
import { OnDeliveryStatusChanged } from '@/domain/notification/application/subscribers/on-delivery-status-changed'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { RepositoriesModule } from '../repositories/repositories.module'

@Module({
  imports: [RepositoriesModule],
  providers: [OnDeliveryStatusChanged, SendNotificationUseCase],
})
export class EventsModule {}
