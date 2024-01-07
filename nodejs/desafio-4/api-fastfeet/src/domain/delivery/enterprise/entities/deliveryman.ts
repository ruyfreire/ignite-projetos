import { User } from './user'
import { Role } from './value-objects/role'

export interface DeliverymanProps {
  name: string
  cpf: string
  password: string
}

export class Deliveryman extends User {
  constructor(
    protected props: DeliverymanProps,
    id?: string,
  ) {
    super({ role: new Role('DELIVERYMAN') }, id)
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

  get password() {
    return this.props.password
  }
}
