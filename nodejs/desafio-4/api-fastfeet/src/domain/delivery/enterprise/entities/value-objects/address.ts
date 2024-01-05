import { ValueObject } from '@/core/entities/value-object'

export interface AddressProps {
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  country: string
  zipCode: string
  latitude: number
  longitude: number
}

export class Address extends ValueObject<AddressProps> {
  constructor(protected props: AddressProps) {
    super(props)
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get country() {
    return this.props.country
  }

  get zipCode() {
    return this.props.zipCode
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }
}
