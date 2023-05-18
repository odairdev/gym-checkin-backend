import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { app } from "@/app";
import { createAndAuthenticateUse } from "@/utils/test/create=and-authenticate-user";

describe("Validate Checkin Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip("should be able to validate a checkIn", async () => {
    const token = await createAndAuthenticateUse(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        description: "some",
        phone: "47999999999",
        latitude: -26.9055772,
        longitude: -48.6467763,
      },
    });

    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gym.id
      },
    });


    const response = await request(app.server)
      .patch(`/checkin/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(204);
  });
});
