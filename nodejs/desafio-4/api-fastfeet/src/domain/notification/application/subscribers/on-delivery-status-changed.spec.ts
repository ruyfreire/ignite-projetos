import { MockInstance } from 'vitest'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseProps,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'tests/repositories/in-memory-notifications-repository'
import { OnDeliveryStatusChanged } from './on-delivery-status-changed'
import { makeDelivery } from 'tests/factories/make-delivery'
import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { FakeLocalization } from 'tests/geolocation/localization'

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseProps],
  Promise<SendNotificationUseCaseResponse>
>

let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('On Delivery status updated', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnDeliveryStatusChanged(sendNotificationUseCase).initSubscriptions()
  })

  it('should send a notification when update delivery status', async () => {
    const delivery = makeDelivery()

    delivery.availableAt = new Date()

    inMemoryDeliveryRepository.update(delivery)

    await vi.waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
      expect(inMemoryNotificationsRepository.items[0]).toEqual(
        expect.objectContaining({
          title: 'O status da sua encomenda foi atualizado',
          content: 'Status alterado para: Aguardando retirada',
        }),
      )
    })
  })
})
