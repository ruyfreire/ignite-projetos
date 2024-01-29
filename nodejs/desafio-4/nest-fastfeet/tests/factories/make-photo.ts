import { fakerPT_BR as faker } from '@faker-js/faker'

import { Photo, PhotoProps } from '@/domain/delivery/enterprise/entities/photo'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { PrismaPhotoMapper } from '@/infra/repositories/prisma/mappers/prisma-photo-mapper'

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

@Injectable()
export class PhotoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPhoto(data: Partial<PhotoProps> = {}): Promise<Photo> {
    const photo = makePhoto(data)

    await this.prisma.photo.create({
      data: PrismaPhotoMapper.toPrisma(photo),
    })

    return photo
  }
}
