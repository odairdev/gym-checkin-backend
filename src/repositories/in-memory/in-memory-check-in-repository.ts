import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../ICheckInsRepository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public db: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.db.push(checkIn);

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.db.findIndex(item => item.id === checkIn.id)

    if(checkInIndex >= 0) {
      this.db[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = this.db.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDay
    }) || null

    return checkIn
  }

  async findManyByUserId(userId: string, page: number = 1): Promise<CheckIn[]> {
    const checkIns = this.db.filter(checkIn => checkIn.user_id === userId).slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    return this.db.filter(checkin => checkin.user_id === userId).length
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = this.db.find(checkIn => checkIn.id === checkInId) ?? null

    return checkIn
  }
}
