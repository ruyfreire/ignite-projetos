import { Photo } from '@/domain/delivery/enterprise/entities/photo'
import { Prisma, Photo as PrismaPhoto } from '@prisma/client'

export class PrismaPhotoMapper {
  static toDomain(raw: PrismaPhoto): Photo {
    return new Photo({ title: raw.title, url: raw.url }, raw.id)
  }

  static toPrisma(photo: Photo): Prisma.PhotoUncheckedCreateInput {
    return {
      id: photo.id,
      title: photo.title,
      url: photo.url,
    }
  }
}
