import { InMemoryAdminRepository } from 'tests/repositories/in-memory-admin-repository'
import { CreateAdminUseCase } from './create-admin'
import { makeAdmin } from 'tests/factories/make-admin'
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error'
import { FakeHasher } from 'tests/cryptography/fake-hasher'

let sut: CreateAdminUseCase
let inMemoryAdminRepository: InMemoryAdminRepository
let fakeHasher: FakeHasher

describe('Create Admin use case', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateAdminUseCase(inMemoryAdminRepository, fakeHasher)
  })

  it('should create a admin', async () => {
    const admin = makeAdmin()

    const result = await sut.execute({
      name: admin.name,
      cpf: admin.cpf,
      password: admin.password,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAdminRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cpf: admin.cpf,
        }),
      ]),
    )
  })

  it('should not create a admin with same cpf', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.items.push(admin)

    const result = await sut.execute({
      name: admin.name,
      cpf: admin.cpf,
      password: admin.password,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(AdminAlreadyExistsError)
    expect(inMemoryAdminRepository.items).toHaveLength(1)
  })
})
