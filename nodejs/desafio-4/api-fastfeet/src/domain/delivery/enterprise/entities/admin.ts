import { User } from './user'
import { Role } from './value-objects/role'

export interface AdminProps {
  name: string
  cpf: string
  password: string
}

export class Admin extends User {
  constructor(
    protected props: AdminProps,
    id?: string,
  ) {
    super({ ...props, role: new Role('ADMIN') }, id)
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
