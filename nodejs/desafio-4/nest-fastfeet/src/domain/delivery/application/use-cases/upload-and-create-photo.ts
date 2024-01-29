import { Either, left, right } from '@/core/either'
import { Uploader } from '../storage/uploader'
import { Photo } from '../../enterprise/entities/photo'
import { PhotosRepository } from '../repositories/photos-repository'
import { InvalidPhotoTypeError } from './errors/invalid-photo-type-error'
import { Injectable } from '@nestjs/common'

interface UploadAndCreatePhotoRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreatePhotoResponse = Either<
  InvalidPhotoTypeError,
  { photo: Photo }
>

@Injectable()
export class UploadAndCreatePhotoUseCase {
  constructor(
    private photosRepository: PhotosRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreatePhotoRequest): Promise<UploadAndCreatePhotoResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidPhotoTypeError(fileType))
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body })

    const photo = new Photo({
      title: fileName,
      url,
    })

    await this.photosRepository.create(photo)

    return right({
      photo,
    })
  }
}
