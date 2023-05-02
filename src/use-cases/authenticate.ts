import { IUsersRepository } from "@/repositories/IUsersRepository"
import { User } from "@prisma/client"
import { AuthenticationError } from "./errors/authentication-error"
import { compare } from "bcryptjs"

interface AuthenticateUseCaseRequest {
  email: string,
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
      const user = await this.usersRepository.findByEmail(email)

      if(!user) {
        throw new AuthenticationError()
      }

      const doesPasswordMatch = await compare(password, user.password_hash)

      if(!doesPasswordMatch) {
        throw new AuthenticationError()
      }

      // @ts-ignore
      delete user.password_hash

      return {
        user
      }
  }
}