import { Entity } from '@/core/entities/entity'
import { Address } from './value-objects/address'

export interface ReceiverProps {
  name: string
  address: Address
}

export class Receiver extends Entity {
  constructor(
    protected props: ReceiverProps,
    id?: string,
  ) {
    super(id)
  }

  get name() {
    return this.props.name
  }

  get address() {
    return this.props.address
  }
}
