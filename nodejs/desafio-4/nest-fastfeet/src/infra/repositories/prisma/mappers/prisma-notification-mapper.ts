import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { Prisma, Notification as PrismaNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return new Notification(
      {
        title: raw.title,
        content: raw.content,
        recipientId: raw.receiverId,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      raw.id,
    )
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id,
      title: notification.title,
      content: notification.content,
      receiverId: notification.recipientId,
      createdAt: notification.createdAt ?? undefined,
      readAt: notification.readAt,
    }
  }
}
