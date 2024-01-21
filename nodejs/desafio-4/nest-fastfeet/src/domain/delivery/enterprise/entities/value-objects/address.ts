import { ValueObject } from '@/core/entities/value-object'

export interface AddressProps {
  zip_code: string
  street: string
  neighborhood: string
  city: string
  state: string
  complement?: string | null
  number: string
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

  get zip_code() {
    return this.props.zip_code
  }

  get street() {
    return this.props.street
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

  get complement() {
    return this.props.complement
  }
}
