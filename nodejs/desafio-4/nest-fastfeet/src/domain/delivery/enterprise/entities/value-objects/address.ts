import { ValueObject } from '@/core/entities/value-object'

export interface AddressProps {
  number: number
  latitude: number
  longitude: number
}

export class Address extends ValueObject<AddressProps> {
  constructor(protected props: AddressProps) {
    super(props)
  }

  get number() {
    return this.props.number
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }
}
