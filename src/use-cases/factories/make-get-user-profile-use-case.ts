import { PrismaUsersReposiotory } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUsecase } from "../get-user-profile";


export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersReposiotory()
  const getUserProfileUseCase = new GetUserProfileUsecase(usersRepository)

  return getUserProfileUseCase
}