import { randomUUID } from 'node:crypto'

export abstract class Entity {
  private _id: string

  protected constructor(id?: string) {
    this._id = id || randomUUID()
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity) {
    if (entity === this) {
      return true
    }

    if (entity.id === this.id) {
      return true
    }

    return false
  }
}
