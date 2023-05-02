import { PrismaUsersReposiotory } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersReposiotory()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}