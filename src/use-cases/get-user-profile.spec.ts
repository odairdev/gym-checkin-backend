import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUsecase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUsecase //System Under Test

describe('Get User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUsecase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute(createdUser.id)

    expect(user.name).toEqual(createdUser.name)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute('non-existent-id')
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})