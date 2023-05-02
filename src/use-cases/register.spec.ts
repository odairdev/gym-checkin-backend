import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash users password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const isPasswordHashedCorrectly = await compare('123456', user.password_hash)

    expect(isPasswordHashedCorrectly).toBe(true)
  })

  it('should not be able to create two users with same email', async () => {
    const email = 'johndoe@example.com'

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    await expect(async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})