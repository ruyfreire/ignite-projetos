import { fakerPT_BR as faker } from '@faker-js/faker'

import { Photo, PhotoProps } from '@/domain/delivery/enterprise/entities/photo'

export function makePhoto(override: Partial<PhotoProps> = {}, id?: string) {
  const photo = new Photo(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return photo
}
