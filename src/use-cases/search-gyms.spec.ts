import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to search many gyms by title', async () => {
    
    inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -26.9055772,
      longitude: -48.6467763
    })

    inMemoryGymsRepository.create({
      id: 'gym-02',
      title: 'Javascript Gym 2',
      description: '',
      phone: '',
      latitude: -26.9055772,
      longitude: -48.6467763
    })

    const { gyms } = await sut.execute({query: 'Javascript', page: 1})

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({id: 'gym-01'}),
      expect.objectContaining({id: 'gym-02'}),
    ])
  })

  it('should be able to search many gyms by title and page', async () => {
    for(let i = 1; i <=22; i++) {
      inMemoryGymsRepository.create({
        id: `gym-${i}`,
        title: 'Javascript Gym',
        description: '',
        phone: '',
        latitude: -26.9055772,
        longitude: -48.6467763
      })
    }

    const { gyms } = await sut.execute({query: 'Javascript', page: 2})

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({id: 'gym-21'}),
      expect.objectContaining({id: 'gym-22'}),
    ])
  })
})