import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { CheckInUseCase } from "../checkIn";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";


export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return checkInUseCase
}