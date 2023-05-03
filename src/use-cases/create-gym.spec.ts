import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create a gym', async () => {
    const {gym} = await sut.execute({
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -26.9055772,
      longitude: -48.6467763
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})