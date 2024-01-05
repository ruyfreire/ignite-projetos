import { Entity } from '@/core/entities/entity'

export interface OrderProps {
  title: string
}

export class Order extends Entity {
  constructor(
    protected props: OrderProps,
    id?: string,
  ) {
    super(id)
  }

  get title() {
    return this.props.title
  }
}
