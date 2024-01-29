import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository'
import { Photo } from '@/domain/delivery/enterprise/entities/photo'

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = []

  async create(photo: Photo) {
    this.items.push(photo)
  }

  async findById(id: string) {
    const photo = this.items.find((photo) => photo.id === id)

    if (!photo) {
      return null
    }

    return photo
  }
}
