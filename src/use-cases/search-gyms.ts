import { IGymsRepository } from "@/repositories/IGymsRepository";

interface SearchGymsUseCaseRequest {
  query: string,
  page: number
}


export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({query, page = 1}: SearchGymsUseCaseRequest) {
    const gyms = await this.gymsRepository.searchManyByTitle(query, page)

    return { gyms }
  }
}