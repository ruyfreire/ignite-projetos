import { User } from './user'
import { Role } from './value-objects/role'

export interface DeliveryManProps {
  name: string
  cpf: string
  password: string
}

export class DeliveryMan extends User {
  constructor(
    protected props: DeliveryManProps,
    id?: string,
  ) {
    super({ role: new Role('DELIVERYMAN') }, id)
  }

  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }
}
