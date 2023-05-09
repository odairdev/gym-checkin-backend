import { Prisma, Gym } from "@prisma/client";
import { FindManyNearbyParams, IGymsRepository } from "../IGymsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const createdGym = await prisma.gym.create({
      data,
    });

    return createdGym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async searchManyByTitle(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms
  }
}
