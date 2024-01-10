export type RoleProps = 'ADMIN' | 'DELIVERYMAN'

export class Role {
  constructor(protected role: RoleProps) {}

  isAdmin() {
    return this.role === 'ADMIN'
  }

  equals(vo: Role) {
    return this.role === vo.role
  }

  toString() {
    return this.role
  }
}
