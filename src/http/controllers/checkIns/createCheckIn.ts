import { MaxDistanceError } from "@/use-cases/errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "@/use-cases/errors/max-number-of-checkins-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkIn-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const gymIdParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckinBodySchema = z.object({
    userLatitude: z.number(),
    userLongitude: z.number(),
  });

  const { userLatitude, userLongitude } = createCheckinBodySchema.parse(
    request.body
  );
  const { gymId } = gymIdParamsSchema.parse(request.params);

  try {
    const checkinUseCase = makeCheckInUseCase();

    const { checkIn } = await checkinUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude,
      userLongitude,
    });

    return reply.status(200).send(checkIn);
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof MaxDistanceError ||
      err instanceof MaxNumberOfCheckinsError
    ) {
      return reply.status(400).send({ message: err.message });
    } else {
      reply.status(500);
    }
  }
}
