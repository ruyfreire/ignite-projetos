import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: string,
) {
  const notification = new Notification(
    {
      recipientId: randomUUID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}
