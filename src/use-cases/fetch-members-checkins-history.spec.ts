import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { FetchMembersCheckInUseCase } from "./fetch-members-checkins-history";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: FetchMembersCheckInUseCase

describe('Fetch Users CheckIns History Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchMembersCheckInUseCase(inMemoryCheckInsRepository)
  })

  it('should be able to fetch users checkIn history', async () => {
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

    const {checkIns} = await sut.execute({userId: 'user-01', page: 1})

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-01'}),
      expect.objectContaining({gym_id: 'gym-02'}),

    ])
  })

  it('should be able to fetch paginated users checkIn history', async () => {
    for(let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`
      })
    }

    const {checkIns} = await sut.execute({userId: 'user-01', page: 2})

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-21'}),
      expect.objectContaining({gym_id: 'gym-22'}),

    ])
  })
})