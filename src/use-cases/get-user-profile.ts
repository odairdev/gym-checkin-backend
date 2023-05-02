import { IUsersRepository } from "@/repositories/IUsersRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


export class GetUserProfileUsecase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}