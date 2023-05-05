import { CheckIn, User } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";

interface FetchMembersCheckInUseCaseRequest {
  userId: string;
  page: number
}

interface FetchMembersCheckInUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchMembersCheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
    page
  }: FetchMembersCheckInUseCaseRequest): Promise<FetchMembersCheckInUseCaseResponse> {
    const checkIns = (await this.checkInsRepository.findManyByUserId(userId, page))

    return {
      checkIns
    }
  }
}
