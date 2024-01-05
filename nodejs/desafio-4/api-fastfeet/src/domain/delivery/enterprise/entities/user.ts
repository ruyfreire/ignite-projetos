import { Entity } from '@/core/entities/entity'
import { Role } from './value-objects/role'

export interface UserProps {
  role?: Role
}

export abstract class User extends Entity {
  protected constructor(
    protected user: UserProps,
    id?: string,
  ) {
    super(id)
  }

  get role() {
    return this.user.role
  }
}
