import { Gym } from "@prisma/client";
import { IGymsRepository } from "../IGymsRepository";

export class InMemoryGymsRepository implements IGymsRepository {
  public db: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.db.find(gym => gym.id === id) || null

    return gym
  }
}