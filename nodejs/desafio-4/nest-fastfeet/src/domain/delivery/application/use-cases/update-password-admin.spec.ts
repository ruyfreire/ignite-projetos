import { InMemoryAdminRepository } from 'tests/repositories/in-memory-admin-repository'
import { makeAdmin } from 'tests/factories/make-admin'
import { AdminNotFoundError } from './errors/admin-not-found-error'
import { UpdatePasswordAdminUseCase } from './update-password-admin'
import { FakeHasher } from 'tests/cryptography/fake-hasher'

let sut: UpdatePasswordAdminUseCase
let fakeHasher: FakeHasher
let inMemoryAdminRepository: InMemoryAdminRepository

describe('Update password Admin use case', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeHasher = new FakeHasher()
    sut = new UpdatePasswordAdminUseCase(inMemoryAdminRepository, fakeHasher)
  })

  it('should update password admin', async () => {
    const admin = makeAdmin({
      password: '123456',
    })
    inMemoryAdminRepository.items.push(admin)

    const result = await sut.execute({
      cpf: admin.cpf,
      password: 'new_password',
    })

    const isPasswordChanged = await fakeHasher.compare(
      'new_password',
      inMemoryAdminRepository.items[0].password,
    )

    expect(result.isRight()).toBeTruthy()
    expect(isPasswordChanged).toBeTruthy()
  })

  it('should not update a admin not found', async () => {
    const result = await sut.execute({
      cpf: '11111111111',
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(AdminNotFoundError)
  })
})
