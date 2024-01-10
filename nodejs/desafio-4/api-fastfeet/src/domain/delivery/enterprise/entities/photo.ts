import { Entity } from '@/core/entities/entity'

export interface PhotoProps {
  title: string
  url: string
}

export class Photo extends Entity {
  constructor(
    protected props: PhotoProps,
    id?: string,
  ) {
    super(id)
  }

  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }
}
