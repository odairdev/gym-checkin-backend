import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";


export function MakeSearchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymUseCase
}