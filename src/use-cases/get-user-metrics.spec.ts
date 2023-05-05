import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Fetch Users CheckIns History Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository)
  })

  it('should be able to get users metrics', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      id: 'checkIn-01',
      gym_id: 'gym-01'
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      id: 'checkIn-02',
      gym_id: 'gym-02'
    })

    const {checkIns} = await sut.execute({userId: 'user-01'})

    expect(checkIns).toEqual(2)
  })
})