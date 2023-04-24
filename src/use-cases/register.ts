import { IUsersRepository } from "@/repositories/IUsersRepository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

    if(emailAlreadyInUse) {
      throw new Error('Email already in use.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
