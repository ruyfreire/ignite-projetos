import { UploadAndCreatePhotoUseCase } from './upload-and-create-photo'
import { InvalidPhotoTypeError } from './errors/invalid-photo-type-error'
import { InMemoryPhotosRepository } from 'tests/repositories/in-memory-photos-repository'
import { FakeUploader } from 'tests/storage/fake-uploader'

let inMemoryPhotosRepository: InMemoryPhotosRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreatePhotoUseCase

describe('Upload and create photo', () => {
  beforeEach(() => {
    inMemoryPhotosRepository = new InMemoryPhotosRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreatePhotoUseCase(
      inMemoryPhotosRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an photo', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      photo: inMemoryPhotosRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('should not be able to upload an photo with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidPhotoTypeError)
  })
})
