import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkIn-repository';
import { FetchMembersCheckInUseCase } from './../fetch-members-checkins-history';


export function fetchMembersCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const fetchMembersCheckInUseCase = new FetchMembersCheckInUseCase(checkInsRepository)

  return fetchMembersCheckInUseCase
}