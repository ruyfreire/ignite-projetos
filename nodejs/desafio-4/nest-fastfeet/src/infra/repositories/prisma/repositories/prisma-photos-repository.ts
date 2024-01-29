import { Photo } from '@/domain/delivery/enterprise/entities/photo'
import { PrismaService } from '../prisma.service'
import { PrismaPhotoMapper } from '../mappers/prisma-photo-mapper'
import { Injectable } from '@nestjs/common'
import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository'

@Injectable()
export class PrismaPhotosRepository implements PhotosRepository {
  constructor(private prisma: PrismaService) {}

  async create(photos: Photo) {
    const data = PrismaPhotoMapper.toPrisma(photos)

    await this.prisma.photo.create({
      data,
    })
  }

  async save(photos: Photo) {
    const data = PrismaPhotoMapper.toPrisma(photos)

    await this.prisma.photo.update({
      where: {
        id: photos.id,
      },
      data,
    })
  }

  async findById(id: string) {
    const photo = await this.prisma.photo.findUnique({
      where: {
        id,
      },
    })

    if (!photo) {
      return null
    }

    return PrismaPhotoMapper.toDomain(photo)
  }
}
