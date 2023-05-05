import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckIn } from './validate-check-in'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckIn

describe('Validate Check In Use Case', () => {
  beforeEach( async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckIn(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const { checkIn } = await sut.execute({checkInId: createdCheckIn.id})

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInsRepository.db[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs) //Advance 21 minutes in time

    await expect(async () => {
      await sut.execute({checkInId: createdCheckIn.id})
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})