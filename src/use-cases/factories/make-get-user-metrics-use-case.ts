import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";


export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}