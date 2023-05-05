import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkIns: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.countByUserId(userId)

    return {
      checkIns
    }
  }
}
