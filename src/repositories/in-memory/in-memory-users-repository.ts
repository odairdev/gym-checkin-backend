import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  private db: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: `user-${Math.floor(Math.random() * 10000)}`,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.db.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.db.find(u => u.email === email) || null

    return user
  }
}