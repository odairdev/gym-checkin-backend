import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchManyByTitle(query: string, page: number): Promise<Gym[]>
}