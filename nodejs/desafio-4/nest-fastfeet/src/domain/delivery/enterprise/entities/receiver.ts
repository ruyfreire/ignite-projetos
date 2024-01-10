import { Entity } from '@/core/entities/entity'
import { Address } from './value-objects/address'

export interface ReceiverProps {
  name: string
  cpf: string
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

  set name(name: string) {
    this.props.name = name
  }

  get cpf() {
    return this.props.cpf
  }

  get address() {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }
}
