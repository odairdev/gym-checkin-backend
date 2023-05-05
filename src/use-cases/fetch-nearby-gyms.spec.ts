import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to search many nearby gyms only.', async () => {
    
    inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Nearby Gym',
      description: '',
      phone: '',
      latitude: -26.9055772,
      longitude: -48.6467763
    })

    inMemoryGymsRepository.create({
      id: 'gym-02',
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -28.9055772,
      longitude: -50.6467763
    })

    const { gyms } = await sut.execute({userLatitude: -26.9055772, userLongitude: -48.6467763})

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Nearby Gym'}),
    ])
  })
})