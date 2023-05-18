import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  try {
    const createGymUseCase = makeCreateGymUseCase();

    const { gym } = await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return reply.status(201).send(gym)
  } catch (err) {
    return reply.status(500)
  }
}
