import { Entity } from '@/core/entities/entity'

export interface NotificationProps {
  recipientId: string
  title: string
  content: string
  readAt?: Date | null
  createdAt?: Date
}

export class Notification extends Entity {
  constructor(
    protected props: NotificationProps,
    id?: string,
  ) {
    super(id)
    this.props.createdAt = props.createdAt || new Date()
  }

  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }
}
