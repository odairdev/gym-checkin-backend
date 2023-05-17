import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { ValidateCheckIn } from "../validate-check-in";


export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const validateCheckInUseCase = new ValidateCheckIn(checkInsRepository)

  return validateCheckInUseCase
}