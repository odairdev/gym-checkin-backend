import { CheckIn, User } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";
import { IGymsRepository } from "@/repositories/IGymsRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkins-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {latitude: userLatitude, longitude: userLongitude},
      {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
    )

    const MAX_DISTANCE = 0.1 //100 meters

    if(distance > MAX_DISTANCE) {
      throw new MaxDistanceError()
    }

    const checkInSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInSameDay) {
      throw new MaxNumberOfCheckinsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
