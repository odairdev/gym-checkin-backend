import { Gym, Prisma } from "@prisma/client";
import { IGymsRepository } from "../IGymsRepository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements IGymsRepository {
  public db: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }

    this.db.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.db.find(gym => gym.id === id) || null

    return gym
  }

  async searchManyByTitle(query: string, page: number): Promise<Gym[]> {
    const gyms = this.db.filter(gym => gym.title.includes(query)).slice((page - 1) * 20, page * 20)

    return gyms
  }
}